// src/components/ui/data-table/order-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlarmCheck, ChevronRight, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export interface Order {
  id: string;
  number: string;
  client: string;
  type: "dine-in" | "takeaway" | "delivery";
  itemsCount: number;
  total: number;
  status: "new" | "preparing" | "ready" | "cooking" | "completed" | "cancelled";
  createdAt: string; // ex: "2025-12-05T17:55:31Z"
  preparingStartedAt?: string;
  readyAt?: string;
  cookingStartedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

interface OrderTableProps {
  orders: Order[];
  onView: (id: string) => void;
}

// Fonction pour calculer le temps écoulé depuis un timestamp
const calculateTime = (order: Order) => {
  const now = new Date();
  let start: Date | null = null;

  if (order.status === "new" && order.createdAt) {
    start = new Date(order.createdAt);
  } else if (order.status === "preparing" && order.preparingStartedAt) {
    start = new Date(order.preparingStartedAt);
  } else if (order.status === "ready" && order.readyAt) {
    start = new Date(order.readyAt);
  } else if (order.status === "cooking" && order.cookingStartedAt) {
    start = new Date(order.cookingStartedAt);
  } else if (order.status === "completed" && order.completedAt) {
    start = new Date(order.completedAt);
  } else if (order.status === "cancelled" && order.cancelledAt) {
    start = new Date(order.cancelledAt);
  }

  if (!start) return "—";

  const diffMs = now.getTime() - start.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffSec = Math.floor((diffMs % 60000) / 1000);

  if (diffMin >= 60) {
    return `${Math.floor(diffMin / 60)}h${diffMin % 60}`;
  }

  return `${diffMin}:${diffSec.toString().padStart(2, "0")}`;
};

export default function OrderTable({ orders, onView }: OrderTableProps) {
  const router = useRouter();
  const [timeMap, setTimeMap] = useState<Record<string, string>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Met à jour les durées toutes les secondes
  useEffect(() => {
    const updateTimes = () => {
      const newTimeMap: Record<string, string> = {};
      orders.forEach((order) => {
        newTimeMap[order.id] = calculateTime(order);
      });
      setTimeMap(newTimeMap);
    };

    updateTimes();

    intervalRef.current = setInterval(updateTimes, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [orders]);

  const handleRowClick = (id: string) => {
    router.push(`/sales/live-order/${id}`);
  };
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "dine-in":
        return "Repas sur place";
      case "takeaway":
        return "À emporter";
      case "delivery":
        return "Livraison";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-800">
            Nouveau
          </span>
        );
      case "preparing":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-800">
            Se Préparer
          </span>
        );
      case "ready":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-800">
            Prêt
          </span>
        );
      case "cooking":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-orange-100 text-orange-800">
            Cuisson
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800">
            Complété
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-800">
            Annulé
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Commande #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Temps</TableHead>
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
              <TableCell>{order.itemsCount}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1">
                  <AlarmCheck className="w-4 h-4"/>
                  {timeMap[order.id] || "—"}
                </span>
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
                  className="gap-1 bg-blue-500 text-blue-50 items-center "
                >
                  Voir
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
