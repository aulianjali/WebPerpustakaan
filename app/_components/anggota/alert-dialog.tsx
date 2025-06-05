"use client"

import { useState } from "react"
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

// Tombol Pinjam dengan Alert
export function PinjamAlert({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false)

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
