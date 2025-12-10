'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UtensilsCrossed } from 'lucide-react'
import { checkAuth } from '@/lib/auth'

export default function SplashPage() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const redirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const { isAuthenticated } = await checkAuth()
      
      if (isAuthenticated) {
        console.log("auth valide");
        
        router.replace('/dashboard')
      } else {
        console.log("auth invalide");
        router.replace('/login')
      }
    }

    redirect()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex flex-col items-center justify-center">
      <div className="text-white mb-8 transform hover:scale-110 transition-transform duration-300">
        <UtensilsCrossed size={120} strokeWidth={1.5} />
      </div>
      <h1 className="text-5xl font-bold text-white mb-12">RestaurantPro</h1>
      <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/80 mt-4 text-sm">Chargement en cours...</p>
    </div>
  )
}