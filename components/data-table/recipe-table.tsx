// src/components/ui/data-table/recipe-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Recipe {
  id: string;
  name: string;
  category: string;
  portionSize: string;
  prepTime: string;
  cost: number;
  price: number;
  margin: number;
  imageUrl?: string;
}

interface RecipeTableProps {
  recipes: Recipe[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RecipeTable({
  recipes,
  onEdit,
  onDelete,
}: RecipeTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/menu-management/recipes/${id}`);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Recipe Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Portion Size</TableHead>
            <TableHead>Prep Time</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Margin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow
              key={recipe.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(recipe.id)}
            >
              <TableCell className="font-medium flex items-center gap-2">
                {recipe.imageUrl ? (
                  <Image src={recipe.imageUrl} alt={recipe.name} width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {recipe.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                {recipe.name}
              </TableCell>
              <TableCell>{recipe.category}</TableCell>
              <TableCell>{recipe.portionSize}</TableCell>
              <TableCell>{recipe.prepTime}</TableCell>
              <TableCell>${recipe.cost.toFixed(2)}</TableCell>
              <TableCell>${recipe.price.toFixed(2)}</TableCell>
              <TableCell>{Math.round(recipe.margin)}%</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(recipe.id);
                    }}
                    aria-label={`Edit ${recipe.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(recipe.id);
                    }}
                    aria-label={`Delete ${recipe.name}`}
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}