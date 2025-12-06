// src/app/settings/roles-permissions/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoleFilterBar from "./_components/role-filter-bar";
import RoleTable, { Role } from "@/components/data-table/role-table";
import HeadSectionPage from "@/components/headSectionPage";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Données simulées — à remplacer par un appel API
const mockRoles: Role[] = [
  {
    id: "r_1",
    name: "Administrateur du système",
    description: "Accès complet à toutes les fonctionnalités du système",
    assignedUsers: 2,
    accessLevel: "siege-social",
  },
  {
    id: "r_2",
    name: "Directeur d'agence",
    description: "Gère tous les aspects des opérations de la succursale",
    assignedUsers: 5,
    accessLevel: "bifurquer",
  },
  {
    id: "r_3",
    name: "Caissier",
    description: "Gère les transactions et les commandes des clients",
    assignedUsers: 12,
    accessLevel: "bifurquer",
  },
  {
    id: "r_4",
    name: "Personnel de cuisine",
    description: "Gère la préparation et l'inventaire des aliments",
    assignedUsers: 8,
    accessLevel: "bifurquer",
  },
  {
    id: "r_5",
    name: "Directeur régional",
    description:
      "Supervise les opérations de plusieurs succursales dans une région.",
    assignedUsers: 3,
    accessLevel: "region",
  },
];

export default function RolesPermissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("all");

  const router = useRouter();
  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleScopeChange = (value: string) => {
    setScope(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setScope("all");
    // Réinitialise aussi l'input de recherche
    document
      .querySelector(
        'input[placeholder="Recherche par nom de rôle ou description..."]'
      )
      // ?.focus();
  };

  // Filtrer les rôles
  const filteredRoles = mockRoles.filter((role) => {
    const matchesSearch =
      searchQuery === "" ||
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScope = scope === "all" || role.accessLevel === scope;
    return matchesSearch && matchesScope;
  });

  const handleEditRole = (id: string) => {
    console.log("Éditer le rôle :", id);
    // Redirige vers /settings/roles-permissions/[id]/edit
    router.push(`/admin-settings/roles-permissions/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <HeadSectionPage
          title="Rôles et permissions"
          description="Gérer les rôles des utilisateurs et leurs autorisations d'accès dans l'ensemble du système"
          actionButton={{
            label: "ajouter un role",
            icon: PlusIcon,
            onClick: () =>router.push("/admin-settings/roles-permissions/new"),
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <RoleFilterBar
          onSearch={handleSearch}
          onScopeChange={handleScopeChange}
          onReset={handleReset}
        />
      </div>

      <RoleTable roles={filteredRoles} onEdit={handleEditRole} />

      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-muted-foreground">
            Affichage des résultats 1 à 5 sur 5
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
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
