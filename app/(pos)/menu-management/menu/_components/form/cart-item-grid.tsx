"use client";
import { ChefHatIcon, GiftIcon, XCircleIcon, AlertTriangleIcon } from "lucide-react";
import { CardTems } from "./card-tems";


export default function CartItemGrid() {
  const stats = [
    {
      title: "Total Menu Items",
      value: 15,
      description: "Total items in your menu",
      icon: ChefHatIcon,
      iconColor: "text-blue-600", 
    },
    {
      title: "Active Items",
      value: 13,
      description: "Currently available items",
      icon: GiftIcon,
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Items",
      value: 2,
      description: "Temporarily unavailable items",
      icon: XCircleIcon,
      iconColor: "text-red-600",
    },
    {
      title: "Low Stock Warning",
      value: 2,
      description: "Items with ingredient shortages",
      icon: AlertTriangleIcon,
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <CardTems
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}