"use client";

import Image from "next/image";
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
          <Image
            src={imageUrl}
            alt={title}
            fill
            // sizes="" // adapte selon ton layout
            className="object-cover"
            priority={false} // true si tu veux que l'image se charge en priorité
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
