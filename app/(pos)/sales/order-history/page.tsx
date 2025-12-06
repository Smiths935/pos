/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import HeadSectionPage from "@/components/headSectionPage";
import { FileDown, PrinterIcon } from "lucide-react";

import { useState } from "react";
import OrderHistoryFilterBar from "../_components/order-history-filter-bar";
import OrderHistoryTable, { Order } from "@/components/data-table/order-history-table";
import { Button } from "@/components/ui/button";

// Données simulées — à remplacer par un appel API
const mockOrders: Order[] = [
  {
    id: "o_1",
    number: "#ORD78901",
    client: "Emma Thompson",
    type: "dine-in",
    total: 42.96,
    status: "completed",
    date: "2023-09-10T18:30:00Z",
    branch: "Succursale de Los Angeles",
  },
  {
    id: "o_2",
    number: "#ORD78902",
    client: "Michael Chen",
    type: "takeaway",
    total: 23.98,
    status: "completed",
    date: "2023-09-10T12:15:00Z",
    branch: "Succursale de Los Angeles",
  },
  {
    id: "o_3",
    number: "#ORD78903",
    client: "Sarah Johnson",
    type: "delivery",
    total: 35.96,
    status: "completed",
    date: "2023-09-09T19:00:00Z",
    branch: "Succursale de San Francisco",
  },
  {
    id: "o_4",
    number: "#ORD78904",
    client: "Robert Davis",
    type: "dine-in",
    total: 44.97,
    status: "cancelled",
    date: "2023-09-08T18:00:00Z",
    branch: "Succursale de Los Angeles",
  },
  {
    id: "o_5",
    number: "#ORD78905",
    client: "Jennifer Lee",
    type: "takeaway",
    total: 26.98,
    status: "refunded",
    date: "2023-09-07T13:30:00Z",
    branch: "Succursale Avenue Mall",
  },
  {
    id: "o_6",
    number: "#ORD78906",
    client: "David Wilson",
    type: "delivery",
    total: 25.97,
    status: "partial-refund",
    date: "2023-09-06T19:30:00Z",
    branch: "Succursale de Los Angeles",
  },
  {
    id: "o_7",
    number: "#ORD78907",
    client: "Jessica Miller",
    type: "dine-in",
    total: 67.96,
    status: "completed",
    date: "2023-09-05T17:45:00Z",
    branch: "Succursale Avenue Mall",
  },
];

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [branch, setBranch] = useState("all");

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

  const handleBranchChange = (value: string) => {
    setBranch(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatus("all");
    setType("all");
    setBranch("all");
    // Réinitialise aussi l'input de recherche
    document.querySelector('input[placeholder="Recherche par numéro de commande ou client..."]')
    // ?.focus();
  };

  // Filtrer les commandes
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = searchQuery === "" || order.number.toLowerCase().includes(searchQuery.toLowerCase()) || order.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === "all" || order.status === status;
    const matchesType = type === "all" || order.type === type;
    const matchesBranch = branch === "all" || order.branch === branch;
    return matchesSearch && matchesStatus && matchesType && matchesBranch;
  });

  const handleViewOrder = (id: string) => {
    console.log("Voir la commande :", id);
    // Redirige vers /sales/orders/[id]
    window.location.href = `/sales/orders-history/${id}`;
  };

  return (
    <div className="space-y-6">
       <HeadSectionPage
        title="Commandes"
        description="Gérer les commandes en cours"
        // actionButton={{
        //   label: "Nouvelle commande",
        //   onClick: () => router.push("/orders/new"),
        // }}
        exportButton={{
          label: "Exportation",
          icon: FileDown,
          //   onClick: () => exportMutation.mutate(),
          onClick: () => {},
          disabled: false,
        }}
        printButton={{
          label: "Imprimer",
          icon: PrinterIcon,
          //   onClick: () => printMutation.mutate(),
          onClick: () => {},
          disabled: false,
        }}
      />
      {/* Barre de filtres */}
      <OrderHistoryFilterBar
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
        onBranchChange={handleBranchChange}
        onReset={handleReset}
      />

      {/* Tableau */}
      <OrderHistoryTable
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