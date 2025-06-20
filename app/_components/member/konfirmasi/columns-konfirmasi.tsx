"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { BatalPinjamAlert } from "@/app/_components/member/alert-dialog"

export type DataBerhasil = {
  no: number
  judul: string
  tanggalKonfirm: string
  waktuKonfirm: string
}

export type DataMenunggu = {
  no: number
  id: number // id_peminjaman dari API
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
      const rowData = row.original
      const judul = row.getValue("judul") as string

      const handleSuccess = () => {
        onDelete(rowData.id)
      }

      return (
        <div className="text-center">
          <BatalPinjamAlert judul={judul} idPeminjaman={rowData.id} onSuccess={handleSuccess} />
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
