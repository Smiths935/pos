"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PrinterIcon,
  TrashIcon,
  ClockIcon,
  CheckIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
} from "lucide-react";

// Données simulées — à remplacer par un appel API
const mockOrders = [
  {
    id: "o_1",
    number: "1001",
    client: "John Smith",
    type: "dine-in",
    table: "Tableau 12",
    items: [
      {
        name: "Burger classique",
        size: "Moyenne",
        quantity: 2,
        price: 11.99,
        total: 23.98,
      },
      { name: "Frites", size: "", quantity: 1, price: 4.99, total: 4.99 },
      { name: "Coke", size: "", quantity: 2, price: 2.99, total: 5.98 },
    ],
    total: 34.95,
    tax: 2.97,
    grandTotal: 34.95,
    status: "cooking",
    createdAt: "2025-12-05T17:55:31Z",
    updatedAt: "2025-12-05T17:57:31Z",
    preparationStartedAt: "2025-12-05T17:57:31Z",
    readyAt: null,
    completedAt: null,
    cancelledAt: null,
    paymentMethod: "Carte de crédit",
    notes: "",
  },
];

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState<any | null>(null);
  const [currentStatus, setCurrentStatus] = useState<
    "new" | "preparing" | "ready" | "cooking" | "completed"
  >("cooking");

  useEffect(() => {
    if (id) {
      const foundOrder = mockOrders.find((o) => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
        setCurrentStatus(foundOrder.status as any);
      } else {
        // Redirige vers la liste si la commande n'existe pas
        router.push("/sales/live-orders");
      }
    }
  }, [id, router]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const handlePrintReceipt = () => {
    console.log("Imprimer le reçu :", order.id);
    alert("Reçu imprimé !");
  };

  const handleDownloadReceipt = () => {
    console.log("Télécharger le reçu :", order.id);
    alert("Reçu téléchargé !");
  };

  const handleCancelOrder = () => {
    if (confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
      console.log("Annulation de la commande :", order.id);
      // Appel API DELETE ici
      router.push("/sales/live-orders");
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    console.log("Mettre à jour le statut :", newStatus);
    // Appel API PUT ici
    setOrder((prev) => ({ ...prev, status: newStatus }));
    setCurrentStatus(newStatus as any);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "cooking":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <ClockIcon className="h-4 w-4" />;
      case "preparing":
        return <ChevronRightIcon className="h-4 w-4" />;
      case "ready":
        return <CheckIcon className="h-4 w-4" />;
      case "cooking":
        return <AlertTriangleIcon className="h-4 w-4" />;
      case "completed":
        return <CheckIcon className="h-4 w-4" />;
      case "cancelled":
        return <TrashIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderStatusButtons = () => {
    const statuses = ["new", "preparing", "ready", "cooking", "completed"];
    const currentIndex = statuses.indexOf(currentStatus);

    return (
      <div className="flex flex-col space-y-2">
        {statuses.map((status, index) => {
          const isCurrent = currentStatus === status;
          const isPast = index < currentIndex;
          const isFuture = index > currentIndex;

          return (
            <Button
              key={status}
              variant={isCurrent ? "default" : "outline"}
              className={`w-full gap-2 ${getStatusColor(status)} ${
                isPast ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (isPast || isFuture) return;
                handleUpdateStatus(status);
              }}
              disabled={isPast}
              aria-label={`État : ${status}`}
            >
              {getStatusIcon(status)}
              {status === "new" && "Nouveau"}
              {status === "preparing" && "Préparation"}
              {status === "ready" && "Prêt"}
              {status === "cooking" && "Cuisson"}
              {status === "completed" && "Complété"}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
        <h1 className="text-2xl font-bold mt-2">Commande {order.number}</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
            {order.type === "dine-in" ? "Cuisson" : order.type}
          </span>
          <span className="text-sm text-muted-foreground">
            <ClockIcon className="inline h-4 w-4 mr-1" />
            {formatDateTime(order.createdAt)}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Colonne gauche : Détails de la commande */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Article</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                          {item.size && (
                            <div className="text-xs text-muted-foreground">
                              Taille : {item.size}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="border-t border-border p-4">
                  {/* <div className="flex justify-between">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between">
                    <span>Taxe (8.5%)</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between font-bold pt-2">
                    <span>Total</span>
                    <span>${order.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendrier des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                    <ClockIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Commande reçue</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDateTime(order.createdAt)}
                    </div>
                  </div>
                </div>
                {order.preparationStartedAt && (
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800">
                      <ChevronRightIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">
                        Préparation de la commande commencée
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateTime(order.preparationStartedAt)}
                      </div>
                    </div>
                  </div>
                )}
                {order.readyAt && (
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">La commande est prête</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateTime(order.readyAt)}
                      </div>
                    </div>
                  </div>
                )}
                {order.completedAt && (
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">
                        La commande est complétée
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateTime(order.completedAt)}
                      </div>
                    </div>
                  </div>
                )}
                {order.cancelledAt && (
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-800">
                      <TrashIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">La commande est annulée</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateTime(order.cancelledAt)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : Détails du client et actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails du client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-5.356-3.8A4 4 0 0 0 16 11H4a4 4 0 0 0-3.8 5.356A4 4 0 0 0 4 16v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{order.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions de commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    État de la mise à jour
                  </label>
                  {renderStatusButtons()}
                </div>
                <div>
                  <label className="text-sm font-medium">Plus d'actions</label>
                  <div className="space-y-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrintReceipt}
                      className="w-full gap-2"
                    >
                      <PrinterIcon className="h-4 w-4" />
                      Imprimer le reçu
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadReceipt}
                      className="w-full gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 0 2 2H3a2 2 0 0 0 2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Télécharger le reçu
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelOrder}
                      className="w-full gap-2 text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Annuler la commande
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
