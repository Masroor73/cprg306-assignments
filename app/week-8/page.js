"use client";
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  // A function for adding a new item
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Function to remove emojis, extra text, etc.
  function cleanUpItemName(name) {
    // Remove emojis
    let cleaned = name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF])/g,
      ""
    );
    // Removes references of quantity  
    cleaned = cleaned.replace(/\d+(\s?kg|\s?g|\s?l|\s?L|\s?pack|\s?dozen)?/gi, "");
    // Removes commas
    cleaned = cleaned.replace(/,/g, "");
    // Trims spaces
    cleaned = cleaned.trim();
    return cleaned.toLowerCase();
  }

  // If a user selects an item
  const handleItemSelect = (item) => {
    const ingredient = cleanUpItemName(item.name);
    setSelectedItemName(ingredient);
  };

  return (
    <main className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Shopping List</h1>

      <div className="flex gap-8">
        {/* Left column is for: Add Item + Item List */}
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right column is for: Meal Ideas */}
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}





