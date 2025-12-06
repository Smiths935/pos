/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuItemForm from "./_form/menu-item-form";

export default function page() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Données soumises :", data);
    // // Dans handleSubmit
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("basePrice", data.basePrice.toString());
    // formData.append("description", data.description);
    // formData.append("isSeasonal", data.isSeasonal.toString());
    // formData.append("category", data.category);
    // formData.append("dietaryLabels", data.dietaryLabels.join(","));
    // formData.append("status", data.status);
    // formData.append("availability", data.availability);

    // if (data.imageFile) {
    //   formData.append("image", data.imageFile);
    // }

    // try {
    //   const response = await fetch("/api/menu/items", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   // ...
    // } catch (error) {
    //   console.error("Erreur lors de l'envoi :", error);
    // }
    // Ici, tu enverras les données à ton API via fetch ou React Query
    alert("Menu item created!");
  };

  const handleCancel = () => {
    // Redirige vers la liste des items ou ferme le formulaire
    console.log("Annulé");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center gap-4">
        <ArrowLeft size={14} onClick={() => router.back()} />
        <div>
          <h1>Ajouter un nouvel élément du menu</h1>
          <h3>Créer un nouvel élémént du menu</h3>
        </div>
      </div>
      <MenuItemForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={false}
      />
    </div>
  );
}
