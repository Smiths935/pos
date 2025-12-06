// src/components/ui/data-table/order-history-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  number: string;
  client: string;
  type: "dine-in" | "takeaway" | "delivery";
  total: number;
  status: "completed" | "cancelled" | "refunded" | "partial-refund";
  date: string; // ex: "2023-09-10T18:30:00Z"
  branch: string;
}

interface OrderHistoryTableProps {
  orders: Order[];
  onView: (id: string) => void;
}

export default function OrderHistoryTable({
  orders,
  onView,
}: OrderHistoryTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/sales/orders/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Complété</span>;
      case "cancelled":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Annulé</span>;
      case "refunded":
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Remboursé</span>;
      case "partial-refund":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Remboursement Partiel</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "dine-in":
        return "Tableau 12"; // à remplacer par le vrai numéro de table
      case "takeaway":
        return "Plats à emporter";
      case "delivery":
        return "Livraison";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Commande #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date et heure</TableHead>
            <TableHead>Bifurquer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(order.id)}
            >
              <TableCell className="font-medium">{order.number}</TableCell>
              <TableCell>{order.client}</TableCell>
              <TableCell>{getTypeLabel(order.type)}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{order.branch}</span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(order.id);
                  }}
                  aria-label={`Voir la commande ${order.number}`}
                  className="gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}