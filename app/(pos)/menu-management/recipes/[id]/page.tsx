// src/app/recipes/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import RecipeDetailTabs from "../_components/recipe-detail-tabs";

// Données simulées — à remplacer par un appel API
const mockRecipes = [
  {
    id: "r_1",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    portionSize: "350g",
    prepTime: "25 min",
    cost: 3.5,
    price: 12.99,
    margin: 73,
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

export default function RecipeDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundRecipe = mockRecipes.find((r) => r.id === id);
      if (foundRecipe) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecipe(foundRecipe);
      } else {
        // Redirige vers la liste si la recette n'existe pas
        router.push("/menu-management/recipes");
      }
    }
  }, [id, router]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    router.push(`/menu-management/recipes/${id}/edit`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      console.log("Suppression de la recette :", id);
      // Appel API DELETE ici
      router.push("/menu-management/recipes");
    }
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
        <h1 className="text-2xl font-bold mt-2">{recipe.name}</h1>
        <p className="text-sm text-muted-foreground">
          View or edit recipe details
        </p>
      </div>

      <RecipeDetailTabs
        recipe={recipe}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
