"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon } from "lucide-react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onReset: () => void;
  categories: string[];
  statuses: string[];
  availabilities: string[];
}

export default function SearchFilterBar({
  onSearch,
  onCategoryChange,
  onStatusChange,
  onAvailabilityChange,
  onReset,
  categories = ["All", "Appetizers", "Main Courses", "Desserts"],
  statuses = ["All", "Active", "Inactive"],
  availabilities = ["All", "Available", "Out of Stock"],
}: FilterBarProps) {
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
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>

      {/* Filtres déroulants */}
      <div className="flex flex-wrap gap-3">
        {/* Catégories */}
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Statuts */}
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Disponibilité */}
        <Select onValueChange={onAvailabilityChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilities.map((avail) => (
              <SelectItem key={avail} value={avail}>
                {avail}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Bouton Reset */}
        <Button variant="outline" size="lg" onClick={onReset} className="gap-2">
          <RotateCcwIcon className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
