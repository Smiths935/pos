"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { logout } from "@/lib/auth";
import { roleMenus, MenuItem } from "@/lib/permissions";

interface SidebarProps {
  user: { role: string; name: string; email: string };
  currentPath: string;
}

export default function Sidebar({ user, currentPath }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = roleMenus[user?.role] || [];

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const isActiveLink = (path: string) => pathname === path;

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const hasSubmenus = item.submenus && item.submenus.length > 0;
    const isActive = item.path
      ? isActiveLink(item.path)
      : item.submenus?.some((sub) => isActiveLink(sub.path!));

    if (!hasSubmenus) {
      return (
        <Link
          key={item.id}
          href={item.path!}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Icon size={20} />
          {sidebarOpen && (
            <span className="font-medium flex-1 text-left">{item.label}</span>
          )}
        </Link>
      );
    }

    return (
      <div key={item.id}>
        <button
          onClick={() => toggleMenu(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Icon size={20} />
          {sidebarOpen && (
            <>
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {openMenus[item.id] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </>
          )}
        </button>

        {sidebarOpen && openMenus[item.id] && (
          <div className="ml-4 mt-1 space-y-1">
            {item.submenus!.map((submenu) => {
              const SubIcon = submenu.icon;
              return (
                <Link
                  key={submenu.id}
                  href={submenu.path!}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                    isActiveLink(submenu.path!)
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
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between border-b border-gray-700">
        {sidebarOpen && <h1 className="text-xl font-bold">RestaurantPro</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map(renderMenuItem)}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}
