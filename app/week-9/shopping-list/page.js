"use client";
import { useUserAuth } from "../_utils/auth-context";

// Importing existing Week 8 components
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Show a message or redirect, if user is not logged in.
  if (!user) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be logged in to view the shopping list.</p>
      </div>
    );
  }

  // Existing Week 8 logic
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  function cleanUpItemName(name) {
    let cleaned = name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF])/g,
      ""
    );
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
      <h1 className="text-white text-3xl font-bold mb-4">Shopping List</h1>

      <div className="flex gap-8">
        {/* Left column: Add Item + Item List */}
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right column: Meal Ideas */}
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}






