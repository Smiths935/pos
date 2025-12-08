"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  Menu as MenuIcon,
  Award,
  PackageSearch,
  Trash2,
  ShoppingCart,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Menu items with lucide icons
  const menuItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      submenu: [],
    },
    {
      title: "Ventes",
      icon: <ShoppingBag className="h-5 w-5" />,
      submenu: [
        { title: "Point de vente", href: "/sales/pos" },
        { title: "Commandes en direct", href: "/sales/live-order" },
        { title: "Historique des commandes", href: "/sales/order-history" },
        // { title: "Rapports", href: "/sales/reports" },
      ],
    },
    {
      title: "Gestion des menus",
      icon: <MenuIcon className="h-5 w-5" />,
      submenu: [
        { title: "Catégories", href: "/menu-management/categories" },
        { title: "Recettes", href: "/menu-management/recipes" },
        { title: "Plans de repas", href: "/menu-management/menu" },
      ],
    },
    {
      title: "Inventaire",
      icon: <PackageSearch className="h-5 w-5" />,
      submenu: [
        { title: "Aperçu des actions", href: "/inventory/stock-overview" },
        { title: "Ingrédients", href: "/inventory/ingredient-items" },
        { title: "Rapports", href: "/inventory/inventory-rapport" },
      ],
    },
    // {
    //   title: "Gestion des déchets",
    //   icon: <Trash2 className="h-5 w-5" />,
    //   submenu: [],
    // },
    // {
    //   title: "Achat",
    //   icon: <ShoppingCart className="h-5 w-5" />,
    //   submenu: [],
    // },
    {
      title: "Paramètres",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        { title: "Organisation", href: "/admin-settings/organisation" },
        { title: "Utilisateurs", href: "/admin-settings/user" },
        { title: "Rôles et permissions", href: "/admin-settings/roles-permissions" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-50 w-64 md:w-72 h-screen bg-background border-r transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Image src="/logoIT1bg.png" alt="Logo" width={32} height={32} className="rounded-md" />
            <h1 className="text-xl font-bold">MyPOS</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.submenu.length > 0 ? (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2",
                          pathname.startsWith(item.href || "")
                            ? "bg-muted"
                            : ""
                        )}
                      >
                        {item.icon}
                        {item.title}
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className="ml-6 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <Link href={subItem.href}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "w-full justify-start",
                                  pathname === subItem.href ? "bg-muted" : ""
                                )}
                              >
                                {subItem.title}
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                 // <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      pathname === item.href ? "bg-muted" : ""
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                // </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full">
            Se déconnecter
          </Button>
        </div>
      </div>

      {/* Overlay mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Bouton hamburger mobile */}
      <Button
        className="md:hidden fixed bottom-4 left-4 z-50 p-3 rounded-full bg-primary text-white shadow-lg"
        onClick={toggleSidebar}
      >
        <MenuIcon className="h-6 w-6" />
      </Button>
    </aside>
  );
}

                