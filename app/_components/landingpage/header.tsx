"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [selectedRole, setSelectedRole] = useState("member")
  const router = useRouter()

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <header className="w-full py-6 px-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-blue-600">Perpustakaan Digital</h1>
        </div>
        <div className="flex items-center space-x-4">
          <h3>Jangan Lupa Login Dulu !</h3>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}
