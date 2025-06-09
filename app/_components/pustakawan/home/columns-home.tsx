"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Check } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

export type DataMenunggu = {
  no: number;
  judul: string;
  peminjam: string;
  tanggalPinjam: string;
  waktuPinjam: string;
}

export type DataDipinjam = {
  no: number;
  judul: string;
  peminjam: string;
  sisaWaktu: string;
}

export type DataPengembalian = {
  no: number;
  judul: string;
  peminjam: string;
  tanggalKembali: string;
  waktuKembali: string;
}

function handleKonfirmasi(data: any) {
  console.log("Konfirmasi:", data)
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
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Peminjaman</AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              Apakah kamu yakin ingin mengonfirmasi peminjaman <b>{data.judul}</b> oleh <b>{data.peminjam}</b>?
            </div>
            <AlertDialogFooter>
              <Button variant="outline">Batal</Button>
              <Button onClick={() => handleKonfirmasi(data)}>Konfirmasi</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
  }
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
            <Button variant="ghost" className="text-green-600 hover:bg-green-100 p-2 rounded-full" title="Konfirmasi Pengembalian">
              <Check className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Status</AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              Konfirmasi bahwa buku <b>{data.judul}</b> masih dipinjam oleh <b>{data.peminjam}</b>?
            </div>
            <AlertDialogFooter>
              <Button variant="outline">Batal</Button>
              <Button onClick={() => handleKonfirmasi(data)}>Konfirmasi</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
  }
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
