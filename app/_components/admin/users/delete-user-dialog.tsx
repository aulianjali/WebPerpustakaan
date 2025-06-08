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
import type { DataAnggota, DataPustakawan } from "./columns-user"
import { toast } from "sonner" 

interface DeleteUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userData: DataAnggota | DataPustakawan | null
}

export function DeleteUserDialog({ isOpen, onClose, onConfirm, userData }: DeleteUserDialogProps) {
  
  const handleConfirm = () => {
    if (userData) {
      toast.success("Data berhasil dihapus!", {
        description: `User dengan ID "${userData?.idPerpus}" telah dihapus dari sistem.`,
        duration: 3000,
      })
    }
    onConfirm()  // Jalankan aksi penghapusan
    onClose()    // Tutup dialog
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 border-2 border-yellow-200">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>

          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            <br />
            untuk menghapus "{userData?.nama}"?
          </AlertDialogTitle>

          {/* Additional warning text */}
          <p className="text-sm text-gray-600">
            Data user dengan ID <span className="font-medium text-[#0E4D97]">{userData?.idPerpus}</span> akan dihapus
            permanen
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={onClose}
            variant="ghost"
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
            variant="ghost"
            className="bg-green-500 hover:bg-green-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
          >
            Iya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
