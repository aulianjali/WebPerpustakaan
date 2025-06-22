"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Key, X } from "lucide-react"
import { toast } from "sonner"
import type { Datamember, DataPustakawan } from "./columns-user"

interface DetailUserDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: Datamember | DataPustakawan | null
}

export function DetailUserDialog({ isOpen, onClose, userData }: DetailUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirmReset = async () => {
    if (!userData) return

    try {
      setIsSubmitting(true)
      const token = Cookies.get("token")

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/reset/${userData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log("✅ Password berhasil di-reset:", response.data)

      toast.success("Password berhasil di-reset!", {
        description: `Password user "${userData.name}" telah diperbarui.`,
      })

      onClose()
    } catch (error: any) {
      console.error("❌ Gagal reset password:", error)
      toast.error("Gagal reset password.")
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <AlertDialogHeader className="text-center">
          {/* Ikon kunci */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200">
              <Key className="h-6 w-6  text-[#0E4D97]" />
            </div>
          </div>

          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed mt-2">
            Reset Password untuk "{userData.name}"
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-600">
            Apakah anda yakin ingin me-reset password user ini?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center mt-6 pt-2 gap-3">
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2"
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            onClick={handleConfirmReset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            disabled={isSubmitting}
          >
            Iya, Reset Password
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
