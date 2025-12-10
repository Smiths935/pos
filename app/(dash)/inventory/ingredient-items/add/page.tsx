// src/app/inventory/ingredients/add/page.tsx
"use client";

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

export default function AddIngredientPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvel ingrédient créé !");
    alert("Ingrédient créé !");
    router.push("/inventory/ingredients");
  };

  const handleCancel = () => {
    router.back();
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
        <h1 className="text-2xl font-bold mt-2">Ajouter un ingrédient</h1>
        <p className="text-sm text-muted-foreground">
          Créer un nouvel ingrédient dans votre inventaire
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom de l'ingrédient
              </label>
              <Input
                id="name"
                placeholder="Ex: Farine tout usage"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ugs" className="text-sm font-medium">
                UGS (Code interne)
              </label>
              <Input
                id="ugs"
                placeholder="Ex: FLR-001"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Catégorie
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produits-secs">Produits secs</SelectItem>
                  <SelectItem value="huiles">Huiles</SelectItem>
                  <SelectItem value="epices">Épices</SelectItem>
                  <SelectItem value="viande">Viande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="storageUnit" className="text-sm font-medium">
                Stockage → Unités d'articles
              </label>
              <Input
                id="storageUnit"
                placeholder="Ex: kg → g"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="defaultPrice" className="text-sm font-medium">
                Prix par défaut
              </label>
              <Input
                id="defaultPrice"
                type="number"
                step="0.01"
                placeholder="Ex: 1.25"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="minLevel" className="text-sm font-medium">
                Niveau minimum
              </label>
              <Input
                id="minLevel"
                placeholder="Ex: 10 kg"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maxLevel" className="text-sm font-medium">
                Niveau maximum
              </label>
              <Input
                id="maxLevel"
                placeholder="Ex: 50 kg"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reorderLevel" className="text-sm font-medium">
                Niveau de réorganisation
              </label>
              <Input
                id="reorderLevel"
                placeholder="Ex: 15 kg"
                required
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Enregistrer l'ingrédient
          </Button>
        </div>
      </form>
    </div>
  );
}
