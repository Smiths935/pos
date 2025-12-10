// src/components/ui/tabs/branch-add-tabs.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChartBarBig, Settings, Timer, Users } from "lucide-react";

interface BranchAddTabsProps {
  activeTab: "general" | "services" | "responsible" | "advanced";
  onChange: (tab: "general" | "services" | "responsible" | "advanced") => void;
}

export default function BranchAddTabs({
  activeTab,
  onChange,
}: BranchAddTabsProps) {
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8 pb-2">
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "general"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("general")}
          aria-selected={activeTab === "general"}
          role="tab"
        >
         <ChartBarBig className="h-4 w-4" />
          Informations générales
          {activeTab === "general" && (
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "services"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("services")}
          aria-selected={activeTab === "services"}
          role="tab"
        >
         <Timer className="h-4 w-4" />
          Services et horaires
          {activeTab === "services" && (
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "responsible"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("responsible")}
          aria-selected={activeTab === "responsible"}
          role="tab"
        >
          <Users className="h-4 w-4" />
          Affectation du responsable
          {activeTab === "responsible" && (
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "advanced"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("advanced")}
          aria-selected={activeTab === "advanced"}
          role="tab"
        >
          <Settings className="h-4 w-4" />
          Paramètres avancés
          {activeTab === "advanced" && (
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
      </nav>
    </div>
  );
}