/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import OrganizationForm from "./_form/form";
import { Card } from "@/components/ui/card";

export default function OrganisationProfile() {
  const initialData = {
    name: "Headquarters (HQ)",
    address: "123 Main St, Los Angeles, CA 90038",
    phone: "123-456-7890",
    email: "hq@example.com",
    website: "https://www.hq.com",
  };

  const handleSubmit = (data: any) => {
    console.log("Données soumises :", data);
    // Ici, tu enverras les données à ton API via fetch ou React Query
    alert("Modifications enregistrées !");
  };

  return (
    <div className="flex-1 h-full pt-4">

        <OrganizationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={false}
        />
    </div>
  );
}
