"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak ditemukan atau Anda tidak memiliki akses untuk mengunjungi halaman ini.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Kembali
          </Button>
          <Button onClick={handleGoHome} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Home size={16} />
            Beranda
          </Button>
        </div>
      </div>
    </div>
  )
}
