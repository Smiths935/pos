'use client'

import { ShoppingCart, DollarSign, UtensilsCrossed, Users, Clock } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Commandes aujourd\'hui', value: '47', icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
    { label: 'Revenus du jour', value: '2,450€', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Plats vendus', value: '156', icon: UtensilsCrossed, color: 'from-purple-500 to-purple-600' },
    { label: 'Tables occupées', value: '8/15', icon: Users, color: 'from-orange-500 to-orange-600' },
  ]

  const activities = [
    { action: 'Nouvelle commande #1001', detail: 'Table 5', time: '5 min' },
    { action: 'Commande terminée #998', detail: 'Table 3', time: '12 min' },
    { action: 'Réservation confirmée', detail: '19:30 - 4 personnes', time: '18 min' },
    { action: 'Nouvelle commande #1000', detail: 'Table 7', time: '25 min' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon size={40} className="opacity-80" />
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Activité récente</h3>
        <div className="space-y-3">
          {activities.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-orange-600" />
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
  )
}