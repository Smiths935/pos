'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}

export function CardTems({ title, value, description, icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground flex items-center gap-4">{value}  <Icon className={`h-6 w-6 ${iconColor}`} /></div>
        <p className="text-md text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}