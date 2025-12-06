/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/form/menu-item-form.tsx
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, UploadIcon, X, XIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

interface MenuItemFormProps {
  initialData?: {
    name: string;
    basePrice: number;
    description: string;
    imageUrl?: string;
    isSeasonal: boolean;
    category: string;
    dietaryLabels: string[];
    status: "active" | "inactive";
    availability: "all" | "selected" | "none";
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function MenuItemForm({
  initialData = {
    name: "",
    basePrice: 0,
    description: "",
    imageUrl: undefined,
    isSeasonal: false,
    category: "",
    dietaryLabels: [],
    status: "active",
    availability: "all",
  },
  onSubmit,
  onCancel,
  isSubmitting = false,
}: MenuItemFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData.imageUrl && !imageFile) {
      setPreviewUrl(initialData.imageUrl);
    }
  }, [initialData.imageUrl, imageFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile });
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    // Si tu veux supprimer l'image du serveur, ajoute un champ "removeImage": true
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Entrez le nom de l'article"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price</Label>
                <InputGroup>
                  <InputGroupInput
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={handleChange}
                    required
                    placeholder="$ 0"
                    className="w-full"
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <InputGroupText>FCFA</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description"
                className="w-full"
              />
            </div>

            {/* <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-card/50 transition-colors cursor-pointer">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div
                onClick={() => document.getElementById("image")?.click()}
                className="flex flex-col items-center justify-center gap-2"
              >
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
                <span className="text-xs text-muted-foreground">
                  or drag and drop
                </span>
              </div>
            </div>
          </div> */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-card/50 transition-colors cursor-pointer relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-32 w-fit object-cover rounded-md mx-auto mb-4"
                    />
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      aria-label="Remove image"
                    >
                      {/* <XIcon className="h-4 w-4 text-gray-600" /> */}
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById("image")?.click()}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload image
                    </span>
                    <span className="text-xs text-muted-foreground">
                      or drag and drop
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSeasonal"
                name="isSeasonal"
                checked={formData.isSeasonal}
                onCheckedChange={(checked) =>
                  handleRadioChange("isSeasonal", String(checked))
                }
              />
              <Label htmlFor="isSeasonal" className="text-sm">
                Seasonal Item
              </Label>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => handleRadioChange("category", value)}
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appetizers">Appetizers</SelectItem>
                  <SelectItem value="main">Main Courses</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryLabels">Dietary Labels</Label>
              <Select
                onValueChange={(value) =>
                  handleRadioChange("dietaryLabels", value)
                }
                value={formData.dietaryLabels.join(", ")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Dietary Labels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten Free</SelectItem>
                  <SelectItem value="dairy-free">Dairy Free</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                defaultValue={formData.status}
                onValueChange={(value) => handleRadioChange("status", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <RadioGroup
                defaultValue={formData.availability}
                onValueChange={(value) =>
                  handleRadioChange("availability", value)
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Branches</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="selected" />
                  <Label htmlFor="selected">Selected Branches</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Boutons en bas */}
        <div className="flex space-x-2 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Save />
            {isSubmitting ? "Saving..." : "Save Menu"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X />
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
