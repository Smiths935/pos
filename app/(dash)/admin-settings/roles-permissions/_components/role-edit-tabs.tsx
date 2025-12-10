"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoleEditTabsProps {
  activeTab: "details" | "permissions";
  onChange: (tab: "details" | "permissions") => void;
}

export default function RoleEditTabs({
  activeTab,
  onChange,
}: RoleEditTabsProps) {
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8 pb-4">
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "details"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onChange("details")}
          aria-selected={activeTab === "details"}
          role="tab"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="12" y1="9" x2="12" y2="15" />
          </svg>
          Détails du rôle
          {activeTab === "details" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "relative flex-shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "permissions"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onChange("permissions")}
          aria-selected={activeTab === "permissions"}
          role="tab"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-5.356-3.8A4 4 0 0 0 12 11h0a4 4 0 0 0 4 4h0v6"></path>
            <path d="M16 3.5a2 2 0 0 0-3.5 1.5 2 2 0 0 0-3.5-1.5A2 2 0 0 0 5 5.5a2 2 0 0 0 3.5 1.5 2 2 0 0 0 3.5-1.5A2 2 0 0 0 16 5.5a2 2 0 0 0-3.5-1.5"></path>
          </svg>
          Autorisations
          {activeTab === "permissions" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
          )}
        </Button>
      </nav>
    </div>
  );
}