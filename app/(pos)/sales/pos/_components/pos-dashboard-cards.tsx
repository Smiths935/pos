/* eslint-disable @next/next/no-img-element */
// src/components/ui/cards/pos-dashboard-cards.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

interface PosCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  target?: "_blank" | "_self";
  className?: string;
}

export default function PosDashboardCard({
  title,
  description,
  imageUrl,
  link,
  target = "_self",
  className = "",
}: PosCardProps) {
  return (
    <Card
      className={`hover:bg-card/80 transition-colors cursor-pointer ${className}`}
      onClick={() => window.open(link, target)}
    >
      <CardHeader>
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {target === "_blank" && (
            <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
