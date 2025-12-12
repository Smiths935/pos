"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";

interface User {
  role: string;
  name: string;
  email: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const { isAuthenticated, user: authUser } = await checkAuth();

      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setUser(authUser);
      }
    };

    verify();
  }, [router]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar statique et pleine hauteur */}
      <Sidebar user={user} />

      {/* Zone principale */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar fixe */}
        <div className="w-full">
          <TopBar user={user} />
        </div>

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
