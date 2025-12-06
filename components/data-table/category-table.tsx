// src/components/ui/data-table/category-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    // Ici, tu pourrais ouvrir un modal d'édition ou naviguer vers /categories/[id]
    // Pour l'instant, on utilise onEdit
    onEdit(id);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead> Nom de la catégorie </TableHead>
            <TableHead> Articles </TableHead>
            <TableHead> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(category.id)}
            >
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.itemCount}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(category.id);
                    }}
                    aria-label={`Éditer ${category.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(category.id);
                    }}
                    aria-label={`Supprimer ${category.name}`}
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