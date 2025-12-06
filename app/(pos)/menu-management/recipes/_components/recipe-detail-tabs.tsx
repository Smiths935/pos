// src/components/ui/tabs/recipe-detail-tabs.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeDetailTabsProps {
  recipe: {
    id: string;
    name: string;
    category: string;
    portionSize: string;
    prepTime: string;
    cost: number;
    price: number;
    margin: number;
    description: string;
    imageUrl?: string;
    ingredients: {
      id: string;
      name: string;
      amount: number;
      unit: string;
      costPerUnit: number;
      totalCost: number;
      stock: number;
    }[];
    preparationSteps: string[];
    cookingTime: string;
    servingSuggestions: string;
    portionSizeInfo: string;
    nutrition: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
    };
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function RecipeDetailTabs({
  recipe,
  onEdit,
  onDelete,
}: RecipeDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "ingredients" | "preparation" | "nutrition"
  >("general");

  const renderGeneralTab = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Colonne gauche : Image */}
      <div className="space-y-4">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="h-48 w-full object-cover rounded-lg"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-600 rounded-lg">
            No image available
          </div>
        )}
      </div>

      {/* Colonne droite : Informations générales */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{recipe.name}</h2>
          <p className="text-sm text-muted-foreground">{recipe.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <p className="text-sm font-medium">{recipe.category}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Portion Size</label>
            <p className="text-sm font-medium">{recipe.portionSize}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Preparation Time</label>
            <p className="text-sm font-medium">{recipe.prepTime}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cooking Time</label>
            <p className="text-sm font-medium">{recipe.cookingTime}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Serving Suggestions</label>
            <p className="text-sm font-medium">{recipe.servingSuggestions}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Portion Size Info</label>
            <p className="text-sm font-medium">{recipe.portionSizeInfo}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cost Per Portion</label>
            <p className="text-sm font-medium">${recipe.cost.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Selling Price</label>
            <p className="text-sm font-medium text-green-600">
              ${recipe.price.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Profit Margin</label>
            <p className="text-sm font-medium text-green-600">
              {Math.round(recipe.margin)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIngredientsTab = () => (
    <div className="space-y-6">
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
        {recipe.ingredients.length > 0 ? (
          <div className="divide-y divide-border">
            {recipe.ingredients.map((ingredient, index) => (
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
                    onClick={() => console.log(`Modifier ${ingredient.name}`)}
                    aria-label={`Modifier ${ingredient.name}`}
                  >
                    <EditIcon className="h-4 w-4 text-blue-600" />
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
    </div>
  );

  const renderPreparationTab = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Colonne gauche : Étapes de préparation */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Étapes de préparation</h3>
        {recipe.preparationSteps.length > 0 ? (
          <div className="space-y-4">
            {recipe.preparationSteps.map((step, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium">Step {index + 1}</h4>
                <p className="mt-1 text-sm">{step}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-border rounded-lg p-4 text-center text-sm text-muted-foreground">
            Aucune étape de préparation ajoutée pour le moment
          </div>
        )}
      </div>

      {/* Colonne droite : Informations de préparation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations de préparation</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Temps de cuisson</label>
            <p className="text-sm font-medium">{recipe.cookingTime}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Suggestions de présentation
            </label>
            <p className="text-sm font-medium">{recipe.servingSuggestions}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Taille des portions</label>
            <p className="text-sm font-medium">{recipe.portionSizeInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNutritionTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Calories</label>
          <p className="text-sm font-medium">{recipe.nutrition.calories}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Protein (g)</label>
          <p className="text-sm font-medium">{recipe.nutrition.protein}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Carbs (g)</label>
          <p className="text-sm font-medium">{recipe.nutrition.carbs}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Fat (g)</label>
          <p className="text-sm font-medium">{recipe.nutrition.fat}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* En-tête des onglets */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto pb-4">
          {[
            { id: "general", label: "General Information", icon: "📄" },
            { id: "ingredients", label: "Ingredients", icon: "📋" },
            { id: "preparation", label: "Preparation", icon: "👨‍🍳" },
            { id: "nutrition", label: "Nutrition", icon: "🍎" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab.id as any)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
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
        {activeTab === "nutrition" && renderNutritionTab()}
      </div>

      {/* Boutons en bas */}
      <div className="flex space-x-2 pt-4">
        <Button
          onClick={onEdit}
          className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
        >
          <EditIcon className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={onDelete}
          className="gap-2 text-red-600 hover:text-red-700"
        >
          <TrashIcon className="h-4 w-4" />
          Delete Recipe
        </Button>
      </div>
    </div>
  );
}
