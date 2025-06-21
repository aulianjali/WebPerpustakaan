"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"
import type { DataBuku } from "./columns-buku"
import { toast } from "sonner"
import axios from "axios"
import Cookies from "js-cookie"

interface DeleteBukuDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  bukuData: DataBuku | null
}

export function DeleteBukuDialog({ isOpen, onClose, onConfirm, bukuData }: DeleteBukuDialogProps) {
  const handleConfirm = async () => {
    if (!bukuData) return

    const token = Cookies.get("token")
    const id = bukuData.idBuku.replace(/[^\d]/g, "") // Ambil angka saja dari ID (misal: "BK12" → "12")

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      toast.success("Data berhasil dihapus!", {
        description: `Buku "${bukuData.judulBuku}" telah dihapus dari koleksi.`,
        duration: 3000,
      })

      onConfirm() // Trigger parent state update
      onClose()
    } catch (error: any) {
      console.error("Gagal menghapus buku:", error)
      toast.error("Gagal menghapus buku", {
        description: error.response?.data?.message || "Terjadi kesalahan saat menghapus data.",
      })
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
            untuk menghapus "{bukuData?.judulBuku}"?
          </AlertDialogTitle>

          <p className="text-sm text-gray-600">
            Buku dengan ID <span className="font-medium text-[#0E4D97]">{bukuData?.idBuku}</span> akan dihapus permanen dari koleksi.
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 justify-center mt-4 pt-2">
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
          >
            Iya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
