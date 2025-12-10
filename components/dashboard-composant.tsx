'use client';

import { LogOut, Menu, X, ShoppingCart, DollarSign, UtensilsCrossed, Users, Tag } from "lucide-react";
import { useState } from "react";
import { roleMenus } from "@/lib/role";
import { MenuItem } from "./menu-items";

// Composant Dashboard
export const Dashboard = ({ user, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  
  const menuItems = roleMenus[user.role] || [];

  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const getCurrentMenuLabel = () => {
    for (const item of menuItems) {
      if (item.id === activeMenu) return item.label;
      if (item.submenus) {
        const submenu = item.submenus.find(sub => sub.id === activeMenu);
        if (submenu) return submenu.label;
      }
    }
    return 'Tableau de bord';
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Commandes aujourd'hui</p>
                    <p className="text-3xl font-bold mt-2">47</p>
                  </div>
                  <ShoppingCart size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Revenus du jour</p>
                    <p className="text-3xl font-bold mt-2">2,450€</p>
                  </div>
                  <DollarSign size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Plats vendus</p>
                    <p className="text-3xl font-bold mt-2">156</p>
                  </div>
                  <UtensilsCrossed size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Tables occupées</p>
                    <p className="text-3xl font-bold mt-2">8/15</p>
                  </div>
                  <Users size={40} className="opacity-80" />
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Activité récente</h3>
              <div className="space-y-3">
                {[
                  { action: 'Nouvelle commande #1001', detail: 'Table 5', time: '5 min' },
                  { action: 'Commande terminée #998', detail: 'Table 3', time: '12 min' },
                  { action: 'Réservation confirmée', detail: '19:30 - 4 personnes', time: '18 min' },
                  { action: 'Nouvelle commande #1000', detail: 'Table 7', time: '25 min' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <ShoppingCart size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Il y a {item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'point-de-vente':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Point de vente</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Menu</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Pizza Margherita', 'Salade César', 'Burger Classic', 'Pâtes Carbonara', 'Steak Frites', 'Tiramisu'].map((item, i) => (
                    <button key={i} className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <UtensilsCrossed size={24} className="text-orange-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-800">{item}</p>
                          <p className="text-sm text-gray-500">{(12 + i * 2)}€</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Commande en cours</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Pizza Margherita x2</span>
                    <span className="font-semibold">24€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Salade César x1</span>
                    <span className="font-semibold">14€</span>
                  </div>
                </div>
                <div className="border-t-2 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total</span>
                    <span className="text-orange-600">38€</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition">
                    Valider la commande
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Catégories</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Gérez les catégories de votre menu</p>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                  + Nouvelle catégorie
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Entrées', 'Plats principaux', 'Desserts', 'Boissons', 'Spécialités', 'Menu enfant'].map((cat, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Tag size={20} className="text-orange-600" />
                      </div>
                      <h3 className="font-bold text-gray-800">{cat}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 15) + 5} articles</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{getCurrentMenuLabel()}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-600">Contenu de la section "{getCurrentMenuLabel()}"</p>
              <p className="text-sm text-gray-500 mt-4">Cette section est accessible pour le rôle: <span className="font-semibold text-orange-600">{user.role}</span></p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">RestaurantPro</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-700 rounded-lg transition">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              activeMenu={activeMenu}
              onClick={handleMenuClick}
              isOpen={openMenus[item.id]}
              onToggle={toggleMenu}
              sidebarOpen={sidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bonjour, {user.name}! 👋</h1>
            <p className="text-sm text-gray-600">Rôle: <span className="font-semibold text-orange-600">{user.role}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};