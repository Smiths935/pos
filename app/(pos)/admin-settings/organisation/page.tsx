import { Suspense } from "react";
import OrganistationPage from "./_components/organisation-page-content/page";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <OrganistationPage />
    </Suspense>
  );
}
