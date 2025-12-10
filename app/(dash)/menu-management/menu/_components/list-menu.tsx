/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SearchFilterBar from "./form/search-filter-bar";
import { useRouter } from "next/navigation";
import MenuItemsTable from "@/components/data-table/menu-items-table";

export default function ListMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [availability, setAvailability] = useState("All");

  const handleSearch = (query: string) => {
    console.log("Recherche :", query);
    // Ici, tu appliqueras le filtre aux données
  };

  const handleReset = () => {
    setSearchQuery("");
    setCategory("All");
    setStatus("All");
    setAvailability("All");
    // Réinitialise aussi l'input de recherche
    // document.querySelector('input[placeholder="Search by name or category..."]')?.focus();
  };
  const mockItems: any[] = [
    {
      id: "m_1",
      name: "Classic Burger",
      category: "Main Course",
      basePrice: 12.99,
      status: "active",
      availability: "All Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_2",
      name: "Iced Coffee",
      category: "Beverages",
      basePrice: 4.99,
      status: "active",
      availability: "2 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/chocolate-pices.png",
    },
    {
      id: "m_3",
      name: "Margherita Pizza",
      category: "Main Course",
      basePrice: 14.99,
      status: "active",
      availability: "Not Available",
      isSeasonal: true,
      imageUrl: "/assets/foods/pizza-all-pala.png",
    },
    {
      id: "m_4",
      name: "BBQ Ribs",
      category: "Main Course",
      basePrice: 22.99,
      status: "active",
      availability: "2 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/delicious-classic.png",
    },
    {
      id: "m_5",
      name: "Chocolate Lava Cake",
      category: "Desserts",
      basePrice: 7.99,
      status: "active",
      availability: "All Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_6",
      name: "Tiramisu",
      category: "Desserts",
      basePrice: 8.99,
      status: "active",
      availability: "2 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_7",
      name: "Spicy Wings",
      category: "Appetizers",
      basePrice: 9.99,
      status: "inactive",
      availability: "All Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_8",
      name: "Truffle Fries",
      category: "Sides",
      basePrice: 6.99,
      status: "inactive",
      availability: "1 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_9",
      name: "Grilled Salmon",
      category: "Main Course",
      basePrice: 24.99,
      status: "active",
      availability: "2 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
    {
      id: "m_10",
      name: "Caesar Salad",
      category: "Starters",
      basePrice: 8.99,
      status: "active",
      availability: "1 of 3 Branches",
      isSeasonal: false,
      imageUrl: "/assets/foods/beef-burger.png",
    },
  ];

  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/menu-management/menu/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      console.log("Deleting item:", id);
      // Ici, tu appellerais une API DELETE
    }
  };

  return (
    <div>
      <SearchFilterBar
        onSearch={handleSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onAvailabilityChange={setAvailability}
        onReset={handleReset}
        categories={["All", "Entrées", "Plats", "Desserts"]}
        statuses={["All", "Actif", "Inactif"]}
        availabilities={["All", "Disponible", "En rupture"]}
      />

      <div className="mt-6">
        <MenuItemsTable
          items={mockItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
