"use client";
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  // Function for adding a new item
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]); // To add as a new item to the list
  };

  return (
    <main className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Shopping List</h1>
      <div className="flex">
        <NewItem onAddItem={handleAddItem} />
      </div>
      <ItemList items={items} />
    </main>
  );
}
