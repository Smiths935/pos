/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import OrderTable, { Order } from "@/components/data-table/order-table";
import { useState } from "react";
import OrderFilterBar from "../_components/order-filter-bar";
import { Button } from "@/components/ui/button";

// Données simulées — à remplacer par un appel API
const mockOrders: Order[] = [
  {
    id: "o_1",
    number: "#1001",
    client: "John Smith",
    type: "dine-in",
    itemsCount: 3,
    total: 34.95,
    status: "cooking",
    createdAt: "2025-12-05T17:55:31Z",
    cookingStartedAt: "2025-12-05T17:57:31Z",
  },
  {
    id: "o_2",
    number: "#1002",
    client: "Sarah Johnson",
    type: "takeaway",
    itemsCount: 2,
    total: 17.98,
    status: "ready",
    createdAt: "2025-12-05T17:50:00Z",
    readyAt: "2025-12-05T17:53:00Z",
  },
  {
    id: "o_3",
    number: "#1003",
    client: "Michael Chen",
    type: "delivery",
    itemsCount: 3,
    total: 23.97,
    status: "new",
    createdAt: "2025-12-05T17:58:00Z",
  },
  {
    id: "o_4",
    number: "#1004",
    client: "Emma Wilson",
    type: "dine-in",
    itemsCount: 2,
    total: 10.97,
    status: "ready",
    createdAt: "2025-12-05T17:45:00Z",
    readyAt: "2025-12-05T17:48:00Z",
  },
  {
    id: "o_5",
    number: "#1005",
    client: "David Rodriguez",
    type: "dine-in",
    itemsCount: 2,
    total: 37.96,
    status: "preparing",
    createdAt: "2025-12-05T17:52:00Z",
    preparingStartedAt: "2025-12-05T17:54:00Z",
  },
  {
    id: "o_6",
    number: "#1006",
    client: "Linda Kim",
    type: "takeaway",
    itemsCount: 3,
    total: 19.97,
    status: "cooking",
    createdAt: "2025-12-05T17:56:00Z",
    cookingStartedAt: "2025-12-05T17:58:00Z",
  },
  {
    id: "o_7",
    number: "#1007",
    client: "James Brown",
    type: "dine-in",
    itemsCount: 2,
    total: 23.96,
    status: "ready",
    createdAt: "2025-12-05T17:40:00Z",
    readyAt: "2025-12-05T17:43:00Z",
  },
  {
    id: "o_8",
    number: "#1008",
    client: "Sofia Martinez",
    type: "delivery",
    itemsCount: 2,
    total: 22.97,
    status: "preparing",
    createdAt: "2025-12-05T17:53:00Z",
    preparingStartedAt: "2025-12-05T17:55:00Z",
  },
  {
    id: "o_9",
    number: "#1009",
    client: "Robert Wang",
    type: "takeaway",
    itemsCount: 2,
    total: 20.98,
    status: "ready",
    createdAt: "2025-12-05T17:35:00Z",
    readyAt: "2025-12-05T17:38:00Z",
  },
  {
    id: "o_10",
    number: "#1010",
    client: "Elizabeth Thompson",
    type: "dine-in",
    itemsCount: 1,
    total: 11.96,
    status: "new",
    createdAt: "2025-12-05T17:59:00Z",
  },
];
export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatus("all");
    setType("all");
    // Réinitialise aussi l'input de recherche
    document.querySelector('input[placeholder="Recherche par numéro de commande ou client..."]')
    // ?.focus();
  };

  // Filtrer les commandes
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = searchQuery === "" || order.number.toLowerCase().includes(searchQuery.toLowerCase()) || order.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === "all" || order.status === status;
    const matchesType = type === "all" || order.type === type;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewOrder = (id: string) => {
    console.log("Voir la commande :", id);
    // Redirige vers /sales/[id]
    window.location.href = `/sales/live-order/${id}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Commandes en direct</h1>
        <p className="text-sm text-muted-foreground">Consultez et gérez toutes les commandes en cours</p>
      </div>

      {/* Barre de filtres */}
      <OrderFilterBar
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
        onReset={handleReset}
      />

      {/* Tableau */}
      <OrderTable
        orders={filteredOrders}
        onView={handleViewOrder}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-muted-foreground">Affichage des résultats 1 à 10 sur 15</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Précédent</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Suivant</Button>
        </div>
      </div>
    </div>
  );
}