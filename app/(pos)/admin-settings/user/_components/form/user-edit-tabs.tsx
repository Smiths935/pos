"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  Shield,
  User,
} from "lucide-react";

interface UserEditTabsProps {
  activeTab: "profile" | "roles" | "activity";
  onChange: (tab: "profile" | "roles" | "activity") => void;
}

export default function UserEditTabs({
  activeTab,
  onChange,
}: UserEditTabsProps) {
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8 pb-1">
        <Button
          variant="ghost"
          className={cn(
            "relative shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "profile"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("profile")}
          aria-selected={activeTab === "profile"}
          role="tab"
        >
          <User className="w-4 h-4" />
          Informations du profil
          {activeTab === "profile" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "roles"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("roles")}
          aria-selected={activeTab === "roles"}
          role="tab"
        >
          <Shield className="w-4 h-4" />
          Rôles et accès
          {activeTab === "roles" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "activity"
              ? "text-primary hover:text-primary hover:bg-gray-200"
              : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
          )}
          onClick={() => onChange("activity")}
          aria-selected={activeTab === "activity"}
          role="tab"
        >
          <Activity className="w-4 h-4" />
          Journal d&apos;activité
          {activeTab === "activity" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
      </nav>
    </div>
  );
}
