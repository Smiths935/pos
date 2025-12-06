"use client";
import { ArrowLeft } from "lucide-react";
// Simule le chargement des données par ID

import MenuItemForm from "../add/_form/menu-item-form";

// Dans la réalité, tu ferais un fetch vers /api/menu/items/{id}
const mockItem = {
  id: "m_1",
  name: "Classic Burger",
  basePrice: 12.99,
  description: "Juicy beef patty with cheese and lettuce.",
  imageUrl: "/assets/foods/beef-burger.png",
  isSeasonal: false,
  category: "main",
  dietaryLabels: ["gluten-free"],
  status: "active",
  availability: "all",
};

export default function page() {
  // const { id } = useParams(); // Récupère l'ID de l'URL
  // const [item, setItem] = useState<any | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     try {
  //       const response = await fetch(`/api/menu/items/${id}`);
  //       const data = await response.json();
  //       setItem(data);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement de l'article :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItem();
  // }, [id]);

  // if (loading) return <div>Loading...</div>;
  // if (!item) return <div>Item not found</div>;

  // const handleSubmit = (data: any) => {
  //   // PUT /api/menu/items/{id}
  // };

  // const handleCancel = () => {
  //   window.history.back();
  // };
  const handleSubmit = (data: any) => {
    console.log("Mise à jour de l'article :", data);
    // Appel API PUT ici
    alert("Item updated!");
  };

  const handleCancel = () => {
    // Retour à la liste
    window.history.back();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <ArrowLeft size={14} onClick={()=>handleCancel()} />
        <div>
          <h1>{mockItem.name}</h1>
          <h3>Mise à jour / voir les détails des éléments du menu</h3>
        </div>
      </div>
      <MenuItemForm
        initialData={mockItem}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={false}
      />
    </div>
  );
}
