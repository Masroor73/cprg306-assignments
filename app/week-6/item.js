"use client";
import React from "react";

export default function Item({ name, quantity, category }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-2">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-300">Buy {quantity} in {category}</p>
    </div>
  );
}
