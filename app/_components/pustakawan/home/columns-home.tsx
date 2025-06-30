"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"
import { ConfirmPeminjamanDialog } from "./confirm-peminjaman-dialog"
import { ConfirmPengembalianDialog } from "./confirm-pengembalian-dialog"

export type DataMenunggu = {
  id: number
  no: number
  judul: string
  peminjam: string
  tanggalPesan: string
  waktuPesan: string
}

export type DataDipinjam = {
  id: number
  no: number
  judul: string
  peminjam: string
  sisaWaktu: string
}

export type DataPengembalian = {
  id: number
  no: number
  judul: string
  peminjam: string
  tanggalKembali: string
  waktuKembali: string
  status: "Terlambat" | "Tidak Terlambat"
}


function ActionCellMenunggu({
  data,
  onRefresh,
}: {
  data: DataMenunggu
  onRefresh?: () => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirm = () => {
    // toast.success("Peminjaman berhasil dikonfirmasi")
    onRefresh?.()
  }

  return (
    <>
      <Button
        variant="ghost"
        className="text-green-600 hover:bg-green-100 p-2 rounded-full"
        title="Konfirmasi"
        onClick={() => setIsDialogOpen(true)}
      >
        <Check className="w-4 h-4" />
      </Button>
      <ConfirmPeminjamanDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirmedAndRefresh={handleConfirm}
        peminjamanData={{
          id: data.id,
          judul: data.judul,
          peminjam: data.peminjam,
        }}
      />
    </>
  )
}


function ActionCellDipinjam({
  data,
  onRefresh,
}: {
  data: DataDipinjam
  onRefresh?: () => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirm = () => {
    // toast.success("Pengembalian berhasil dikonfirmasi")
    onRefresh?.()
  }

  return (
    <>
      <Button
        variant="ghost"
        className="text-green-600 hover:bg-green-100 p-2 rounded-full"
        title="Konfirmasi Pengembalian"
        onClick={() => setIsDialogOpen(true)}
      >
        <Check className="w-4 h-4" />
      </Button>
      <ConfirmPengembalianDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirmedAndRefresh={handleConfirm}
        pengembalianData={{ id: data.id, judul: data.judul, peminjam: data.peminjam }}
      />
    </>
  )
}

// ===================================================
// FUNGSI columnsMenunggu dan columnsDipinjam menerima onRefresh
// ===================================================
export const columnsMenunggu = (onRefresh?: () => void): ColumnDef<DataMenunggu>[] => [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID Peminjaman</div>,
    cell: ({ row }) => <div className="pl-10">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div>{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div>{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "tanggalPesan",
    header: "Tanggal Pesan",
    cell: ({ row }) => <div>{row.getValue("tanggalPesan") || "-"}</div>,
  },
  {
    accessorKey: "waktuPesan",
    header: "Waktu Pesan",
    cell: ({ row }) => <div>{row.getValue("waktuPesan") || "-"}</div>,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => <ActionCellMenunggu data={row.original} onRefresh={onRefresh} />,
  },
]

export const columnsDipinjam = (onRefresh?: () => void): ColumnDef<DataDipinjam>[] => [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID Peminjaman</div>,
    cell: ({ row }) => <div className="pl-10">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div>{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div>{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "sisaWaktu",
    header: "Sisa Waktu",
    cell: ({ row }) => {
      const sisaWaktu = row.getValue("sisaWaktu") as string
      const isOverdue = /^\s*-\d+/.test(sisaWaktu) || sisaWaktu.toLowerCase().includes("lewat")
      const isToday = sisaWaktu.includes("0 hari") || sisaWaktu.toLowerCase().includes("hari ini")
      const isNearDeadline = !isOverdue && !isToday && sisaWaktu.match(/^[12]\s+hari/)
      let badgeClass = ""
      if (isOverdue || isToday) badgeClass = "bg-red-100 text-red-700 border border-red-200"
      else if (isNearDeadline) badgeClass = "bg-yellow-100 text-yellow-700 border border-yellow-200"
      else badgeClass = "bg-green-100 text-green-700 border border-green-200"
      return (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeClass}`}>
          {sisaWaktu}
        </span>
      )
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => <ActionCellDipinjam data={row.original} onRefresh={onRefresh} />,
  },
]


export const columnsPengembalian: ColumnDef<DataPengembalian>[] = [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID Peminjaman</div>,
    cell: ({ row }) => <div className="pl-10">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => <div>{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "peminjam",
    header: "Peminjam",
    cell: ({ row }) => <div>{row.getValue("peminjam")}</div>,
  },
  {
    accessorKey: "tanggalKembali",
    header: "Tanggal Kembali",
    cell: ({ row }) => <div>{row.getValue("tanggalKembali")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const style =
        status === "Terlambat"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      return (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${style}`}>
          {status}
        </span>
      )
    },
  },
]
