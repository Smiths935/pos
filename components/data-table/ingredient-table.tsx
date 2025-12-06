"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Ingredient {
  id: string;
  name: string;
  ugs: string;
  category: string;
  storageUnit: string; // ex: "kg → g", "l → ml"
  defaultPrice: number;
  minLevel: string;
  maxLevel: string;
  reorderLevel: string;
}

interface IngredientTableProps {
  ingredients: Ingredient[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSettings: (id: string) => void;
}

export default function IngredientTable({
  ingredients,
  onEdit,
  onDelete,
  onSettings,
}: IngredientTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/inventory/ingredient-items/${id}`);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Nom/Nom localisé</TableHead>
            <TableHead>UGS</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Stockage → Unités d'articles</TableHead>
            <TableHead>Prix par défaut</TableHead>
            <TableHead>Niveau minimum</TableHead>
            <TableHead>Niveau maximum</TableHead>
            <TableHead>Niveau de réorganisation</TableHead>
            <TableHead>Actes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(ingredient.id)}
            >
              <TableCell>
                <div className="font-medium">{ingredient.name}</div>
                <span className="text-xs text-muted-foreground">{ingredient.category}</span>
              </TableCell>
              <TableCell>{ingredient.ugs}</TableCell>
              <TableCell>{ingredient.category}</TableCell>
              <TableCell>{ingredient.storageUnit}</TableCell>
              <TableCell>${ingredient.defaultPrice.toFixed(2)}</TableCell>
              <TableCell>{ingredient.minLevel}</TableCell>
              <TableCell>{ingredient.maxLevel}</TableCell>
              <TableCell>{ingredient.reorderLevel}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(ingredient.id);
                    }}
                    aria-label={`Éditer ${ingredient.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSettings(ingredient.id);
                    }}
                    aria-label={`Paramètres ${ingredient.name}`}
                  >
                    <SettingsIcon className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(ingredient.id);
                    }}
                    aria-label={`Supprimer ${ingredient.name}`}
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