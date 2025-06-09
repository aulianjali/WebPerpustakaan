"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Check, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"

export type DataMenunggu = {
  no: number
  judul: string
  peminjam: string
  tanggalPinjam: string
  waktuPinjam: string
}

export type DataDipinjam = {
  no: number
  judul: string
  peminjam: string
  sisaWaktu: string
}

export type DataPengembalian = {
  no: number
  judul: string
  peminjam: string
  tanggalKembali: string
  waktuKembali: string
}

function handleKonfirmasi(data: any) {
  console.log("Konfirmasi:", data)

  // Tampilkan toast sukses dengan format yang diminta
  toast.success(`${data.peminjam} berhasil meminjam buku ${data.judul}`)

  // Tambahkan aksi lain seperti fetch/axios untuk update status
}

function handleKonfirmasiPengembalian(data: any) {
  console.log("Konfirmasi Pengembalian:", data)

  // Tampilkan toast sukses untuk pengembalian
  toast.success(`${data.peminjam} berhasil melakukan pengembalian buku ${data.judul}`)

  // Tambahkan aksi lain seperti fetch/axios untuk update status
}

export const columnsMenunggu: ColumnDef<DataMenunggu>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div className="text-center">{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => <div className="text-center">{row.getValue("tanggalPinjam")}</div>,
  },
  {
    accessorKey: "waktuPinjam",
    header: "Waktu Pinjam",
    cell: ({ row }) => <div className="text-center">{row.getValue("waktuPinjam")}</div>,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-green-600 hover:bg-green-100 p-2 rounded-full" title="Konfirmasi">
              <Check className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 p-0">
            {/* Icon Section */}
            <div className="flex justify-center pt-8 pb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-6 text-center">
              <AlertDialogTitle className="text-xl font-semibold text-gray-900 mb-3">
                Apakah kamu yakin untuk mengonfirmasi peminjaman "{data.judul}"?
              </AlertDialogTitle>
              <p className="text-gray-600 text-sm leading-relaxed">
                Peminjaman oleh <span className="font-medium">{data.peminjam}</span> akan dikonfirmasi dan status buku
                akan berubah menjadi dipinjam.
              </p>
            </div>

            {/* Button Section */}
            <AlertDialogFooter className="flex gap-3 p-6 pt-0 border-0">
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg font-medium"
                >
                  Tidak
                </Button>
              </AlertDialogTrigger>
              <Button
                onClick={() => handleKonfirmasi(data)}
                className="flex-1 h-11 bg-green-500 hover:bg-green-600 text-white border-0 rounded-lg font-medium"
              >
                Iya
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    },
  },
]

export const columnsDipinjam: ColumnDef<DataDipinjam>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div className="text-center">{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "sisaWaktu",
    header: "Sisa Waktu",
    cell: ({ row }) => <div className="text-center">{row.getValue("sisaWaktu")}</div>,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-green-600 hover:bg-green-100 p-2 rounded-full"
              title="Konfirmasi Pengembalian"
            >
              <Check className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 p-0">
            {/* Icon Section */}
            <div className="flex justify-center pt-8 pb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-6 text-center">
              <AlertDialogTitle className="text-xl font-semibold text-gray-900 mb-3">
                Apakah kamu yakin untuk mengonfirmasi pengembalian "{data.judul}"?
              </AlertDialogTitle>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pengembalian oleh <span className="font-medium">{data.peminjam}</span> akan dikonfirmasi dan buku akan
                tersedia kembali untuk dipinjam.
              </p>
            </div>

            {/* Button Section */}
            <AlertDialogFooter className="flex gap-3 p-6 pt-0 border-0">
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg font-medium"
                >
                  Tidak
                </Button>
              </AlertDialogTrigger>
              <Button
                onClick={() => handleKonfirmasiPengembalian(data)}
                className="flex-1 h-11 bg-green-500 hover:bg-green-600 text-white border-0 rounded-lg font-medium"
              >
                Iya
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    },
  },
]

export const columnsPengembalian: ColumnDef<DataPengembalian>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div className="text-center">{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "tanggalKembali",
    header: "Tanggal Kembali",
    cell: ({ row }) => <div className="text-center">{row.getValue("tanggalKembali")}</div>,
  },
  {
    accessorKey: "waktuKembali",
    header: "Waktu Kembali",
    cell: ({ row }) => <div className="text-center">{row.getValue("waktuKembali")}</div>,
  },
]
