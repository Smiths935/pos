// src/app/sales/orders/[id]/page.tsx
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EyeIcon,
  PrinterIcon,
  DownloadIcon,
  DollarSignIcon,
  AlertTriangleIcon,
} from "lucide-react";

// Données simulées — à remplacer par un appel API
const mockOrders = [
  {
    id: "o_2",
    number: "ORD78902",
    client: "Michael Chen",
    type: "takeaway",
    items: [
      { name: "Poulet parmesan", quantity: 1, price: 18.99, total: 18.99 },
      { name: "pain à l'ail", quantity: 1, price: 4.99, total: 4.99 },
    ],
    total: 23.98,
    tax: 2.04,
    grandTotal: 23.98,
    status: "completed",
    createdAt: "2023-09-10T12:15:00Z",
    updatedAt: "2023-09-10T12:15:00Z",
    paymentMethod: "Espèces",
    branch: "Succursale de Los Angeles",
    notes: "",
    refundedAt: null,
    refundAmount: 0,
  },
  {
    id: "o_5",
    number: "ORD78905",
    client: "Jennifer Lee",
    type: "takeaway",
    items: [
      { name: "Poulet parmesan", quantity: 1, price: 18.99, total: 18.99 },
      { name: "pain à l'ail", quantity: 1, price: 4.99, total: 4.99 },
    ],
    total: 23.98,
    tax: 2.04,
    grandTotal: 23.98,
    status: "refunded",
    createdAt: "2023-09-07T13:30:00Z",
    updatedAt: "2023-09-07T13:30:00Z",
    paymentMethod: "Carte de crédit",
    branch: "Succursale Avenue Mall",
    notes: "",
    refundedAt: "2023-09-07T13:35:00Z",
    refundAmount: 23.98,
  },
];

export default function OrderHistoryDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundOrder = mockOrders.find((o) => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // Redirige vers la liste si la commande n'existe pas
        router.push("/sales/orders/history");
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

  const handleDownloadInvoice = () => {
    console.log("Télécharger la facture :", order.id);
    alert("Facture téléchargée !");
  };

  const handleProcessRefund = () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir traiter le remboursement de cette commande ?"
      )
    ) {
      console.log("Traitement du remboursement :", order.id);
      // Appel API PUT ici
      alert("Remboursement traité !");
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("fr-FR")} ${date.toLocaleTimeString(
      "fr-FR",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Complété
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Annulé
          </span>
        );
      case "refunded":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
            Remboursé
          </span>
        );
      case "partial-refund":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Remboursement Partiel
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
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
          {getStatusBadge(order.status)}
          <span className="text-sm text-muted-foreground">
            {formatDateTime(order.createdAt)}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {order.branch}
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="border-t border-border p-4">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxe (8,5%)</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
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
              <CardTitle>Informations sur la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Détails de la commande
                  </label>
                  <div className="text-sm">
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
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                      </svg>
                      <span>Numéro de commande : #{order.number}</span>
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
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                      </svg>
                      <span>
                        Date :{" "}
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </span>
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 12 18"></polyline>
                        <polyline points="6 12 12 12 18 12"></polyline>
                      </svg>
                      <span>
                        Heure :{" "}
                        {new Date(order.createdAt).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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
                        <path d="M20 21v-2a4 4 0 0 0-5.356-3.8A4 4 0 0 0 16 11H4a4 4 0 0 0-3.8 5.356A4 4 0 0 0 4 16v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Succursale : {order.branch}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Informations de paiement
                  </label>
                  <div className="text-sm">
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
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                      </svg>
                      <span>Mode de paiement : {order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSignIcon className="h-4 w-4" />
                      <span>Montant : ${order.grandTotal.toFixed(2)}</span>
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
                        <path d="M20 21v-2a4 4 0 0 0-5.356-3.8A4 4 0 0 0 16 11H4a4 4 0 0 0-3.8 5.356A4 4 0 0 0 4 16v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Statut : {getStatusBadge(order.status)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : Détails du client et options de remboursement */}
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
              </div>
            </CardContent>
          </Card>

          {order.status === "refunded" || order.status === "partial-refund" ? (
            <Card>
              <CardHeader>
                <CardTitle>Options de remboursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Si nécessaire, procédez au remboursement de cette commande.
                    Un reçu de remboursement sera alors généré.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleProcessRefund}
                    className="w-full gap-2 text-red-600 hover:text-red-700"
                  >
                    <DollarSignIcon className="h-4 w-4" />
                    Traitement du remboursement
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Options de remboursement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Aucun remboursement n'est disponible pour cette commande.
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
                  onClick={handleDownloadInvoice}
                  className="w-full gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Télécharger la facture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
