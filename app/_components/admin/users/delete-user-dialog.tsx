"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"
import type { Datamember, DataPustakawan } from "./columns-user"
import { toast } from "sonner"

interface DeleteUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userData: Datamember | DataPustakawan | null
}

export function DeleteUserDialog({
  isOpen,
  onClose,
  onConfirm,
  userData,
}: DeleteUserDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!userData) return
    const token = Cookies.get("token")

    try {
      setLoading(true)
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log("✅ User berhasil dihapus:", response.data)
      toast.success("Data berhasil dihapus!", {
        description: `User dengan ID "${userData.id}" telah dihapus dari sistem.`,
        duration: 3000,
      })

      onConfirm() // Update UI lokal (hapus dari state)
      onClose() // Tutup dialog
    } catch (error: any) {
      console.error("❌ Gagal menghapus user:", error)
      toast.error("Gagal menghapus user. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 border-2 border-yellow-200">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>

          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            untuk menghapus "{userData?.name}"?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-600">
            Data user dengan ID{" "}
            <span className="font-medium text-[#0E4D97]">{userData?.id}</span> akan dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={onClose}
            
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-2.5 rounded-md min-w-[80px]"
            disabled={loading}
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
          
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-2.5 rounded-md min-w-[80px]"
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Iya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
