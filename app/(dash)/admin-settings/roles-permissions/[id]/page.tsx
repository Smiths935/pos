/* eslint-disable react/no-unescaped-entities */
// src/app/settings/roles-permissions/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleEditTabs from "../_components/role-edit-tabs";

// Données simulées — à remplacer par un appel API
const mockRoles = [
  {
    id: "r_1",
    name: "Administrateur du système",
    description: "Accès complet à toutes les fonctionnalités du système",
    scope: "siege-social",
    permissions: {
      "Dashboard": { view: true, create: true, edit: true, delete: true },
      "Orders": { view: true, create: true, edit: true, delete: true },
      "Menu Management": { view: true, create: true, edit: true, delete: true },
      "Inventory": { view: true, create: true, edit: true, delete: true },
      "Purchasing": { view: true, create: true, edit: true, delete: true },
      "Waste Management": { view: true, create: true, edit: true, delete: true },
      "Staff Management": { view: true, create: true, edit: true, delete: true },
      "Customer Management": { view: true, create: true, edit: true, delete: true },
      "Loyalty Program": { view: true, create: true, edit: true, delete: true },
      "Reports": { view: true, create: true, edit: true, delete: true },
      "Admin Settings": { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: "r_2",
    name: "Directeur d'agence",
    description: "Gère tous les aspects des opérations de la succursale",
    scope: "bifurquer",
    permissions: {
      "Dashboard": { view: true, create: true, edit: true, delete: true },
      "Orders": { view: true, create: true, edit: true, delete: true },
      "Menu Management": { view: true, create: false, edit: false, delete: false },
      "Inventory": { view: true, create: true, edit: true, delete: true },
      "Purchasing": { view: true, create: false, edit: false, delete: false },
      "Waste Management": { view: true, create: false, edit: false, delete: false },
      "Staff Management": { view: true, create: false, edit: false, delete: false },
      "Customer Management": { view: true, create: true, edit: true, delete: true },
      "Loyalty Program": { view: true, create: false, edit: false, delete: false },
      "Reports": { view: true, create: true, edit: true, delete: true },
      "Admin Settings": { view: false, create: false, edit: false, delete: false },
    },
  },
];

export default function EditRolePage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"details" | "permissions">("details");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scope: "siege-social",
    permissions: {} as Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }>,
  });

  useEffect(() => {
    if (id) {
      const foundRole = mockRoles.find((r) => r.id === id);
      if (foundRole) {
        setFormData({
          name: foundRole.name,
          description: foundRole.description,
          scope: foundRole.scope,
          permissions: foundRole.permissions,
        });
      } else {
        // Redirige vers la liste si le rôle n'existe pas
        router.push("/admin-settings/roles-permissions");
      }
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScopeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, scope: value }));
  };

  const handlePermissionChange = (module: string, action: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...(prev.permissions[module] || { view: false, create: false, edit: false, delete: false }),
          [action]: checked,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rôle mis à jour :", formData);
    alert("Rôle mis à jour !");
    router.push(`/admin-settings/roles-permissions/${id}`);
  };

  const handleCancel = () => {
    router.back();
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom du rôle
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Saisissez le nom du rôle"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Décrivez l'objectif et les responsabilités de ce rôle"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="scope" className="text-sm font-medium">
              Étendue de l'accès
            </label>
            <Select onValueChange={handleScopeChange} value={formData.scope}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner l'étendue de l'accès" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="siege-social">Siège social</SelectItem>
                <SelectItem value="bifurquer">Bifurquer</SelectItem>
                <SelectItem value="region">Région</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Les utilisateurs ayant ce rôle peuvent uniquement accéder à la branche qui leur est spécifiquement attribuée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Autorisations</h3>
        <p className="mb-4">Sélectionnez ce que les utilisateurs avec ce rôle peuvent faire dans chaque module du système.</p>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
              <div>Module</div>
              <div>View</div>
              <div>Create</div>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </div>
          <div className="divide-y divide-border">
            {[
              "Dashboard",
              "Orders",
              "Menu Management",
              "Inventory",
              "Purchasing",
              "Waste Management",
              "Staff Management",
              "Customer Management",
              "Loyalty Program",
              "Reports",
              "Admin Settings",
            ].map((module) => (
              <div key={module} className="grid grid-cols-5 gap-4 px-4 py-3">
                <div className="font-medium">{module}</div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-view`}
                    checked={formData.permissions[module]?.view || false}
                    onChange={(e) => handlePermissionChange(module, "view", e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-create`}
                    checked={formData.permissions[module]?.create || false}
                    onChange={(e) => handlePermissionChange(module, "create", e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-edit`}
                    checked={formData.permissions[module]?.edit || false}
                    onChange={(e) => handlePermissionChange(module, "edit", e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-delete`}
                    checked={formData.permissions[module]?.delete || false}
                    onChange={(e) => handlePermissionChange(module, "delete", e.target.checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
        <h1 className="text-2xl font-bold mt-2">Modifier {formData.name}</h1>
        <p className="text-sm text-muted-foreground">Gérer les rôles des utilisateurs et leurs autorisations d'accès dans l'ensemble du système</p>
      </div>

      {/* Onglets */}
      <RoleEditTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "permissions" && renderPermissionsTab()}
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}