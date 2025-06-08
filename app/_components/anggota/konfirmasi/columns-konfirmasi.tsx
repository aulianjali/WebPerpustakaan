"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"

export type DataBerhasil = {
  no: number
  judul: string
  tanggalKonfirm: string
  waktuKonfirm: string
}

export type DataMenunggu = {
  no: number
  judul: string
  tanggalPinjam: string
  waktuPinjam: string
}

export const columnsBerhasil: ColumnDef<DataBerhasil>[] = [
  {
    accessorKey: "no",
    header: () => <div className="pl-4">No</div>,
    cell: ({ row }) => {
      return <div className="text-black pl-6">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalKonfirm",
    header: "Tanggal Konfirm",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("tanggalKonfirm")}</div>
    },
  },
  {
    accessorKey: "waktuKonfirm",
    header: "Waktu Konfirm",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("waktuKonfirm")}</div>
    },
  },
]

export const createColumnsMenunggu = (onDelete: (id: number) => void): ColumnDef<DataMenunggu>[] => [
  {
    accessorKey: "no",
    header: () => <div className="pl-4">No</div>,
    cell: ({ row }) => {
      return <div className="text-black pl-6">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("tanggalPinjam")}</div>
    },
  },
  {
    accessorKey: "waktuPinjam",
    header: "Waktu Pinjam",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("waktuPinjam")}</div>
    },
  },
  {
    id: "aksi",
    header: () => <div className="pl-6">Aksi</div>,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      const rowId = row.original.no
      const judul = row.getValue("judul") as string

      const handleConfirm = () => {
        // Tampilkan sonner toast untuk konfirmasi hapus
        toast.success("Data berhasil dihapus!", {
          description: `"${judul}" telah dihapus dari daftar peminjaman.`,
          duration: 3000,
        })

        onDelete(rowId)
        setOpen(false)
      }

      return (
        <div className="text-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-3 text-xs border-none text-red-500 hover:text-red-600 hover:bg-red-50 shadow-none flex items-center gap-1"
                onClick={() => setOpen(true)}
              >
                <Trash2 className="h-3 w-3" />
                Hapus
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
        </div>
      )
    },
  },
]

export const columnsMenunggu: ColumnDef<DataMenunggu>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("tanggalPinjam")}</div>
    },
  },
  {
    accessorKey: "waktuPinjam",
    header: "Waktu Pinjam",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("waktuPinjam")}</div>
    },
  },
]
