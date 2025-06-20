"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie"

// Tombol Hapus dengan Alert
export function HapusAlert({
  judul,
  onConfirm,
}: {
  judul: string
  onConfirm: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)

    // Tampilkan sonner toast untuk konfirmasi hapus
    toast.success("Data berhasil dihapus!", {
      description: `"${judul}" telah dihapus dari daftar peminjaman.`,
    })

    // Panggil callback onConfirm
    onConfirm()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Hapus</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            <br />
            untuk menghapus "{judul}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-sm">
            Data yang dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={() => setOpen(false)}
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

// Tombol Pinjam dengan Alert - REFACTORED
export function PinjamAlert({
  bookData,
  onConfirm,
  isLoading = false,
  disabled = false,
}: {
  bookData?: {
    judul: string
    penulis: string
    penerbit: string
    tahun: string
  }
  onConfirm?: () => void
  isLoading?: boolean
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    if (disabled) return

    setOpen(false)

    toast.success("Buku berhasil dipinjam!", {
      description: `"${bookData?.judul || "Buku"}" telah ditambahkan ke daftar peminjaman Anda.`,
    })
    // Panggil callback jika ada
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (disabled && newOpen) return
        setOpen(newOpen)
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          className={`text-sm px-5 py-1 rounded-md shadow transition-colors duration-200 flex items-center gap-2 ${
            disabled
              ? "bg-blue-200 text-blue-400 cursor-not-allowed hover:bg-blue-200"
              : "bg-[#0E4D97] hover:bg-[#0A3A6F] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
          onClick={() => !disabled && setOpen(true)}
          disabled={isLoading || disabled}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Meminjam..." : "Pinjam"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin untuk meminjam?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-sm">
            {bookData ? (
              <>
                Buku <strong>"{bookData.judul}"</strong> oleh {bookData.penulis} akan ditambahkan ke daftar peminjaman
                Anda.
              </>
            ) : (
              "Buku ini akan ditambahkan ke daftar peminjaman Anda."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
            disabled={isLoading}
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
            variant="ghost"
            className="bg-green-500 hover:bg-green-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px] disabled:opacity-50 flex items-center gap-2"
            disabled={isLoading || disabled}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Meminjam..." : "Iya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Tombol Batal dengan Alert
export function BatalAlert({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-600 text-red-600 font-light hover:bg-red-50 hover:border-red-700 hover:text-red-700 transition-colors duration-200"
          onClick={() => setOpen(true)}
        >
          Batal
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            <br />
            untuk membatalkan?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-sm">
            Tindakan ini akan membatalkan proses yang sedang berlangsung.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
          >
            Tidak
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              onConfirm()
            }}
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

// Tombol Batal Peminjaman dengan Alert dan API Integration
export function BatalPinjamAlert({
  judul,
  idPeminjaman,
  onSuccess,
}: {
  judul: string
  idPeminjaman: number
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = Cookies.get("token")

  const handleConfirm = async () => {
    try {
      setIsLoading(true)

      if (!token) {
        toast.error("Token tidak tersedia", {
          description: "Silakan login kembali",
          duration: 3000,
        })
        return
      }

      console.log("Membatalkan peminjaman ID:", idPeminjaman)

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/borrow/cancel/${idPeminjaman}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      console.log("Response cancel:", response.data)

      if (response.data && response.data.success) {
        toast.success("Peminjaman berhasil dibatalkan!", {
          description: `"${judul}" telah dibatalkan dari daftar peminjaman.`,
          duration: 3000,
        })

        setOpen(false)
        onSuccess()
      } else {
        throw new Error(response.data?.message || "Gagal membatalkan peminjaman")
      }
    } catch (error: any) {
      console.error("Error cancel peminjaman:", error)
      toast.error("Gagal membatalkan peminjaman", {
        description: error.response?.data?.message || error.message || "Terjadi kesalahan",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 px-3 text-xs border-none text-red-500 hover:text-red-600 hover:bg-red-50 shadow-none flex items-center gap-1"
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          <Trash2 className="h-3 w-3" />
          Batal
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin untuk membatalkan peminjaman buku "{judul}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-sm">
            Peminjaman yang dibatalkan tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 justify-center mt-6 pt-2">
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px]"
            disabled={isLoading}
          >
            Tidak
          </Button>
          <Button
            onClick={handleConfirm}
            variant="ghost"
            className="bg-green-500 hover:bg-green-600 text-white hover:text-white font-medium px-8 py-2.5 rounded-md transition-colors duration-200 min-w-[80px] disabled:opacity-50 flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Membatalkan..." : "Iya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
