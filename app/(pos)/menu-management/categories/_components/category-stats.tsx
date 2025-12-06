// src/components/ui/cards/category-stats.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, ListIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: "up" | "down";
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-6 w-6 ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-blue-600"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function CategoryStats() {
  const stats = [
    {
      title: "Total des catégories",
      value: 6,
      description: "Nombre total de catégories",
      icon: ListIcon,
    },
    {
      title: "Meilleures ventes",
      value: "Plat principal",
      description: "1250 ventes",
      icon: TrendingUpIcon,
      trend: "up" as const,
    },
    {
      title: "Catégorie la moins vendue",
      value: "Boissons",
      description: "450 ventes",
      icon: TrendingDownIcon,
      trend: "down" as const,
    },
    {
      title: "Catégorie contenant le plus d'articles",
      value: "Plat principal",
      description: "5 articles",
      icon: ListIcon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}