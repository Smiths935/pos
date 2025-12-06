'use client'
import HeadSectionPage from '@/components/headSectionPage'
import { Plus, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation';


import { useState } from "react";
import UserFilterBar from './_components/user-filter-bar';
import { Button } from '@/components/ui/button';
import UserTable from '@/components/data-table/user-table';

// Données simulées — à remplacer par un appel API
const mockUsers = [
  {
    id: "user1",
    name: "Peter Bryan",
    email: "peter.bryan@eatlypos.com",
    role: "Administrateur",
    branches: ["Centre-ville principal", "Place Westside"],
    status: "active",
    lastActivity: "il y a environ 3 heures",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane.smith@eatlypos.com",
    role: "Spécialiste des stocks",
    branches: ["Centre-ville principal"],
    status: "active",
    lastActivity: "il y a 1 jour",
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert.johnson@eatlypos.com",
    role: "Caissier",
    branches: ["Place Westside"],
    status: "active",
    lastActivity: "il y a 2 jours",
  },
  {
    id: "user4",
    name: "Maria Garcia",
    email: "maria.garcia@eatlypos.com",
    role: "Directeur d'agence",
    branches: ["Coin est"],
    status: "active",
    lastActivity: "il y a environ une heure",
  },
  {
    id: "user5",
    name: "David Chen",
    email: "david.chen@eatlypos.com",
    role: "Responsable régional",
    branches: ["Centre-ville principal", "Westside", "Plaza +1"],
    status: "inactive",
    lastActivity: "il y a 7 jours",
  },
  {
    id: "user6",
    name: "Sarah Wilson",
    email: "sarah.wilson@eatlypos.com",
    role: "Caissier",
    branches: ["Centre-ville principal"],
    status: "active",
    lastActivity: "il y a environ 5 heures",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("all");
  const [branch, setBranch] = useState("all");
  const [status, setStatus] = useState("all");
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleBranchChange = (value: string) => {
    setBranch(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setRole("all");
    setBranch("all");
    setStatus("all");
    // Réinitialise aussi l'input de recherche
    document.querySelector('input[placeholder="Recherche par nom ou par courriel..."]')?.focus();
  };

  // Filtrer les utilisateurs
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = searchQuery === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = role === "all" || user.role === role;
    const matchesBranch = branch === "all" || user.branches.some(b => b === branch);
    const matchesStatus = status === "all" || user.status === status;
    return matchesSearch && matchesRole && matchesBranch && matchesStatus;
  });

  const handleEditUser = (id: string) => {
    console.log("Éditer l'utilisateur :", id);
    // Redirige vers /settings/users/[id]/edit
    window.location.href = `/admin-settings/user/${id}`;
  };

  return (
    <div className="space-y-6">
      <div>
         <HeadSectionPage
            title="Gestions des Utilisateurs"
            description="Gérez les utilisateurs ayant accès à votre organisation Carewash POS. Ajoutez, modifiez ou supprimez des utilisateurs et attribuez-leur des rôles spécifiques pour contrôler leurs permissions."
            actionButton={{
                icon: UserPlus,
                label: "inviter un utilisateur",
               onClick: () => router.push("/admin-settings/user/invite"),
            }}
        />
      </div>

      {/* Barre de filtres */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <UserFilterBar
          onSearch={handleSearch}
          onRoleChange={handleRoleChange}
          onBranchChange={handleBranchChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
      </div>

      {/* Tableau */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
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