'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { checkAuth } from '@/lib/auth'
import Sidebar from '@/components/layout/sidebar'
import TopBar from '@/components/layout/topbar'

interface User {
  role: string
  name: string
  email: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const verify = async () => {
      const { isAuthenticated, user: authUser } = await checkAuth()
      
      if (!isAuthenticated) {
        router.push('/login')
      } else {
        setUser(authUser)
        setLoading(false)
      }
    }

    verify()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user!} currentPath={pathname} />
      <div className="flex-1 flex flex-col">
        <TopBar user={user!} />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}