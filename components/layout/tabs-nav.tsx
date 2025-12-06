// src/components/ui/tabs-nav.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { is } from "date-fns/locale";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
}

export interface TabsNavProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export default function TabsNav({
  tabs,
  activeTab,
  onChange,
  className,
}: TabsNavProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      <nav className="-mb-px flex space-x-6 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                isActive
                  ? "text-primary hover:text-primary hover:bg-gray-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-200",
                "relative flex-shrink-0 gap-2 whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors"
              )}
              onClick={() => onChange(tab.id)}
              aria-selected={isActive}
              role="tab"
            >
              {tab.icon && <tab.icon className="h-4 w-4" aria-hidden="true" />}
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary" />
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
