import Home from "@/app/page";
import { AlertCircle, BookOpen, ClipboardList, Clock, Coffee, FileText, Package, Settings, ShoppingCart, Tag, Users, UtensilsCrossed } from "lucide-react";

// src/lib/roles.ts
export const Roles = {
  ADMIN: "admin",
  SERVER: "server",
  CASHIER: "cashier",
  COOK: "cook",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const Permissions = {
  MANAGE_USERS: [Roles.ADMIN],
  TAKE_ORDER: [Roles.SERVER, Roles.ADMIN],
  DO_PAYMENT: [Roles.CASHIER, Roles.ADMIN],
  MANAGE_KITCHEN: [Roles.COOK, Roles.ADMIN],
  VIEW_REPORTS: [Roles.ADMIN, Roles.CASHIER, Roles.SERVER],
};


export const roleMenus = {
  admin: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock },
        { id: 'historique-commandes', label: 'Historique des commandes', icon: FileText }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'categories', label: 'Catégories', icon: Tag },
        { id: 'recettes', label: 'Recettes', icon: BookOpen },
        { id: 'plans-repas', label: 'Plans de repas', icon: Coffee }
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'apercu-actions', label: 'Aperçu des actions', icon: AlertCircle },
        { id: 'ingredients', label: 'Ingrédients', icon: Package },
        { id: 'rapports', label: 'Rapports', icon: FileText }
      ]
    },
    { 
      id: 'parametres', 
      label: 'Paramètres', 
      icon: Settings,
      submenus: [
        { id: 'organisation', label: 'Organisation', icon: Users },
        { id: 'utilisateurs', label: 'Utilisateurs', icon: Users },
        { id: 'roles-permissions', label: 'Rôles et permissions', icon: ClipboardList }
      ]
    }
  ],
  manager: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock },
        { id: 'historique-commandes', label: 'Historique des commandes', icon: FileText }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'categories', label: 'Catégories', icon: Tag },
        { id: 'recettes', label: 'Recettes', icon: BookOpen },
        { id: 'plans-repas', label: 'Plans de repas', icon: Coffee }
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'apercu-actions', label: 'Aperçu des actions', icon: AlertCircle },
        { id: 'ingredients', label: 'Ingrédients', icon: Package },
        { id: 'rapports', label: 'Rapports', icon: FileText }
      ]
    }
  ],
  serveur: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'categories', label: 'Catégories', icon: Tag },
        { id: 'recettes', label: 'Recettes', icon: BookOpen }
      ]
    }
  ],
  cuisinier: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'recettes', label: 'Recettes', icon: BookOpen }
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'ingredients', label: 'Ingrédients', icon: Package }
      ]
    }
  ]
};