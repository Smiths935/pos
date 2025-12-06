/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { BuildingIcon, GitBranch, PlusIcon, UsersIcon } from "lucide-react";
import TabsNav from "@/components/layout/tabs-nav";
import { useSearchParams, useRouter } from "next/navigation";
import HeadSectionPage from "@/components/headSectionPage";
import OrganisationProfile from "./_components/organisation-profile";
import BranchPage from "./_components/branch-page";



export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    if (activeTab !== tabFromUrl) {
      router.push(`?tab=${activeTab}`, { scroll: false });
    }
  }, [activeTab, tabFromUrl, router]);

  const tabs = [
    {
      id: "profile",
      label: "Organization Profile",
      icon: BuildingIcon,
    },
    {
      id: "branches",
      label: "Branch Management",
      icon: GitBranch,
    },
  ];

  return (
    <div className="space-y-6 bg-white">
      <HeadSectionPage
        title="Organization Management"
        description="Manage root organization details and branch locations"
      />

      <TabsNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && <OrganisationProfile />}
        {activeTab === "branches" && <BranchPage />}
      </div>
    </div>
  );
}
