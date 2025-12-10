/* eslint-disable react/no-unescaped-entities */
// src/app/settings/organization/branches/add/page.tsx
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
import { Switch } from "@/components/ui/switch";
import BranchAddTabs from "../../_components/_form/branch-add-tabs";
import { Save, X } from "lucide-react";

export default function AddBranchPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "general" | "services" | "responsible" | "advanced"
  >("general");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    region: "",
    phone: "",
    address: "",
    city: "",
    services: {
      dineIn: true,
      takeaway: true,
      delivery: false,
    },
    hours: {
      lundi: { open: true, start: "09:00", end: "21:00" },
      mardi: { open: true, start: "09:00", end: "21:00" },
      mercredi: { open: true, start: "09:00", end: "21:00" },
      jeudi: { open: true, start: "09:00", end: "21:00" },
      vendredi: { open: true, start: "09:00", end: "22:00" },
      samedi: { open: true, start: "10:00", end: "22:00" },
      dimanche: { open: true, start: "10:00", end: "20:00" },
    },
    regionalManager: "",
    branchDirector: "",
    isActive: true,
    stockTracking: true,
    allowMenuCustomization: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [service]: checked },
    }));
  };

  const handleHourChange = (
    day:
      | "lundi"
      | "mardi"
      | "mercredi"
      | "jeudi"
      | "vendredi"
      | "samedi"
      | "dimanche",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [field]: value },
      },
    }));
  };

  const handleToggleChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvelle branche créée :", formData);
    alert("Branche créée !");
    router.push("/settings/organization?tab=branches");
  };

  const handleCancel = () => {
    router.back();
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom de la branche
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Saisissez le nom de la succursale"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Code de branche
            </label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Saisissez le code de l'agence"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="region" className="text-sm font-medium">
              Région
            </label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, region: value }))
              }
              value={formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="centre-ville">Centre-ville</SelectItem>
                <SelectItem value="ouest">Ouest</SelectItem>
                <SelectItem value="est">Est</SelectItem>
                <SelectItem value="nord">Nord</SelectItem>
                <SelectItem value="aéroport">Aéroport</SelectItem>
              </SelectContent>
            </Select>
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
              placeholder="Saisissez le numéro de téléphone"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Adresse
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Saisissez l'adresse de la succursale"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              Ville
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Entrez dans la ville"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Services Proposés</h3>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dineIn"
              checked={formData.services.dineIn}
              onChange={(e) => handleServiceChange("dineIn", e.target.checked)}
            />
            <label htmlFor="dineIn" className="text-sm">
              Repas sur place
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="takeaway"
              checked={formData.services.takeaway}
              onChange={(e) =>
                handleServiceChange("takeaway", e.target.checked)
              }
            />
            <label htmlFor="takeaway" className="text-sm">
              Emporter
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="delivery"
              checked={formData.services.delivery}
              onChange={(e) =>
                handleServiceChange("delivery", e.target.checked)
              }
            />
            <label htmlFor="delivery" className="text-sm">
              Livraison
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Heures d'ouverture</h3>
        <div className="space-y-2">
          {[
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche",
          ].map((day) => {
            const dayKey = day as "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";
            return (
            <div
              key={day}
              className="flex items-center space-x-8"
            >
              <label className="text-sm">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
              {/* <div className="flex items-center space-x-2 justify-center">
              </div> */}
              <input
                type="checkbox"
                id={`${day}-open`}
                checked={formData.hours[dayKey].open}
                onChange={(e) =>
                  handleHourChange(dayKey, "open", String(e.target.checked))
                }
              />
              <label htmlFor={`${day}-open`} className="text-sm">
                Ouvrir
              </label>
              <Input
                type="time"
                value={formData.hours[dayKey].start}
                onChange={(e) => handleHourChange(dayKey, "start", e.target.value)}
                className="w-fit p-2"
              />
              <span>à</span>
              <Input
                type="time"
                value={formData.hours[dayKey].end}
                onChange={(e) => handleHourChange(dayKey, "end", e.target.value)}
                className="w-fit p-2"
              />
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderResponsibleTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="regionalManager" className="text-sm font-medium">
            Responsable régional
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, regionalManager: value }))
            }
            value={formData.regionalManager}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le responsable régional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager1">John Smith</SelectItem>
              <SelectItem value="manager2">Emma Johnson</SelectItem>
              <SelectItem value="manager3">Michael Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="branchDirector" className="text-sm font-medium">
            Directeur d'agence
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, branchDirector: value }))
            }
            value={formData.branchDirector}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le directeur de succursale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="director1">Sarah Wilson</SelectItem>
              <SelectItem value="director2">David Park</SelectItem>
              <SelectItem value="director3">Jessica Miller</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Statut de la branche</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              handleToggleChange("isActive", checked)
            }
          />
          <label htmlFor="isActive" className="text-sm">
            Branche active
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          La branche est opérationnelle et visible dans le système
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Paramètres d'inventaire et de menu
        </h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="stockTracking"
            checked={formData.stockTracking}
            onCheckedChange={(checked) =>
              handleToggleChange("stockTracking", checked)
            }
          />
          <label htmlFor="stockTracking" className="text-sm">
            Suivi des stocks
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Activer le suivi des stocks en temps réel pour cette branche
        </p>

        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="allowMenuCustomization"
            checked={formData.allowMenuCustomization}
            onCheckedChange={(checked) =>
              handleToggleChange("allowMenuCustomization", checked)
            }
          />
          <label htmlFor="allowMenuCustomization" className="text-sm">
            Autoriser la modification du menu local
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Autoriser cette branche à personnaliser son menu de manière
          indépendante
        </p>
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
        <h1 className="text-2xl font-bold mt-2">
          Ajouter une nouvelle branche
        </h1>
        <p className="text-sm text-muted-foreground">
          Gérer les détails et les paramètres de la nouvelle succursale
        </p>
      </div>

      {/* Onglets */}
      <BranchAddTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {activeTab === "general" && renderGeneralTab()}
        {activeTab === "services" && renderServicesTab()}
        {activeTab === "responsible" && renderResponsibleTab()}
        {activeTab === "advanced" && renderAdvancedTab()}
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
          Annuler
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
            <Save className="h-4 w-4" />
          Sauvegarder la branche
        </Button>
      </div>
    </div>
  );
}
