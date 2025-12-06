// src/app/menu/categories/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CategoryFormData } from "@/lib/schemas/category";
import CategoryStats from "./_components/category-stats";
import CategoryTable from "@/components/data-table/category-table";
import CreateCategoryModal from "./_components/create-category-modal";

// Données simulées — à remplacer par un appel API
const mockCategories = [
  { id: "c_1", name: "Plat principal", itemCount: 5 },
  { id: "c_2", name: "Entrées", itemCount: 2 },
  { id: "c_3", name: "Desserts", itemCount: 4 },
  { id: "c_4", name: "Amuse-gueules", itemCount: 1 },
  { id: "c_5", name: "Boissons", itemCount: 2 },
  { id: "c_6", name: "Sides", itemCount: 1 },
];

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleCreateCategory = (data: CategoryFormData) => {
    console.log("Nouvelle catégorie créée :", data);
    alert(`Catégorie "${data.name}" créée !`);
  };

  const handleUpdateCategory = (id: string, data: CategoryFormData) => {
    console.log("Catégorie mise à jour :", id, data);
    alert(`Catégorie "${data.name}" mise à jour !`);
  };

  const handleEditCategory = (id: string) => {
    const category = mockCategories.find((c) => c.id === id);
    if (category) {
      setEditingCategory(category);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      console.log("Suppression de la catégorie :", id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setModalMode("create");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catégories</h1>
        <p className="text-sm text-muted-foreground">
          Créer et gérer les catégories de menu
        </p>
      </div>

      {/* Stats */}
      <CategoryStats />

      {/* Gestion des catégories */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Gérer les catégories</h2>
        <Button
          onClick={() => {
            setModalMode("create");
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter une catégorie
        </Button>
      </div>

      {/* Tableau */}
      <CategoryTable
        categories={mockCategories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      {/* Modal */}
      <CreateCategoryModal
        open={isModalOpen}
        onOpenChange={closeModal}
        onCreate={handleCreateCategory}
        onUpdate={handleUpdateCategory}
        initialData={editingCategory || undefined}
      />
    </div>
  );
}
