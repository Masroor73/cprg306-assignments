"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added Item: ${name}, Quantity: ${quantity}, Category: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce"); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[420px] mx-auto bg-gray-900 p-4 rounded-lg shadow-xl"
    >
      <div className="mb-3">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-10 px-3 bg-white border border-gray-300
                     rounded-md text-gray-800 focus:outline-none
                     focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center h-10 w-32 bg-white rounded-lg shadow px-2 justify-between">
          <span className="text-black text-sm">{quantity}</span>
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              disabled={quantity === 1}
              className={`
                px-2 py-1 text-white rounded-md text-sm transition
                ${quantity === 1
                  ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
                }
                disabled:opacity-50
              `}
            >
              -
            </button>

            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.min(prev + 1, 20))}
              disabled={quantity === 20}
              className="px-2 py-1 bg-blue-500 text-white rounded-md
                         hover:bg-blue-700 transition disabled:opacity-50 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="h-10 w-32 px-3 bg-white border border-gray-300
                     rounded-md text-black shadow-md"
        >
          <option value="category" disabled>
            Category
          </option>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-blue-500 text-white text-lg font-bold
                   rounded-md hover:bg-blue-700 transition"
      >
        +
      </button>
    </form>
  );
}










