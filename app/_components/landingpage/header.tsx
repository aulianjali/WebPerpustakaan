"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Library, Users, Info } from "lucide-react"

export default function HeaderAlternative() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <header className="w-full py-4 px-8 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">ReadWave</h1>
            <p className="text-xs text-gray-500">Baca Buku Jadi Mudah</p>
          </div>
        </div>

        {/* Login */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-2 min-w-[120px]"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}
