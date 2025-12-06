"use client";
import React from "react";
import HeadSectionPage from "@/components/headSectionPage";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import IngredientFilterBar from "./_components/ingredient-filter-bar";
import { Button } from "@/components/ui/button";
import IngredientTable from "@/components/data-table/ingredient-table";

// Données simulées — à remplacer par un appel API
const mockIngredients = [
  {
    id: "i_1",
    name: "Farine tout usage",
    ugs: "FLR-001",
    category: "Produits secs",
    storageUnit: "kg → g",
    defaultPrice: 1.25,
    minLevel: "10 kg",
    maxLevel: "50 kg",
    reorderLevel: "15 kg",
  },
  {
    id: "i_2",
    name: "Sucre en poudre",
    ugs: "SGR-001",
    category: "Produits secs",
    storageUnit: "kg → g",
    defaultPrice: 0.95,
    minLevel: "5 kg",
    maxLevel: "30 kg",
    reorderLevel: "10 kg",
  },
  {
    id: "i_3",
    name: "huile d'olive",
    ugs: "HUILE-001",
    category: "Huiles",
    storageUnit: "l → ml",
    defaultPrice: 8.50,
    minLevel: "2 l",
    maxLevel: "10 l",
    reorderLevel: "3 l",
  },
  {
    id: "i_4",
    name: "Sel",
    ugs: "SLT-001",
    category: "Épices",
    storageUnit: "kg → g",
    defaultPrice: 0.75,
    minLevel: "1 kg",
    maxLevel: "5 kg",
    reorderLevel: "2 kg",
  },
  {
    id: "i_5",
    name: "Poivre noir",
    ugs: "PEP-001",
    category: "Épices",
    storageUnit: "kg → g",
    defaultPrice: 12.50,
    minLevel: "0.5 kg",
    maxLevel: "2 kg",
    reorderLevel: "0.8 kg",
  },
  {
    id: "i_6",
    name: "Blanc de poulet",
    ugs: "CHK-001",
    category: "Viande",
    storageUnit: "kg → g",
    defaultPrice: 7.25,
    minLevel: "5 kg",
    maxLevel: "20 kg",
    reorderLevel: "8 kg",
  },
];

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setCategory("all");
    // Réinitialise aussi l'input de recherche
    document.querySelector('input[placeholder="Recherche par nom, référence ou nom localisé..."]')
    // ?.focus();
  };

  // Filtrer les ingrédients
  const filteredIngredients = mockIngredients.filter((ingredient) => {
    const matchesSearch = searchQuery === "" || ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) || ingredient.ugs.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || ingredient.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleEditIngredient = (id: string) => {
    console.log("Éditer l'ingrédient :", id);
    // Redirige vers /inventory/ingredients/[id]/edit
    router.push(`/inventory/ingredient-items/${id}`);
  };

  const handleDeleteIngredient = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ?")) {
      console.log("Suppression de l'ingrédient :", id);
      // Appel API DELETE ici
    }
  };

  const handleSettingsIngredient = (id: string) => {
    console.log("Paramètres de l'ingrédient :", id);
    // Ouvre un modal ou redirige vers /inventory/ingredients/[id]/settings
  };

  return (
    <div className="space-y-6">
      <div>
        <HeadSectionPage
        title="Ingrédients"
        description="Gérer et surveiller les ingrédients de l'inventaire"
        actionButton={{
          icon: PlusIcon,
          label: "Ajouter un ingrédient",
          onClick: () => router.push("/inventory/ingredient-items/add"),
        }}
      />
      </div>

      {/* Barre de filtres */}
        <IngredientFilterBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onReset={handleReset}
        />

      {/* Tableau */}
      <IngredientTable
        ingredients={filteredIngredients}
        onEdit={handleEditIngredient}
        onDelete={handleDeleteIngredient}
        onSettings={handleSettingsIngredient}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-muted-foreground">Affichage des résultats 1 à 10 sur 15</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Précédent</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Suivant</Button>
        </div>
      </div>
    </div>
  );
}