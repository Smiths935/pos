// src/components/ui/data-table/role-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Role {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
  accessLevel: "siege-social" | "bifurquer" | "region";
}

interface RoleTableProps {
  roles: Role[];
  onEdit: (id: string) => void;
}

export default function RoleTable({
  roles,
  onEdit,
}: RoleTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/admin-settings/roles-permissions/${id}`);
  };

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "siege-social":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">siège social</span>;
      case "bifurquer":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Bifurquer</span>;
      case "region":
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Région</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{level}</span>;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Nom du rôle</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Utilisateurs désignés</TableHead>
            <TableHead>Niveau d&apos;accès</TableHead>
            <TableHead>Actes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow
              key={role.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(role.id)}
            >
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>{role.assignedUsers}</TableCell>
              <TableCell>{getAccessLevelBadge(role.accessLevel)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(role.id);
                  }}
                  aria-label={`Éditer ${role.name}`}
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