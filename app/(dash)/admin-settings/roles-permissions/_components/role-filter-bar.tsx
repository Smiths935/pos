// src/components/ui/filters/role-filter-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon } from "lucide-react";

interface RoleFilterBarProps {
  onSearch: (query: string) => void;
  onScopeChange: (value: string) => void;
  onReset: () => void;
}

export default function RoleFilterBar({
  onSearch,
  onScopeChange,
  onReset,
}: RoleFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Recherche par nom de rôle ou description..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>

      {/* Filtre par type de portée */}
      <div className="flex flex-wrap gap-3">
        <Select onValueChange={onScopeChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tous les types de portée" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types de portée</SelectItem>
            <SelectItem value="siege-social">Siège social</SelectItem>
            <SelectItem value="bifurquer">Bifurquer</SelectItem>
            <SelectItem value="region">Région</SelectItem>
          </SelectContent>
        </Select>

        {/* Bouton Reset Filters */}
        <Button
          variant="ghost"
          size="lg"
          onClick={onReset}
          className="gap-2 bg-gray-200 hover:bg-gray-300 hover:text-gray-600"
        >
          <RotateCcwIcon className="h-4 w-4" />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}