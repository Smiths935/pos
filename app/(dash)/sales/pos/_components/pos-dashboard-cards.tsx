"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";

interface PosCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  target?: "_blank" | "_self";
  className?: string;
  placeholderUrl?: string; // optionnel pour le blur
}

export default function PosDashboardCard({
  title,
  description,
  imageUrl,
  link,
  target = "_self",
  className = "",
  placeholderUrl,
}: PosCardProps) {
  return (
    <Card
      className={`hover:bg-card/80 transition-colors cursor-pointer pt-0 ${className}`}
      onClick={() => window.open(link, target)}
    >
      <CardHeader className=" p-0 pt-0">
        <div className="relative h-32 md:h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            placeholder={placeholderUrl ? "blur" : "empty"}
            blurDataURL={placeholderUrl} // petite image floue
            priority={false} 
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
