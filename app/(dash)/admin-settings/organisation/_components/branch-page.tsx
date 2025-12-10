/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import BranchFilterBar from "./_form/branch-filter-bar";
import BranchTable from "@/components/data-table/branch-table";
import { Button } from "@/components/ui/button";

// Données simulées — à remplacer par un appel API
const mockBranches = [
  {
    id: "b_1",
    name: "Centre-ville principal",
    code: "DTM-001",
    region: "centre-ville",
    status: "active",
    director: "John Smith",
    services: ["dine-in", "takeaway", "delivery"],
  },
  {
    id: "b_2",
    name: "Place Westside",
    code: "WSP-002",
    region: "Ouest",
    status: "active",
    director: "Emma Johnson",
    services: ["dine-in", "takeaway"],
  },
  {
    id: "b_3",
    name: "Coin est",
    code: "ESC-003",
    region: "Est",
    status: "active",
    director: "Michael Davis",
    services: ["takeaway", "delivery"],
  },
  {
    id: "b_4",
    name: "Centre commercial Northside",
    code: "NSM-004",
    region: "Nord",
    status: "active",
    director: "Sarah Wilson",
    services: ["dine-in", "takeaway"],
  },
  {
    id: "b_5",
    name: "Terminal de l'aéroport",
    code: "APT-005",
    region: "Aéroport",
    status: "inactive",
    director: "Parc David",
    services: ["dine-in", "takeaway"],
  },
];
export default function BranchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleServiceChange = (value: string) => {
    setService(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatus("all");
    setRegion("all");
    setService("all");
    // Réinitialise aussi l'input de recherche
    document
      .querySelector('input[placeholder="Rechercher des succursales..."]')
      // ?.focus();
  };

  // Filtrer les branches
  const filteredBranches = mockBranches.filter((branch) => {
    const matchesSearch =
      searchQuery === "" ||
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === "all" || branch.status === status;
    const matchesRegion = region === "all" || branch.region === region;
    const matchesService =
      service === "all" || branch.services.includes(service as any);
    return matchesSearch && matchesStatus && matchesRegion && matchesService;
  });

  const handleEditBranch = (id: string) => {
    console.log("Éditer la branche :", id);
    // Redirige vers /settings/organization/branches/[id]/edit
    window.location.href = `/admin-settings/organisation/branches/${id}`;
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette branche ?")) {
      console.log("Suppression de la branche :", id);
      // Appel API DELETE ici
    }
  };

  const handlerAddBranch = () => {
    // Redirige vers /settings/organization/branches/add
    window.location.href = `/admin-settings/organisation/branches/add`;
  }

  return (
    <div>
      <BranchFilterBar
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onAddBranch={handlerAddBranch}
        onRegionChange={handleRegionChange}
        onServiceChange={handleServiceChange}
        onReset={handleReset}
      />

      {/* Tableau */}
      <BranchTable
        // branches={filteredBranches}
        branches={'zffzf' as any}
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-muted-foreground">
            Affichage des résultats 1 à 10 sur 15
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Précédent
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
