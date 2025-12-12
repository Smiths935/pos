'use client'
interface TopBarProps {
  user: { role: string; name: string; email: string }
}

export default function TopBar({ user }: TopBarProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bonjour, {user?.name}! 👋</h1>
        <p className="text-sm text-gray-600">
          Rôle: <span className="font-semibold text-orange-600">{user?.role}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  )
}