/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import RecipeFilterBar from "./_components/recipe-filter-bar";
import RecipeTable from "@/components/data-table/recipe-table";
import HeadSectionPage from "@/components/headSectionPage";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Données simulées — à remplacer par un appel API
const mockRecipes = [
  {
    id: "r_1",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    portionSize: "350g",
    prepTime: "25 min",
    cost: 3.50,
    price: 12.99,
    margin: 73,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_2",
    name: "Chocolate Chip Cookies",
    category: "Dessert",
    portionSize: "4 cookies",
    prepTime: "45 min",
    cost: 2.25,
    price: 8.50,
    margin: 74,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_3",
    name: "Chicken Stir Fry",
    category: "Main Course",
    portionSize: "400g",
    prepTime: "30 min",
    cost: 5.75,
    price: 14.99,
    margin: 62,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_4",
    name: "Tomato Soup",
    category: "Appetizer",
    portionSize: "250ml",
    prepTime: "20 min",
    cost: 1.85,
    price: 6.99,
    margin: 74,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_5",
    name: "Lemon Butter Fish",
    category: "Main Course",
    portionSize: "300g",
    prepTime: "25 min",
    cost: 8.25,
    price: 22.99,
    margin: 64,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_6",
    name: "Mushroom Risotto",
    category: "Main Course",
    portionSize: "320g",
    prepTime: "35 min",
    cost: 4.25,
    price: 15.99,
    margin: 73,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_7",
    name: "Tiramisu",
    category: "Dessert",
    portionSize: "150g",
    prepTime: "4 hours",
    cost: 3.75,
    price: 9.99,
    margin: 62,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_8",
    name: "Bruschetta",
    category: "Appetizer",
    portionSize: "4 pieces",
    prepTime: "15 min",
    cost: 2.15,
    price: 7.50,
    margin: 71,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_9",
    name: "Beef Stroganoff",
    category: "Main Course",
    portionSize: "380g",
    prepTime: "40 min",
    cost: 6.50,
    price: 18.99,
    margin: 66,
    imageUrl: "/assets/foods/beef-burger.png",
  },
  {
    id: "r_10",
    name: "Apple Pie",
    category: "Dessert",
    portionSize: "1 slice",
    prepTime: "1 hour",
    cost: 2.80,
    price: 8.99,
    margin: 69,
    imageUrl: "/assets/foods/beef-burger.png",
  },
];

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const router = useRouter()

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleEdit = (id: string) => {
    console.log("Éditer la recette :", id);
    // Redirige vers /recipes/[id]
    router.replace(`/menu-management/recipes/${id}`)
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      console.log("Suppression de la recette :", id);
    }
  };

  // Filtrer les recettes
  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = searchQuery === "" || recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || recipe.category === category;
    return matchesSearch && matchesCategory;
  });

   const handleAddRecipe = () => {
    router.replace('/menu-management/recipes/add')
  };

  return (
    <div className="space-y-6">
        <HeadSectionPage
        title="Recettes"
        description="Gérez vos recettes"
        actionButton={{
            label:"Ajouter une recette",
            icon: PlusIcon,
            onClick:handleAddRecipe,
            variant: "default",
        }}
        />

      {/* Barre de filtres */}
      <RecipeFilterBar
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        categories={["All", "Appetizers", "Main Course", "Dessert"]}
      />

      {/* Tableau */}
      <RecipeTable
        recipes={filteredRecipes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}