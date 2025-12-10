/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import RecipeTabs from "../../_components/recipe-tabs";

// Données simulées — à remplacer par un appel API
const mockRecipes = [
  {
    id: "r_1",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    portionSize: "350g",
    description: "A classic Italian pasta dish with creamy sauce and bacon.",
    imageUrl: "/assets/foods/beef-burger.png",
    ingredients: [
      {
        id: "i_1",
        name: "Salt",
        amount: 5,
        unit: "g",
        costPerUnit: 0.5,
        totalCost: 2.5,
        stock: 100,
      },
      {
        id: "i_2",
        name: "Black Pepper",
        amount: 3,
        unit: "g",
        costPerUnit: 1.0,
        totalCost: 3.0,
        stock: 100,
      },
      {
        id: "i_3",
        name: "Eggs",
        amount: 2,
        unit: "pcs",
        costPerUnit: 1.0,
        totalCost: 2.0,
        stock: 100,
      },
      {
        id: "i_4",
        name: "Butter",
        amount: 30,
        unit: "g",
        costPerUnit: 2.0,
        totalCost: 60.0,
        stock: 100,
      },
    ],
    preparationSteps: [
      "Boil the pasta",
      "Cook the bacon",
      "Mix the pasta and bacon",
      "Add the butter and eggs",
      "Serve",
    ],
    cookingTime: "25 min",
    servingSuggestions: "3 servings",
    portionSizeInfo: "350g",
    nutrition: {
      calories: "500",
      protein: "15g",
      carbs: "60g",
      fat: "20g",
    },
  },
];

export default function EditRecipePage() {
  const router = useRouter();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundRecipe = mockRecipes.find((r) => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        router.push("/menu-management/recipes");
      }
    }
  }, [id, router]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (data: any) => {
    console.log("Données mises à jour :", data);
    alert("Recette mise à jour !");
    router.push(`/menu-management/recipes/${id}`);
  };

  const handleCancel = () => {
    router.push(`/menu-management/recipes/${id}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold mt-2">Edit Recipe</h1>
        <p className="text-sm text-muted-foreground">
          Update the recipe details
        </p>
      </div>

      <RecipeTabs
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={false}
      />
    </div>
  );
}
