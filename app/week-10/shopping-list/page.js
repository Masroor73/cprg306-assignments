"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]); // To keep the item list empty at the start
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <main className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be logged in to view the shopping list.</p>
      </main>
    );
  }

  // Items are leading from Firestore when the components loads
  useEffect(() => {
    async function loadItems() {
      const firestoreItems = await getItems(user.uid);
      setItems(firestoreItems);
    }
    loadItems();
  }, [user.uid]);

  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);
      newItem.id = newItemId;
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(user.uid, itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  function cleanUpItemName(name) {
    let cleaned = name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF])/g, "");
    cleaned = cleaned.replace(/\d+(\s?kg|\s?g|\s?l|\s?L|\s?pack|\s?dozen)?/gi, "");
    cleaned = cleaned.replace(/,/g, "");
    cleaned = cleaned.trim();
    return cleaned.toLowerCase();
  }

  const handleItemSelect = (item) => {
    const ingredient = cleanUpItemName(item.name);
    setSelectedItemName(ingredient);
  };

  return (
    <main className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Shopping List App</h1>
      <div className="flex gap-8">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}








