"use client"

import type { ColumnDef } from "@tanstack/react-table"

export type DataRiwayat = {
  no: number
  judul: string
  tanggalPinjam: string
  tanggalKembali: string
  status: "Terlambat" | "Tidak Terlambat"
}

export type DataDipinjam = {
  no: number
  judul: string
  tanggalPinjam: string
  deadlineKembali: string
}

export const columnsRiwayat: ColumnDef<DataRiwayat>[] = [
  {
    accessorKey: "no",
    header: () => <div className="pl-4">No</div>,
    cell: ({ row }) => (
      <div className="text-black pl-6">{row.getValue("no")}</div>
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("judul")}</div>
    ),
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("tanggalPinjam")}</div>
    ),
  },
  {
    accessorKey: "tanggalKembali",
    header: "Tanggal Kembali",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("tanggalKembali")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="text-black">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              status === "Terlambat" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>
        </div>
      )
    },
  },
]

export const createColumnsDipinjam = (onReturn?: (id: number) => void): ColumnDef<DataDipinjam>[] => [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => (
      <div className="text-black pl-6">{row.getValue("no")}</div>
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("judul")}</div>
    ),
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("tanggalPinjam")}</div>
    ),
  },
  {
    accessorKey: "deadlineKembali",
    header: "Deadline Kembali",
    cell: ({ row }) => (
      <div className="text-black">{row.getValue("deadlineKembali")}</div>
    ),
  },
]

export const columnsDipinjam: ColumnDef<DataDipinjam>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("no")}</div>
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => (
      <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>
    ),
  },
  {
    accessorKey: "tanggalPinjam",
    header: "Tanggal Pinjam",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("tanggalPinjam")}</div>
    ),
  },
  {
    accessorKey: "deadlineKembali",
    header: "Deadline Kembali",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("deadlineKembali")}</div>
    ),
  },
]
