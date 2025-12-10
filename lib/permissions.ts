import { 
  Home, ShoppingCart, UtensilsCrossed, Package, Settings, 
  Clock, FileText, Tag, BookOpen, Coffee, AlertCircle, Users, ClipboardList 
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  path?: string
  submenus?: MenuItem[]
}

export const roleMenus: Record<string, MenuItem[]> = {
  admin: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, path: '/dashboard' },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart, path: '/sales/pos' },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock, path: '/sales/live-order' },
        { id: 'historique-commandes', label: 'Historique des commandes', icon: FileText, path: '/sales/order-history' },
        { id: 'rapport-vente', label: 'Rapport de vente', icon: FileText, path: '/sales/sales-report' }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'plans-repas', label: 'Plans de repas', icon: Coffee, path: '/menu-management/menu' },
        { id: 'categories', label: 'Catégories', icon: Tag, path: '/menu-management/categories' },
        { id: 'recettes', label: 'Recettes', icon: BookOpen, path: '/menu-management/recipes' },
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'apercu-actions', label: 'Aperçu des actions', icon: AlertCircle, path: '/inventory/stock-overview' },
        { id: 'ingredients', label: 'Ingrédients', icon: Package, path: '/inventory/ingredient-items' },
        { id: 'rapports', label: 'Rapports', icon: FileText, path: '/inventory/inventory-rapport' }
      ]
    },
    { 
      id: 'parametres', 
      label: 'Paramètres', 
      icon: Settings,
      submenus: [
        { id: 'organisation', label: 'Organisation', icon: Users, path: '/admin-settings/organisation' },
        { id: 'utilisateurs', label: 'Utilisateurs', icon: Users, path: '/admin-settings/user' },
        { id: 'roles-permissions', label: 'Rôles et permissions', icon: ClipboardList, path: '/admin-settings/roles-permissions' }
      ]
    }
  ],
  manager: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, path: '/dashboard' },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart, path: '/sales/pos' },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock, path: '/sales/live-order' },
        { id: 'historique-commandes', label: 'Historique des commandes', icon: FileText, path: '/sales/order-history' }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'categories', label: 'Catégories', icon: Tag, path: '/menu-management/categories' },
        { id: 'recettes', label: 'Recettes', icon: BookOpen, path: '/menu-management/recipes' },
        { id: 'plans-repas', label: 'Plans de repas', icon: Coffee, path: '/menu-management/menu' }
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'apercu-actions', label: 'Aperçu des actions', icon: AlertCircle, path: '/inventory/stock-overview' },
        { id: 'ingredients', label: 'Ingrédients', icon: Package, path: '/inventory/ingredient-items' },
        { id: 'rapports', label: 'Rapports', icon: FileText, path: '/inventory/inventory-rapport' }
      ]
    }
  ],
  serveur: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, path: '/dashboard' },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'point-de-vente', label: 'Point de vente', icon: ShoppingCart, path: '/sales/pos' },
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock, path: '/sales/live-order' }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'categories', label: 'Catégories', icon: Tag, path: '/menu-management/categories' },
        { id: 'recettes', label: 'Recettes', icon: BookOpen, path: '/menu-management/recipes' }
      ]
    }
  ],
  cuisinier: [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, path: '/dashboard' },
    { 
      id: 'ventes', 
      label: 'Ventes', 
      icon: ShoppingCart,
      submenus: [
        { id: 'commandes-direct', label: 'Commandes en direct', icon: Clock, path: '/sales/live-order' }
      ]
    },
    { 
      id: 'menus', 
      label: 'Gestion des menus', 
      icon: UtensilsCrossed,
      submenus: [
        { id: 'recettes', label: 'Recettes', icon: BookOpen, path: '/menu-management/recipes' }
      ]
    },
    { 
      id: 'inventaire', 
      label: 'Inventaire', 
      icon: Package,
      submenus: [
        { id: 'ingredients', label: 'Ingrédients', icon: Package, path: '/inventory/ingredient-items' }
      ]
    }
  ]
}