"use client";
import React from "react";

export default function Item({ id, name, quantity, category, onSelect, onDelete }) {
  const handleClick = () => {
    if (onSelect) onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-2 flex items-center justify-between
                 hover:bg-gray-700 transition cursor-pointer"
    >
      {/* Left side: information on item */}
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-300">Buy {quantity} in {category}</p>
      </div>

      {/* Right side: Option to detele item */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // This Prevents the click from triggering onSelect
            onDelete(id);
          }}
          className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}











