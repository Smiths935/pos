/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/modal/add-ingredient-modal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

interface AddIngredientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (ingredient: any) => void;
  availableIngredients: {
    id: string;
    name: string;
    unit: string;
    costPerUnit: number;
    stock: number;
  }[];
}

export default function AddIngredientModal({
  open,
  onOpenChange,
  onAdd,
  availableIngredients = [],
}: AddIngredientModalProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [costPerUnit, setCostPerUnit] = useState<string>("");
  const [availableStock, setAvailableStock] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Met à jour le stock et le coût total quand l'ingrédient change
  useEffect(() => {
    const ingredient = availableIngredients.find(
      (i) => i.id === selectedIngredient
    );
    if (ingredient) {
      setUnit(ingredient.unit);
      setCostPerUnit(ingredient.costPerUnit.toString());
      setAvailableStock(ingredient.stock);
    }
  }, [selectedIngredient, availableIngredients]);

  // Calcule le coût total quand la quantité ou le coût unitaire change
  useEffect(() => {
    const qty = parseFloat(amount) || 0;
    const cost = parseFloat(costPerUnit) || 0;
    setTotalCost(qty * cost);
  }, [amount, costPerUnit]);

  const handleSubmit = () => {
    if (!selectedIngredient || !amount || !unit || !costPerUnit) return;

    const ingredient = availableIngredients.find(
      (i) => i.id === selectedIngredient
    );
    if (!ingredient) return;

    onAdd({
      id: ingredient.id,
      name: ingredient.name,
      amount: parseFloat(amount),
      unit: unit,
      costPerUnit: parseFloat(costPerUnit),
      totalCost: parseFloat(amount) * parseFloat(costPerUnit),
      stock: ingredient.stock,
    });

    // Réinitialise le formulaire
    setSelectedIngredient("");
    setAmount("");
    setUnit("");
    setCostPerUnit("");
    setAvailableStock(0);
    setTotalCost(0);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un ingrédient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ingredient" className="text-sm font-medium">
              Sélectionner un ingrédient
            </label>
            <Select
              onValueChange={setSelectedIngredient}
              value={selectedIngredient}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un ingrédient" />
              </SelectTrigger>
              <SelectContent>
                {availableIngredients.map((ing) => (
                  <SelectItem key={ing.id} value={ing.id}>
                    {ing.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Quantité
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Quantité"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                Unité
              </label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Unité"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="costPerUnit" className="text-sm font-medium">
                Coût par unité
              </label>
              <Input
                id="costPerUnit"
                type="number"
                step="0.01"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                placeholder="$ Coût par unité"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stock disponible</label>
            <p className="text-sm text-muted-foreground">
              {availableStock} {unit}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Coût total</label>
            <p className="text-sm font-bold">${totalCost.toFixed(2)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
