"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, User, Users } from "lucide-react";

export default function CreateRolePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"details" | "permissions">(
    "details"
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scope: "siege-social",
    permissions: {} as Record<
      string,
      { view: boolean; create: boolean; edit: boolean; delete: boolean }
    >,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScopeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, scope: value }));
  };

  const handlePermissionChange = (
    module: string,
    action: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...(prev.permissions[module] || {
            view: false,
            create: false,
            edit: false,
            delete: false,
          }),
          [action]: checked,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau rôle créé :", formData);
    alert("Rôle créé !");
    router.push("/admin-settings/roles-permissions");
  };

  const handleCancel = () => {
    router.back();
  };
  const renderDetailsTab = () => (
    <div className="space-y-6 flex flex-col">
      {/* Nom du rôle */}
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

      {/* Description */}
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

      {/* Étendue de l'accès */}
      <div className="space-y-2">
        <label htmlFor="scope" className="text-sm font-medium">
          Étendue de l&apos;accès
        </label>
        <Select onValueChange={handleScopeChange} value={formData.scope}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner l'étendue de l'accès" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="siege-social">Siège social</SelectItem>
            <SelectItem value="bifurquer">Bifurquer</SelectItem>
            <SelectItem value="region">Région</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground mt-1">
          Les utilisateurs ayant ce rôle peuvent uniquement accéder à la branche
          qui leur est spécifiquement attribuée.
        </p>
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="">
        <h3 className="text-lg font-medium mb-4">Autorisations</h3>
        <p className="mb-4">
          Sélectionnez ce que les utilisateurs avec ce rôle peuvent faire dans
          chaque module du système.
        </p>
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
                    onChange={(e) =>
                      handlePermissionChange(module, "view", e.target.checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-create`}
                    checked={formData.permissions[module]?.create || false}
                    onChange={(e) =>
                      handlePermissionChange(module, "create", e.target.checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-edit`}
                    checked={formData.permissions[module]?.edit || false}
                    onChange={(e) =>
                      handlePermissionChange(module, "edit", e.target.checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`${module}-delete`}
                    checked={formData.permissions[module]?.delete || false}
                    onChange={(e) =>
                      handlePermissionChange(module, "delete", e.target.checked)
                    }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
        <h1 className="text-2xl font-bold mt-2">Créer un nouveau rôle</h1>
        <p className="text-sm text-muted-foreground">
          Définir un nouveau rôle et ses autorisations
        </p>
      </div>

      {/* Onglets */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 pb-2">
          <Button
            variant="ghost"
            className={`relative shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === "details"
                ? "text-primary hover:text-primary hover:bg-gray-200"
                : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("details")}
            aria-selected={activeTab === "details"}
            role="tab"
          >
            <Shield className="w-4 h-4" />
            Détails du rôle
            {activeTab === "details" && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
            )}
          </Button>
          <Button
            variant="ghost"
            className={`relative shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === "permissions"
                ? "text-primary hover:text-primary hover:bg-gray-200"
                : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("permissions")}
            aria-selected={activeTab === "permissions"}
            role="tab"
          >
            <Users className="w-4 h-4" />
            Autorisations
            {activeTab === "permissions" && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
            )}
          </Button>
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "permissions" && renderPermissionsTab()}
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
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
