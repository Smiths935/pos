// src/components/ui/filters/branch-filter-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon, PlusIcon } from "lucide-react";

interface BranchFilterBarProps {
  onSearch: (query: string) => void;
  onStatusChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onReset: () => void;
  onAddBranch: () => void;
}

export default function BranchFilterBar({
  onSearch,
  onStatusChange,
  onRegionChange,
  onServiceChange,
  onReset,
  onAddBranch
}: BranchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des succursales..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3">
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onRegionChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Toutes les régions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les régions</SelectItem>
            <SelectItem value="centre-ville">Centre-ville</SelectItem>
            <SelectItem value="ouest">Ouest</SelectItem>
            <SelectItem value="est">Est</SelectItem>
            <SelectItem value="nord">Nord</SelectItem>
            <SelectItem value="aéroport">Aéroport</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onServiceChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tous les services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les services</SelectItem>
            <SelectItem value="dine-in">Repas sur place</SelectItem>
            <SelectItem value="takeaway">À emporter</SelectItem>
            <SelectItem value="delivery">Livraison</SelectItem>
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

        <Button
          size="sm"
          onClick={onAddBranch}
          className="gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter une succursale
        </Button>
      </div>
    </div>
  );
}