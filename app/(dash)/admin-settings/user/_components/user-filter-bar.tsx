// src/components/ui/filters/user-filter-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon } from "lucide-react";

interface UserFilterBarProps {
  onSearch: (query: string) => void;
  onRoleChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function UserFilterBar({
  onSearch,
  onRoleChange,
  onBranchChange,
  onStatusChange,
  onReset,
}: UserFilterBarProps) {
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
          placeholder="Recherche par nom ou par courriel..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3">
        <Select onValueChange={onRoleChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tous les rôles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="stock-specialist">Spécialiste des stocks</SelectItem>
            <SelectItem value="cashier">Caissier</SelectItem>
            <SelectItem value="branch-manager">Directeur d&apos;agence</SelectItem>
            <SelectItem value="regional-manager">Responsable régional</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onBranchChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Toutes les succursales" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les succursales</SelectItem>
            <SelectItem value="centre-ville">Centre-ville principal</SelectItem>
            <SelectItem value="westside">Place Westside</SelectItem>
            <SelectItem value="east">Coin est</SelectItem>
            <SelectItem value="northside">Northside</SelectItem>
            <SelectItem value="airport">Aéroport</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>

        {/* Bouton Reset Filters */}
        <Button
          variant="outline"
          size="lg"
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