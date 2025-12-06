// src/components/ui/data-table/branch-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Branch {
  id: string;
  name: string;
  code: string;
  region: string;
  status: "active" | "inactive";
  director: string;
  services: ("dine-in" | "takeaway" | "delivery")[];
}

interface BranchTableProps {
  branches: Branch[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BranchTable({
  branches,
  onEdit,
  onDelete,
}: BranchTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/admin-settings/organisation/branches/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Actif</span>;
      case "inactive":
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactif</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getServicesBadges = (services: string[]) => {
    return services.map((service) => {
      switch (service) {
        case "dine-in":
          return <span key={service} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Repas sur place</span>;
        case "takeaway":
          return <span key={service} className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Emporter</span>;
        case "delivery":
          return <span key={service} className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Livraison</span>;
        default:
          return <span key={service} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{service}</span>;
      }
    });
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted/50">
            <TableHead>Nom de la succursale</TableHead>
            <TableHead>Région</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Directeur</TableHead>
            <TableHead>Services</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow
              key={branch.id}
              className="hover:bg-card cursor-pointer"
              onClick={() => handleRowClick(branch.id)}
            >
              <TableCell>
                <div className="font-medium">{branch.name}</div>
                <span className="text-xs text-muted-foreground">Code : {branch.code}</span>
              </TableCell>
              <TableCell>{branch.region}</TableCell>
              <TableCell>{getStatusBadge(branch.status)}</TableCell>
              <TableCell>{branch.director}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {getServicesBadges(branch.services)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(branch.id);
                    }}
                    aria-label={`Modifier ${branch.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(branch.id);
                    }}
                    aria-label={`Supprimer ${branch.name}`}
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}