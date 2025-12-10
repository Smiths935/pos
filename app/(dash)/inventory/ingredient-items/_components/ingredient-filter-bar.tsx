// src/components/ui/filters/ingredient-filter-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon } from "lucide-react";

interface IngredientFilterBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

export default function IngredientFilterBar({
  onSearch,
  onCategoryChange,
  onReset,
}: IngredientFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Recherche par nom, référence ou nom localisé..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>

      {/* Filtre par catégorie */}
      <div className="flex flex-wrap gap-3">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="produits-secs">Produits secs</SelectItem>
            <SelectItem value="huiles">Huiles</SelectItem>
            <SelectItem value="epices">Épices</SelectItem>
            <SelectItem value="viande">Viande</SelectItem>
          </SelectContent>
        </Select>

        {/* Bouton Reset Filters */}
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcwIcon className="h-4 w-4" />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}