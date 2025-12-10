
import PosDashboardCard from "./_components/pos-dashboard-cards";

export default function PosPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Terminal de point de vente (PDV)</h1>
        <p className="text-sm text-muted-foreground">
          Cliquez sur les cartes ci-dessous pour afficher les différents écrans/vues du système de point de vente.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Carte 1 : Comptoir de commande */}
        <PosDashboardCard
          title="Comptoir de commande"
          description="Gestion des commandes rapide et facile grâce aux attributs des articles et à une interface utilisateur conviviale."
          imageUrl="/assets/foods/beef-burger.png"
          link="/pos/order"
          target="_blank"
        />

        {/* Carte 2 : Commander sur mobile */}
        {/* <PosDashboardCard
          title="Commander sur mobile"
          description="Permettre aux clients de commander depuis leur téléphone portable."
          imageUrl="/assets/foods/beef-burger.png"
          link="/pos/mobile"
          target="_blank"
        /> */}

        {/* Carte 3 : Vitrine de cuisine */}
        <PosDashboardCard
          title="Vitrine de cuisine"
          description="Système de suivi et de gestion des commandes en temps réel pour le personnel de cuisine."
          imageUrl="/assets/foods/beef-burger.png"
          link="/kitchen"
          target="_blank"
        />

        {/* Carte 4 : Vérifier */}
        <PosDashboardCard
          title="Vérifier"
          description="Traitement des paiements simplifié avec de multiples options de paiement."
          imageUrl="/assets/foods/beef-burger.png"
          link="/checkout"
          target="_blank"
        />
      </div>
    </div>
  );
}