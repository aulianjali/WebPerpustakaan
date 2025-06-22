"use client"

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

interface ConfirmPengembalianDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  pengembalianData: {
    judul: string
    peminjam: string
  } | null
}

export function ConfirmPengembalianDialog({ isOpen, onClose, onConfirm, pengembalianData }: ConfirmPengembalianDialogProps) {

  const handleConfirm = () => {
    if (pengembalianData) {
      toast.success(`${pengembalianData.peminjam} berhasil melakukan pengembalian buku ${pengembalianData.judul}`)
    }
    onConfirm()
    onClose()
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
            Pengembalian oleh <span className="font-medium text-[#0E4D97]">{pengembalianData?.peminjam}</span> akan dikonfirmasi dan buku akan tersedia kembali untuk dipinjam
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button onClick={onClose} variant="ghost" className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-md">
            Tidak
          </Button>
          <Button onClick={handleConfirm} variant="ghost" className="bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-md">
            Iya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}