// src/components/ui/data-table/user-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branches: string[];
  status: "active" | "inactive";
  lastActivity: string; // ex: "il y a 3 heures"
}

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
}

export default function UserTable({
  users,
  onEdit,
}: UserTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/admin-settings/user/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Actif</span>;
      case "inactive":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactif</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Nom</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Branche(s) assignée(s)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead>Actes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(user.id)}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.branches.map((branch) => (
                    <span key={branch} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {branch}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{user.lastActivity}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(user.id);
                  }}
                  aria-label={`Éditer ${user.name}`}
                >
                  <EditIcon className="h-4 w-4 text-blue-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}