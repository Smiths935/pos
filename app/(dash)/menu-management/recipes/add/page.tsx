/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/recipes/add/page.tsx
"use client";

import { useRouter } from "next/navigation";
import RecipeTabs from "../_components/recipe-tabs";

export default function AddRecipePage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Données soumises :", data);
    alert("Recette créée !");
    // Redirige vers la liste des recettes ou ferme le formulaire
    router.push("/menu-management/recipes");
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
        <h1 className="text-2xl font-bold mt-2">Nouvelle recette</h1>
        <p className="text-sm text-muted-foreground">Créer une nouvelle recette</p>
      </div>

      <RecipeTabs
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={false}
      />
    </div>
  );
}