"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { RotateCcw } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import Cookies from "js-cookie"

interface ConfirmPengembalianDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirmedAndRefresh: () => void // ✅ ganti dari onConfirm
  pengembalianData: {
    id: number
    judul: string
    peminjam: string
  } | null
}

export function ConfirmPengembalianDialog({
  isOpen,
  onClose,
  onConfirmedAndRefresh,
  pengembalianData,
}: ConfirmPengembalianDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!pengembalianData) return

    const token = Cookies.get("token")
    const id = pengembalianData.id

    try {
      setLoading(true)

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/pustakawan/validate-return/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      if (response.data?.success) {
        toast.success("Pengembalian berhasil dikonfirmasi!", {
          description: `Buku "${pengembalianData.judul}" oleh ${pengembalianData.peminjam}.`,
        })

        // 🔁 trigger refresh dari parent
        onConfirmedAndRefresh()
      } else {
        toast.error("Pengembalian gagal dikonfirmasi: " + (response.data?.message ?? "Tidak diketahui"))
      }
    } catch (error: any) {
      console.error("❌ Gagal konfirmasi pengembalian:", error?.response?.data || error)
      toast.error("Gagal mengonfirmasi pengembalian.")
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            untuk mengonfirmasi pengembalian "{pengembalianData?.judul}"?
          </AlertDialogTitle>

          <p className="text-sm text-gray-600">
            Pengembalian oleh{" "}
            <span className="font-medium text-[#0E4D97]">{pengembalianData?.peminjam}</span> akan dikonfirmasi dan buku akan tersedia kembali untuk dipinjam.
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-md"
            disabled={loading}
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-md"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Iya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
