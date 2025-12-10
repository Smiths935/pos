// src/components/ui/filters/order-history-filter-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon } from "lucide-react";

interface OrderHistoryFilterBarProps {
  onSearch: (query: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onReset: () => void;
}

export default function OrderHistoryFilterBar({
  onSearch,
  onStatusChange,
  onTypeChange,
  onBranchChange,
  onReset,
}: OrderHistoryFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-card border border-border rounded-lg">
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Recherche par numéro de commande ou client..."
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
            <SelectItem value="completed">Complété</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
            <SelectItem value="refunded">Remboursé</SelectItem>
            <SelectItem value="partial-refund">Remboursement Partiel</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onTypeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tous types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            <SelectItem value="dine-in">Repas sur place</SelectItem>
            <SelectItem value="takeaway">À emporter</SelectItem>
            <SelectItem value="delivery">Livraison</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onBranchChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Toutes les succursales" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les succursales</SelectItem>
            <SelectItem value="los-angeles">Succursale de Los Angeles</SelectItem>
            <SelectItem value="san-francisco">Succursale de San Francisco</SelectItem>
            <SelectItem value="avenue-mall">Succursale Avenue Mall</SelectItem>
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