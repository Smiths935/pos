// // src/components/layout/head-section-page.tsx
// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { LucideIcon } from "lucide-react";

// interface HeadSectionPageProps {
//   title: string;
//   description?: string;
//   actionButton?: {
//     label: string;
//     onClick: () => void;
//     icon?: LucideIcon;
//     variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
//     disabled?: boolean;
//   };
//   className?: string;
// }

// export default function HeadSectionPage({
//   title,
//   description,
//   actionButton,
//   className = "",
// }: HeadSectionPageProps) {
//   return (
//     <div className={`flex flex-col gap-2 md:gap-3 ${className}`}>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
//           {description && (
//             <p className="mt-1 text-sm text-gray-600 max-w-2xl">{description}</p>
//           )}
//         </div>

//         {actionButton && (
//           <div className="mt-3 md:mt-0">
//             <Button
//               onClick={actionButton.onClick}
//               variant={actionButton.variant || "default"}
//               disabled={actionButton.disabled}
//               aria-label={actionButton.label}
//             >
//               {actionButton.icon && <actionButton.icon className="mr-2 h-4 w-4" />}
//               {actionButton.label}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/layout/head-section-page.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, DownloadIcon, PrinterIcon } from "lucide-react";

interface HeadSectionPageProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    disabled?: boolean;
  };
  exportButton?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: "outline" | "ghost";
    disabled?: boolean;
  };
  printButton?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: "outline" | "ghost";
    disabled?: boolean;
  };
  className?: string;
}

export default function HeadSectionPage({
  title,
  description,
  actionButton,
  exportButton,
  printButton,
  className = "",
}: HeadSectionPageProps) {
  return (
    <div className={`flex flex-col gap-2 md:gap-3 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600 max-w-2xl">{description}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          {exportButton && (
            <Button
              onClick={exportButton.onClick}
              variant={exportButton.variant || "outline"}
              disabled={exportButton.disabled}
              aria-label={exportButton.label}
            >
              {exportButton.icon && <exportButton.icon className="mr-2 h-4 w-4" />}
              {exportButton.label}
            </Button>
          )}
          {printButton && (
            <Button
              onClick={printButton.onClick}
              variant={printButton.variant || "outline"}
              disabled={printButton.disabled}
              aria-label={printButton.label}
            >
              {printButton.icon && <printButton.icon className="mr-2 h-4 w-4" />}
              {printButton.label}
            </Button>
          )}
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              variant={actionButton.variant || "default"}
              disabled={actionButton.disabled}
              aria-label={actionButton.label}
            >
              {actionButton.icon && <actionButton.icon className="mr-2 h-4 w-4" />}
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}