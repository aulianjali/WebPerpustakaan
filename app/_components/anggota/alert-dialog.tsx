"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

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

// Tombol Pinjam dengan Alert
export function PinjamAlert({
  bookData,
  onConfirm,
}: {
  bookData?: {
    judul: string
    penulis: string
    penerbit: string
    tahun: string
  }
  onConfirm?: () => void
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleConfirm = () => {
    setOpen(false)

    // Debug log
    console.log("Attempting to show toast...")

    // Tampilkan sonner toast dengan try-catch untuk debugging
    try {
      toast.success("Buku berhasil dipinjam!", {
        description: `"${bookData?.judul || "Buku"}" telah ditambahkan ke daftar peminjaman Anda.`,
      })
      console.log("Toast called successfully")
    } catch (error) {
      console.error("Toast error:", error)
    }

    // Simpan data ke localStorage untuk ditampilkan di halaman konfirmasi
    if (bookData) {
      const currentDate = new Date()
      const tanggalPinjam = currentDate
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-")

      const waktuPinjam = currentDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })

      const newBorrowing = {
        no: Date.now(), // Menggunakan timestamp sebagai ID unik
        judul: bookData.judul,
        tanggalPinjam,
        waktuPinjam,
        penulis: bookData.penulis,
        penerbit: bookData.penerbit,
        tahun: bookData.tahun,
      }

      // Ambil data existing dari localStorage
      const existingData = localStorage.getItem("pendingBorrowings")
      const pendingBorrowings = existingData ? JSON.parse(existingData) : []

      // Tambahkan data baru
      pendingBorrowings.push(newBorrowing)

      // Simpan kembali ke localStorage
      localStorage.setItem("pendingBorrowings", JSON.stringify(pendingBorrowings))
    }

    // Redirect ke halaman konfirmasi setelah delay singkat
    setTimeout(() => {
      router.push("/anggota/konfirmasi")
    }, 1500)

    // Panggil callback jika ada
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-[#0E4D97] hover:bg-[#0A3A6F] text-white text-sm px-5 py-1 rounded-md shadow transition-colors duration-200"
          onClick={() => setOpen(true)}
        >
          Pinjam
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-6 border border-gray-200 shadow-lg rounded-lg">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-[#0E4D97] font-semibold text-lg leading-relaxed">
            Apakah kamu yakin
            <br />
            untuk meminjam?
          </AlertDialogTitle>
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
