"use client";
import React, { useState, useEffect } from "react";

// A list of meals containing the ingredient is fetched
async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await res.json();
  return data.meals || [];
}

// Detailed meal info is fetched in order to get the ingredients list)
async function fetchMealDetails(mealId) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await res.json();
  return data.meals && data.meals.length > 0 ? data.meals[0] : null;
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  // If the ingredient changes, a new list of meals are fetched
  useEffect(() => {
    async function loadMealIdeas() {
      const mealData = await fetchMealIdeas(ingredient);
      setMeals(mealData);
      // Resets any open meal details
      setSelectedMealId(null);
      setMealDetails(null);
    }
    loadMealIdeas();
  }, [ingredient]);

  // This handles user clicking a meal
  const handleMealClick = async (mealId) => {
    // In case the same meal is clicked again, toggle is closed
    if (mealId === selectedMealId) {
      setSelectedMealId(null);
      setMealDetails(null);
      return;
    }
    // Otherwise newly clicked meal deatils are fetched
    setSelectedMealId(mealId);
    const details = await fetchMealDetails(mealId);
    setMealDetails(details);
  };

  // Array of "ingredient - measure" from meal details is extracted
  function getIngredients(meal) {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== "") {
        ingredients.push(`${ing}${measure ? ` - ${measure}` : ""}`);
      }
    }
    return ingredients;
  }

  const ingredientsList = mealDetails ? getIngredients(mealDetails) : [];

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-[320px]">
      <h2 className="text-xl font-bold mb-2">Meal Ideas</h2>
      {ingredient ? (
        <p className="mb-4 text-gray-300">
          Here are some meal ideas using <span className="font-semibold">{ingredient}</span>:
        </p>
      ) : (
        <p className="mb-4 text-gray-300">
          Click an item in the shopping list to see meal ideas.
        </p>
      )}

      {meals.length === 0 && ingredient && (
        <p className="text-sm text-gray-500">No meals found for this ingredient.</p>
      )}

      <ul className="space-y-2">
        {meals.map((meal) => {
          const isSelected = meal.idMeal === selectedMealId;
          return (
            <li
              key={meal.idMeal}
              onClick={() => handleMealClick(meal.idMeal)}
              className={`p-2 rounded cursor-pointer transition-colors
                bg-gray-700 hover:bg-orange-500
                ${isSelected ? "border-2 border-orange-400" : ""}
              `}
            >
              <div className="font-semibold">{meal.strMeal}</div>

              {/*  Display ingredients of the meal selected, */}
              {isSelected && mealDetails && (
                <div className="mt-2">
                  <p className="font-bold text-sm mb-1">Ingredients needed:</p>
                  <ul className="list-disc list-inside text-sm">
                    {ingredientsList.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}








