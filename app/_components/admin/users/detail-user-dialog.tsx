"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Eye, EyeOff, Key, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Datamember, DataPustakawan } from "./columns-user"

interface DetailUserDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: Datamember | DataPustakawan | null
}

export function DetailUserDialog({ isOpen, onClose, userData }: DetailUserDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState<string | null>(null)

  // Fetch password saat dialog terbuka
  useEffect(() => {
    const fetchPassword = async () => {
      if (!userData) return

      try {
        const role = userData?.role || "member" // default "member"
        const url =
          role === "pustakawan"
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/pustakawan`
            : `${process.env.NEXT_PUBLIC_API_URL}/users/member`

        const response = await axios.get(url)

        const foundUser = response.data.data.find((u: any) => u.id === userData.id)
        setPassword(foundUser?.password ?? null)
      } catch (error) {
        console.error("Gagal fetch password:", error)
        setPassword(null)
      }
    }

    if (isOpen) {
      fetchPassword()
    } else {
      setPassword(null)
      setShowPassword(false)
    }
  }, [isOpen, userData])

  if (!userData) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-6 w-6 p-0 hover:bg-gray-200 rounded-full z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Tutup</span>
        </Button>

        <AlertDialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200">
              <Key className="h-6 w-6 text-[#0E4D97]" />
            </div>
          </div>

          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Password untuk username "{userData.username}"
          </AlertDialogTitle>

          {/* Password Display */}
          <div className="space-y-2">
            <div className="relative">
              <div className="w-full px-4 py-3 text-base bg-white border-2 border-[#0E4D97] rounded-md font-mono text-center tracking-wider">
                {showPassword ? password : password?.replace(/./g, "•")}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-600" />
                )}
                <span className="sr-only">{showPassword ? "Sembunyikan" : "Tampilkan"}</span>
              </Button>
            </div>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
