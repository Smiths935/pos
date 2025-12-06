/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/form/organization-form.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, UploadIcon } from "lucide-react";

interface OrganizationFormProps {
  initialData: {
    logoUrl?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export default function OrganizationForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: OrganizationFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // ← Crée une URL temporaire
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ ...formData, logoFile });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full mx-auto bg-white shadow-xs">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Détails de l'organisation racine
        </CardTitle>
        <CardDescription>
          Ces informations seront utilisées dans l'ensemble du système et
          pourront figurer sur les rapports, les factures et les documents
          destinés aux clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Label htmlFor="logo" className="sr-only">
              Logo de l&apos;organisation
            </Label>
            <div className="relative h-16 w-16 rounded-md bg-orange-50 flex items-center justify-center border border-orange-200">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Prévisualisation"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : formData.logoUrl ? (
                <img
                  src={formData.logoUrl}
                  alt="Logo"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <span className="text-xl font-bold text-orange-600">
                  {formData.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => document.getElementById("logo")?.click()}
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                Télécharger une image
              </Button>
            </div>
          </div>

          {/* Nom de l'organisation */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l&apos;organisation</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Headquarters (HQ)"
              className="w-full"
            />
          </div>

          {/* Adresse commerciale */}
          <div className="space-y-2">
            <Label htmlFor="address">Adresse commerciale</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main St, Los Angeles, CA 90038"
              className="w-full"
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="123-456-7890"
              className="w-full"
            />
          </div>

          {/* Adresse email */}
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="hq@example.com"
              className="w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* URL du site Web */}
          <div className="space-y-2">
            <Label htmlFor="website">URL du site Web</Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.hq.com"
              className="w-full"
            />
          </div>

          {/* Bouton Enregistrer */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className=" bg-green-800 hover:bg-green-600 text-white"
          >
            <Save />
            {isSubmitting
              ? "Enregistrement..."
              : "Enregistrer les modifications"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
