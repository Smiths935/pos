/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
// src/app/settings/users/[id]/edit/page.tsx
"use client";

import { useState, useEffect, act } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserEditTabs from "../_components/form/user-edit-tabs";
import { Trash, TrashIcon, Upload } from "lucide-react";

// Données simulées — à remplacer par un appel API
const mockUsers = [
  {
    id: "user1",
    name: "Peter Bryan",
    email: "peter.bryan@eatlypos.com",
    firstName: "Peter",
    lastName: "Bryan",
    phone: "+1(555)123-4567",
    status: "active",
    role: "admin",
    branches: ["centre-ville", "westside"],
    activityLog: [
      { timestamp: "Dec 6, 2025 9:13 AM", action: "Logged in" },
      {
        timestamp: "Dec 6, 2025 9:58 AM",
        action: "Updated inventory settings",
      },
    ],
    accessRestrictions: {
      canViewOwnReports: false,
      canEditInventory: true,
    },
    imageUrl: "/public/assets/foods/greek-salad.png",
  },
];

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"profile" | "roles" | "activity">(
    "profile"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    status: "active" as "active" | "inactive",
    role: "",
    branches: [] as string[],
    accessRestrictions: {
      canViewOwnReports: false,
      canEditInventory: false,
    },
    activityLog: [] as { timestamp: string; action: string }[],
  });

  useEffect(() => {
    if (id) {
      const foundUser = mockUsers.find((u) => u.id === id);
      if (foundUser) {
        setFormData({
          name: foundUser.name,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          phone: foundUser.phone,
          status: foundUser.status as "active" | "inactive",
          role: foundUser.role,
          branches: foundUser.branches,
          accessRestrictions: foundUser.accessRestrictions,
          activityLog: foundUser.activityLog,
        });
        if (foundUser.imageUrl) {
          setPreviewUrl(foundUser.imageUrl);
        } else {
          setPreviewUrl(null);
        }
      } else {
        // Redirige vers la liste si l'utilisateur n'existe pas
        router.push("/admin-settings/user");
      }
    }
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? "active" : "inactive",
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleBranchChange = (branchId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        branches: [...prev.branches, branchId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        branches: prev.branches.filter((b) => b !== branchId),
      }));
    }
  };

  const handleAccessRestrictionChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      accessRestrictions: { ...prev.accessRestrictions, [field]: checked },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Utilisateur mis à jour :", {
      ...formData,
      imageFile, // ← Envoyé à l’API
    });
    alert("Utilisateur mis à jour !");
    router.push(`/admin-settings/user/${id}`);
  };
  const handleCancel = () => {
    router.back();
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      console.log("Suppression de l'utilisateur :", id);
      // Appel API DELETE ici
      router.push("/admin-settings/user");
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Image de profil</h3>
        {/* <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {formData.firstName.charAt(0)}
            {formData.lastName.charAt(0)}
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Télécharger une image
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              Supprimer l'image
            </Button>
          </div>
        </div> */}
        <div className="flex items-center gap-4">
          {/* Prévisualisation de l'image */}
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Prévisualisation"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>
                {formData.firstName.charAt(0)}
                {formData.lastName.charAt(0)}
              </span>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="space-x-2">
            {/* Bouton "Télécharger une image" */}
            <Button
              variant="ghost"
              className="bg-blue-100 hover:bg-blue-200 text-blue-400 hover:text-blue-500"
              size="sm"
              onClick={() => document.getElementById("imageUpload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Télécharger une image
            </Button>

            {/* Bouton "Supprimer l'image" */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPreviewUrl(null);
                setImageFile(null);
              }}
              className="bg-red-100 hover:bg-red-200 text-red-400 hover:text-red-600"
            >
              <TrashIcon className="h-4 w-4" />
              Supprimer l'image
            </Button>
          </div>

          {/* Input caché pour le téléchargement */}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-xs text-muted-foreground mb-2">Adresse email</h3>
        <Input
          id="email"
          value={formData.email}
          disabled
          placeholder="L'adresse e-mail ne peut pas être modifiée."
          className="w-full"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          L'adresse e-mail ne peut pas être modifiée.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-xs text-muted-foreground"
              >
                Prénom
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Numéro de téléphone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-xs text-muted-foreground"
              >
                Nom de famille
              </label>
              <Input
                id="lastName"
                name="lastName"
                disabled
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Statut de l'utilisateur
              </label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={handleStatusChange}
                />
                <label htmlFor="status" className="text-sm">
                  {formData.status === "active" ? "Actif" : "Inactif"}
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Les utilisateurs inactifs ne peuvent pas se connecter au
                système.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRolesTab = () => (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Rôle</h3>
        <Select onValueChange={handleRoleChange} value={formData.role}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="stock-specialist">
              Spécialiste des stocks
            </SelectItem>
            <SelectItem value="cashier">Caissier</SelectItem>
            <SelectItem value="branch-manager">Directeur d'agence</SelectItem>
            <SelectItem value="regional-manager">
              Responsable régional
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-1 text-xs text-muted-foreground">
          Le rôle de l'utilisateur détermine ses permissions système par défaut.
        </p>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Affectation des branches</h3>
        <div className="space-y-2">
          {[
            "centre-ville",
            "westside",
            "east",
            "northside",
            "airport",
            "plaza",
          ].map((branchId) => {
            const branchName = {
              "centre-ville": "Centre-ville principal",
              westside: "Place Westside",
              east: "Coin est",
              northside: "Centre commercial Northside",
              airport: "Terminal de l'aéroport",
              plaza: "Plaza +1",
            }[branchId];
            const region = {
              "centre-ville": "Centre-ville",
              westside: "Ouest",
              east: "Est",
              northside: "Nord",
              airport: "Aéroport",
              plaza: "Centre-ville",
            }[branchId];
            return (
              <div key={branchId} className="flex items-center space-x-2">
                <Switch
                  id={`branch-${branchId}`}
                  checked={formData.branches.includes(branchId)}
                  onCheckedChange={(checked) =>
                    handleBranchChange(branchId, checked)
                  }
                />
                <label htmlFor={`branch-${branchId}`} className="text-sm">
                  {branchName} ({region})
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Restrictions d'accès</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="canViewOwnReports"
              checked={formData.accessRestrictions.canViewOwnReports}
              onCheckedChange={(checked) =>
                handleAccessRestrictionChange("canViewOwnReports", checked)
              }
            />
            <label htmlFor="canViewOwnReports" className="text-sm">
              Peut-il voir ses propres rapports ?
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Si activé, l'utilisateur ne peut voir que les rapports liés à ses
            branches assignées et à ses propres activités.
          </p>

          <div className="flex items-center space-x-2 mt-4">
            <Switch
              id="canEditInventory"
              checked={formData.accessRestrictions.canEditInventory}
              onCheckedChange={(checked) =>
                handleAccessRestrictionChange("canEditInventory", checked)
              }
            />
            <label htmlFor="canEditInventory" className="text-sm">
              Peut-il modifier l'inventaire ?
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Si activé, l'utilisateur peut modifier les articles d'inventaire,
            les niveaux de stock et les recettes.
          </p>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Journal d'activité</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border">
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground">
              <div>Timestamp</div>
              <div>Action</div>
            </div>
          </div>
          <div className="divide-y divide-border">
            {formData.activityLog?.map((log, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 px-4 py-3">
                <div>{log.timestamp}</div>
                <div>{log.action}</div>
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
        <div className="flex items-center space-x-4 mt-4">
          <h1 className="text-2xl font-bold">Modifier {formData.name}</h1>
          <span className="px-2 text-xs py-1 font-medium rounded-sm bg-gray-200 text-gray-800">
            {formData.role}
          </span>
          <span className="px-2 text-xs py-1 font-medium rounded-sm bg-green-100 text-green-800">
            {formData.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Gérer les informations des utilisateurs, leurs rôles et leurs
          autorisations d'accès
        </p>
      </div>

      {/* Onglets */}
      <UserEditTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "roles" && renderRolesTab()}
        {activeTab === "activity" && renderActivityTab()}
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
        <Button
          variant="outline"
          onClick={handleDelete}
          className="ml-auto text-red-600 hover:text-red-700"
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
}
