/* eslint-disable react-hooks/set-state-in-effect */
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
import { Label } from "@/components/ui/label";
import { PlusIcon, PencilIcon } from "lucide-react";
import { categorySchema, CategoryFormData } from "@/lib/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CategoryFormData) => void;
  onUpdate?: (id: string, data: CategoryFormData) => void;
  initialData?: {
    id: string;
    name: string;
  };
}

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onCreate,
  onUpdate,
  initialData,
}: CreateCategoryModalProps) {
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // Réinitialise le formulaire quand le modal s'ouvre/ferme
  useEffect(() => {
    if (open) {
      if (isEditing && initialData) {
        setValue("name", initialData.name);
      } else {
        reset({ name: "" });
      }
      setError(null);
    }
  }, [open, isEditing, initialData, reset, setValue]);

  const onSubmit = (data: CategoryFormData) => {
    setError(null);
    if (isEditing && onUpdate && initialData) {
      onUpdate(initialData.id, data);
    } else {
      onCreate(data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Éditer la catégorie" : "Créer une catégorie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la catégorie</Label>
            <Input
              id="name"
              placeholder="Entrez le nom de la catégorie"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isEditing ? (
                <>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Mettre à jour
                </>
              ) : (
                <>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Créer la catégorie
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
