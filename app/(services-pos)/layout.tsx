export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - col fixed sur desktop, masqué sur mobile par défaut */}
      {/* topnavbar */}
      <header className="sticky top-0 z-10 border-b bg-background">
        {/* <Topbar /> */}
      </header>


      <main id="main-content" className="flex-1 overflow-auto p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}
