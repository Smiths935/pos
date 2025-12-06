/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/components/ui/tabs/recipe-tabs.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, UploadIcon, X } from "lucide-react";
import AddIngredientModal from "./add-ingredient-modal";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RecipeTabsProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function RecipeTabs({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RecipeTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "ingredients" | "preparation" | "nutrition"
  >("general");

  // Données du formulaire
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    portionSize: "",
    description: "",
    imageUrl: undefined as string | undefined,
    ingredients: [] as any[],
    preparationSteps: [] as string[],
    cookingTime: "",
    servingSuggestions: "",
    portionSizeInfo: "",
    nutrition: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestion des ingrédients
  const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] =
    useState(false);
  const [availableIngredients, setAvailableIngredients] = useState([
    { id: "i_1", name: "Farine", unit: "g", costPerUnit: 0.05, stock: 1000 },
    { id: "i_2", name: "Sucre", unit: "g", costPerUnit: 0.03, stock: 800 },
    { id: "i_3", name: "Beurre", unit: "g", costPerUnit: 0.1, stock: 500 },
    { id: "i_4", name: "Oeufs", unit: "unité", costPerUnit: 0.2, stock: 200 },
  ]);

  const handleAddIngredient = (ingredient: any) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // Gestion des étapes de préparation
  const [newStep, setNewStep] = useState("");

  const handleAddPreparationStep = () => {
    if (newStep.trim()) {
      setFormData((prev) => ({
        ...prev,
        preparationSteps: [...prev.preparationSteps, newStep.trim()],
      }));
      setNewStep("");
    }
  };

  const handleRemovePreparationStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      preparationSteps: prev.preparationSteps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderGeneralTab = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Colonne gauche : Image */}
      <div className="space-y-4">
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
            {formData.imageUrl ? (
              <Image
                src={formData.imageUrl}
                alt="Preview"
                className="h-32 w-full object-cover rounded-md mx-auto"
              />
            ) : (
              <>
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  No image available
                </span>
                <span className="text-xs text-muted-foreground">
                  Click to upload image
                </span>
              </>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("image")?.click()}
          className="w-full"
        >
          Upload Image
        </Button>
      </div>

      {/* Colonne droite : Informations générales */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Recipe Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Recipe Name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            value={formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="main">Main Course</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="portionSize" className="text-sm font-medium">
            Portion Size
          </label>
          <Input
            id="portionSize"
            name="portionSize"
            value={formData.portionSize}
            onChange={handleChange}
            required
            placeholder="Portion Size (e.g. 100g, 4 cookies, 1 slice)"
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
            placeholder="Description"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderIngredientsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setIsAddIngredientModalOpen(true)}
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Ajouter l&apos;ingrédient
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground">
            <div>Ingrédient</div>
            <div>Qté.</div>
            <div>Unité</div>
            <div>Coût unitaire</div>
            <div>Coût total</div>
            <div>En stock</div>
            <div>Actions</div>
          </div>
        </div>
        {formData.ingredients.length > 0 ? (
          <div className="divide-y divide-border">
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 px-4 py-3 items-center"
              >
                <div className="font-medium">{ingredient.name}</div>
                <div>{ingredient.amount}</div>
                <div>{ingredient.unit}</div>
                <div>${ingredient.costPerUnit.toFixed(2)}</div>
                <div>${ingredient.totalCost.toFixed(2)}</div>
                <div>
                  {ingredient.stock} {ingredient.unit}
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveIngredient(index)}
                    aria-label={`Supprimer ${ingredient.name}`}
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
                      <path d="M3 6h18"></path>
                      <path d="M19 6v18H5V6h14z"></path>
                      <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Aucun ingrédient ajouté pour le moment
          </div>
        )}
      </div>

      {/* Modal d'ajout d'ingrédient */}
      <AddIngredientModal
        open={isAddIngredientModalOpen}
        onOpenChange={setIsAddIngredientModalOpen}
        onAdd={handleAddIngredient}
        availableIngredients={availableIngredients}
      />
    </div>
  );

  const renderPreparationTab = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Colonne gauche : Étapes de préparation */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Étapes de préparation</h3>
          <Button
            onClick={handleAddPreparationStep}
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Ajouter une étape
          </Button>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          {formData.preparationSteps.length > 0 ? (
            <div className="divide-y divide-border">
              {formData.preparationSteps.map((step, index) => (
                <div
                  key={index}
                  className="px-4 py-3 flex justify-between items-start"
                >
                  <p className="text-sm">{step}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePreparationStep(index)}
                    aria-label={`Supprimer l'étape ${index + 1}`}
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
                      <path d="M3 6h18"></path>
                      <path d="M19 6v18H5V6h14z"></path>
                      <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Aucune étape de préparation ajoutée pour le moment
            </div>
          )}
        </div>
      </div>

      {/* Colonne droite : Informations de préparation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations de préparation</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cookingTime" className="text-sm font-medium">
              Temps de cuisson
            </label>
            <Input
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="par exemple, 30 minutes"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="servingSuggestions" className="text-sm font-medium">
              Suggestions de présentation
            </label>
            <Textarea
              id="servingSuggestions"
              name="servingSuggestions"
              value={formData.servingSuggestions}
              onChange={handleChange}
              placeholder="Saisissez des suggestions de service et des idées de présentation"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="portionSizeInfo" className="text-sm font-medium">
              Taille des portions
            </label>
            <Input
              id="portionSizeInfo"
              name="portionSizeInfo"
              value={formData.portionSizeInfo}
              onChange={handleChange}
              placeholder="par exemple, 2 portions"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

//   const renderNutritionTab = () => (
//     <div className="space-y-4">
//       <p>Contenu de l'onglet “Nutrition” ici.</p>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         <div className="space-y-2">
//           <label htmlFor="calories" className="text-sm font-medium">
//             Calories
//           </label>
//           <Input id="calories" placeholder="Calories" className="w-full" />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="protein" className="text-sm font-medium">
//             Protein (g)
//           </label>
//           <Input id="protein" placeholder="Protein" className="w-full" />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="carbs" className="text-sm font-medium">
//             Carbs (g)
//           </label>
//           <Input id="carbs" placeholder="Carbs" className="w-full" />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="fat" className="text-sm font-medium">
//             Fat (g)
//           </label>
//           <Input id="fat" placeholder="Fat" className="w-full" />
//         </div>
//       </div>
//     </div>
//   );

  return (
    <div className="space-y-6">
      {/* En-tête des onglets */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 pb-2">
          {[
            { id: "general", label: "Informations générales", icon: "📄" },
            { id: "ingredients", label: "Ingrédients", icon: "📋" },
            { id: "preparation", label: "Préparation", icon: "👨‍🍳" },
            // { id: "nutrition", label: "Nutrition", icon: "🍎" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap  px-3 hover:bg-gray-200 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-primary hover:text-gray-950"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab.id as any)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {activeTab === "general" && renderGeneralTab()}
        {activeTab === "ingredients" && renderIngredientsTab()}
        {activeTab === "preparation" && renderPreparationTab()}
        {/* {activeTab === "nutrition" && renderNutritionTab()} */}
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
            <X/>
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
            <Save/>
          {isSubmitting ? "Enregistrement..." : "Enregistrer la recette"}
        </Button>
      </div>
    </div>
  );
}
