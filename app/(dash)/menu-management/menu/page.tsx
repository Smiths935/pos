import { Suspense } from "react";
import MenuPageContent from "./_components/menu-page-content/page";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MenuPageContent />
    </Suspense>
  );
}
