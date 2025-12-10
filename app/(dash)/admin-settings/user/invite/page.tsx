/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/settings/users/invite/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import PasswordGenerator from "../_components/form/password-generator";
import { Save, X } from "lucide-react";

// Données simulées — à remplacer par un appel API
const mockBranches = [
  {
    id: "centre-ville",
    name: "Centre-ville principal",
    region: "Centre-ville",
  },
  { id: "westside", name: "Place Westside", region: "Ouest" },
  { id: "east", name: "Coin est", region: "Est" },
  { id: "northside", name: "Centre commercial Northside", region: "Nord" },
  { id: "airport", name: "Terminal de l'aéroport", region: "Aéroport" },
  { id: "plaza", name: "Plaza +1", region: "Centre-ville" },
];

export default function InviteUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    branches: [] as string[],
    isPasswordSet: false,
    tempPassword: "",
  });

  const [showBranches, setShowBranches] = useState(true);
  const [branchesDB, setBranchesDB] = useState<any[]>([]);

  // Simule le chargement des branches depuis une base de données
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBranchesDB(mockBranches);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleBranchChange = (branch: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        branches: [...prev.branches, branch],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        branches: prev.branches.filter((b) => b !== branch),
      }));
    }
  };

  const handleTogglePasswordSet = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPasswordSet: checked }));
  };

  const handlePasswordChange = (password: string) => {
    setFormData((prev) => ({ ...prev, tempPassword: password }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Invitation envoyée :", {
      ...formData,
      branches: branchesDB
        .filter((b) => formData.branches.includes(b.id))
        .map((b) => b.name), // pour afficher les noms dans la console
    });
    alert("Invitation envoyée !");
    router.push("/admin-settings/user");
  };

  const handleCancel = () => {
    router.back();
  };

  const renderBranches = () => {
    return (
      <div className="space-y-2 overflow-y-auto">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Affecter à la ou aux succursales</label>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBranches(!showBranches)}
          >
            {showBranches ? "Masquer" : "Afficher"} les branches
          </Button> */}
        </div>
        {showBranches && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {branchesDB.map((branch) => (
              <div key={branch.id} className="flex items-center space-x-2">
                <Switch
                  id={`branch-${branch.id}`}
                  checked={formData.branches.includes(branch.id)}
                  onCheckedChange={(checked) => handleBranchChange(branch.id, checked)}
                />
                <label htmlFor={`branch-${branch.id}`} className="text-sm">
                  {branch.name} ({branch.region})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
        <h1 className="text-2xl font-bold mt-2">Inviter un utilisateur</h1>
        <p className="text-sm text-muted-foreground">
          Envoyer une invitation à un nouvel utilisateur pour qu’il rejoigne
          votre organisation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Colonne gauche : Informations utilisateur */}
        <div className="md:col-span-2 space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Informations utilisateur
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Adresse email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Saisissez votre adresse e-mail"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Entrez le prénom"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Nom de famille
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Veuillez saisir le nom de famille"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Rôle
                </label>
                <Select onValueChange={handleRoleChange} value={formData.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le rôle de l'utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="stock-specialist">
                      Spécialiste des stocks
                    </SelectItem>
                    <SelectItem value="cashier">Caissier</SelectItem>
                    <SelectItem value="branch-manager">
                      Directeur d&apos;agence
                    </SelectItem>
                    <SelectItem value="regional-manager">
                      Responsable régional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Affectation de la branche
            </h3>
            {renderBranches()}
          </div>
        </div>

        {/* Colonne droite : Paramètres du mot de passe */}
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Paramètres du mot de passe
            </h3>
            <PasswordGenerator
              isPasswordSet={formData.isPasswordSet}
              onPasswordChange={handlePasswordChange}
              onTogglePasswordSet={handleTogglePasswordSet}
            />
          </div>
        </div>
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          <X className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Envoyer une invitation
        </Button>
      </div>
    </div>
  );
}
