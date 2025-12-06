import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - col fixed sur desktop, masqué sur mobile par défaut */}
      {/* <aside className="sticky top-0 hidden md:block md:w-64 lg:w-72 h-screen shrink-0 overflow-y-auto border-r bg-background">
        <Sidebar />
      </aside> */}
      <aside className="sticky top-0 hidden md:block md:w-64 lg:w-72 h-screen shrink-0 overflow-y-auto border-r bg-background">
        <Sidebar />
      </aside>

      {/* Contenu principal */}
      {/* <div className="flex flex-1 flex-col w-full"> */}
      {/* Topbar - fixe en haut */}
      {/* <header className="sticky top-0 z-10 border-b bg-background">
          <Topbar />
        </header> */}

      {/* Contenu scrollable */}
      {/* <main id="main-content" className="flex-1 overflow-auto p-8 md:p-12">
          {children}
        </main> */}
      {/* </div> */}
      <div className="flex flex-1 flex-col w-full">
        <header className="sticky top-0 z-10 border-b bg-background">
          <Topbar />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
