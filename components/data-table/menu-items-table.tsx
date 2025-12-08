// src/components/ui/data-table/menu-items-table.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  status: "active" | "inactive";
  availability: string; // ex: "All Branches", "2 of 3 Branches"
  isSeasonal: boolean;
  imageUrl?: string;
}

interface MenuItemsTableProps {
  items: MenuItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MenuItemsTable({
  items,
  onEdit,
  onDelete,
}: MenuItemsTableProps) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof MenuItem];
    const bValue = b[sortConfig.key as keyof MenuItem];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (id: string) => {
    router.push(`/menu-management/menu/${id}`);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead
              onClick={() => requestSort('name')}
              className="cursor-pointer select-none"
            >
              Menu Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              onClick={() => requestSort('category')}
              className="cursor-pointer select-none"
            >
              Category {sortConfig?.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              onClick={() => requestSort('basePrice')}
              className="cursor-pointer select-none"
            >
              Base Price {sortConfig?.key === 'basePrice' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              onClick={() => requestSort('status')}
              className="cursor-pointer select-none"
            >
              Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              onClick={() => requestSort('availability')}
              className="cursor-pointer select-none"
            >
              Availability {sortConfig?.key === 'availability' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              onClick={() => requestSort('isSeasonal')}
              className="cursor-pointer select-none"
            >
              Seasonal? {sortConfig?.key === 'isSeasonal' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(item.id)}
            >
              <TableCell className="font-medium flex items-center gap-2">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                {item.name}
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.basePrice.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "active" ? "default" : "secondary"}
                  className={
                    item.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.availability.includes("Not Available")
                      ? "bg-red-100 text-red-800 border-red-300"
                      : item.availability.includes("of")
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : "bg-green-100 text-green-800 border-green-300"
                  }
                >
                  {item.availability}
                </Badge>
              </TableCell>
              <TableCell>{item.isSeasonal ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item.id);
                    }}
                    aria-label={`Edit ${item.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    aria-label={`Delete ${item.name}`}
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-muted-foreground">Showing 1-10 of 15 items</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}