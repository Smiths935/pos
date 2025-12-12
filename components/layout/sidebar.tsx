/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { roleMenus, MenuItem } from "@/lib/permissions";
import { Button } from "../ui/button";
import Image from "next/image";

interface SidebarProps {
  user: { role: string; name: string; email: string };
}

export default function Sidebar({ user }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverOpen, setHoverOpen] = useState(false);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const pathname = usePathname();

  // --- Load menus for user role ---
  const menuItems = useMemo(() => roleMenus[user?.role] || [], [user?.role]);
  const isExpanded = sidebarOpen || hoverOpen;

  // --- Determine if a path is active ---
  const isActiveLink = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname]
  );

  // --- Automatically open the menu containing the current active route ---
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};

    menuItems.forEach((item) => {
      // Ouvre le menu si son path ou celui de ses submenus correspond au pathname
      if (
        (item.path && pathname.startsWith(item.path)) ||
        item.submenus?.some((sub) => sub.path && pathname.startsWith(sub.path))
      ) {
        newOpenMenus[item.id] = true;
      }
    });

    setOpenMenus(newOpenMenus);
  }, [pathname, menuItems]);

  // --- Toggle submenu ---
  const toggleMenu = useCallback((menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  }, []);

  // --- Logout ---
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // --- Render a single menu item ---
  const renderMenuItem = useCallback(
    (item: MenuItem) => {
      const Icon = item.icon;
      const hasSubmenus = item.submenus && item.submenus.length > 0;

      const isActiveMenu = item.path ? isActiveLink(item.path) : false;

      const isActiveSubmenu = item.submenus?.some(
        (sub) => sub.path && isActiveLink(sub.path)
      );

      // === COMPORTEMENT DEMANDE ===
      // Le bouton parent n’est PAS actif si c'est un sous-menu qui l’est
      const highlight = isActiveMenu;

      // === Toggle : un seul menu ouvert à la fois ===
      const toggle = () => {
        if (openMenus[item.id]) {
          setOpenMenus({});
        } else {
          setOpenMenus({ [item.id]: true });
        }
      };

      // --- Pas de sous-menus ---
      if (!hasSubmenus) {
        return (
          <Link
            key={item.id}
            href={item.path!}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              highlight
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Icon size={20} />
            {isExpanded && (
              <span className="font-medium flex-1 text-left">{item.label}</span>
            )}
          </Link>
        );
      }

      // --- Avec sous-menus ---
      return (
        <div key={item.id}>
          <button
            onClick={toggle}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              highlight
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Icon size={20} />
            {isExpanded && (
              <>
                <span className="font-medium flex-1 text-left">
                  {item.label}
                </span>
                {openMenus[item.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </>
            )}
          </button>

          {isExpanded && openMenus[item.id] && (
            <div className="ml-4 mt-1 space-y-1">
              {item.submenus!.map((submenu) => {
                const SubIcon = submenu.icon;
                const active = submenu.path
                  ? isActiveLink(submenu.path)
                  : false;

                return (
                  <Link
                    key={submenu.id}
                    href={submenu.path!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                      active
                        ? "bg-orange-600 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <SubIcon size={16} />
                    <span>{submenu.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    },
    [isExpanded, openMenus, isActiveLink]
  );

  return (
    <div
      className={`group ${isExpanded ? "w-64" : "w-20"} 
    h-screen bg-linear-to-b from-gray-900 to-gray-800 text-white
    transition-all duration-300 ease-in-out 
    overflow-hidden flex flex-col overflow-scroll`}
      onMouseEnter={() => {
        if (!sidebarOpen) setHoverOpen(true);
      }}
      onMouseLeave={() => {
        if (!sidebarOpen) setHoverOpen(false);
      }}
    >
      <div className="p-6 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image
            src="/assets/logoIT1-removebg-preview.png"
            alt="Logo"
            width={100}
            height={100}
            className={`transition-all duration-300 
        ${isExpanded ? "w-10 h-10 opacity-100" : "w-10 h-10 opacity-100"}
      `}
          />

          {/* Titre visible uniquement si la sidebar est étendue */}
          <span
            className={`text-xl font-bold whitespace-nowrap transition-all duration-300
        ${isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}
      `}
          >
            RestaurantPro
          </span>
        </div>
        <Button
          onClick={() => setSidebarOpen((prev) => !prev)}
          size={"icon-sm"}
          className="p-2 hover:bg-gray-700 transition rounded-full"
        >
          {!isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-none">
        {menuItems.map(renderMenuItem)}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          {isExpanded && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}
