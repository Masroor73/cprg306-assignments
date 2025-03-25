"use client";
import React from "react";

export default function Item({ name, quantity, category, onSelect }) {
  // When the item is clicked onSelect is triggered
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-2
                 cursor-pointer hover:bg-gray-700 transition"
    >
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-300">Buy {quantity} in {category}</p>
    </div>
  );
}







