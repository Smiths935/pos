/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import HeadSectionPage from "@/components/headSectionPage";
import TabsNav from "@/components/layout/tabs-nav";
import { LayoutDashboard, MenuIcon, PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DashMenu from "./_components/dash-menu";
import ListMenu from "./_components/list-menu";

export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get("tab") || "Dashboard";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    if (activeTab !== tabFromUrl) {
      router.push(`?tab=${activeTab}`, { scroll: false });
    }
  }, [activeTab, tabFromUrl, router]);

  const tabs = [
    {
      id: "Dashboard",
      label: "Tableau de board",
      icon: LayoutDashboard,
    },
    {
      id: "menu",
      label: "Liste des menus",
      icon: MenuIcon,
    },
  ];
  const handleAddCategory = () => {
    router.push('/menu-management/menu/add')
  };



  return (
    <div className="space-y-6 bg-white">
      <HeadSectionPage
        title="Gestion du Menu"
        description="Gérez les plats du menu de votre restaurat"
         actionButton={{
          label: "Ajouter un article au menu",
          onClick: handleAddCategory,
          icon: PlusIcon,
          variant: "default",
        }}
      />

      <TabsNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "Dashboard" && <DashMenu />}
        {activeTab === "menu" && <ListMenu />}
      </div>
    </div>
  );
}
