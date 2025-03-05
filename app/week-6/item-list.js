"use client";
import React, { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  // Sorting Logic
  const sortedItems = [...itemsData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  // Group by category (Extra Challenge)
  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Shopping List</h2>
        <p className="text-gray-400">Sort by:</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setSortBy("name")}
            className={`px-4 py-2 rounded ${sortBy === "name" ? "bg-orange-600" : "bg-orange-400"} text-white`}
          >
            Name
          </button>
          <button
            onClick={() => setSortBy("category")}
            className={`px-4 py-2 rounded ${sortBy === "category" ? "bg-orange-600" : "bg-orange-400"} text-white`}
          >
            Category
          </button>
          <button
            onClick={() => setSortBy("grouped")}
            className={`px-4 py-2 rounded ${sortBy === "grouped" ? "bg-orange-600" : "bg-orange-400"} text-white`}
          >
            Grouped Category
          </button>
        </div>
      </div>

      {sortBy === "grouped" ? (
        Object.keys(groupedItems).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-xl font-bold text-orange-400 capitalize">{category}</h3>
            {groupedItems[category].map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </div>
        ))
      ) : (
        sortedItems.map((item) => <Item key={item.id} {...item} />)
      )}
    </div>
  );
}
