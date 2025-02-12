"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center space-x-4 bg-white text-black p-4 rounded-lg shadow-lg">
      <span className="text-xl font-bold">{quantity}</span>
      <button
        onClick={decrement}
        disabled={quantity === 1}
        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        -
      </button>
      <button
        onClick={increment}
        disabled={quantity === 20}
        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
