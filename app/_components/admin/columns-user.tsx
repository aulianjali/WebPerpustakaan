"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type DataAnggota = {
  no: number
  idPerpus: string
  nama: string
  gmail: string
  nomorTelepon: string
  alamat: string
}

export type DataPustakawan = {
  no: number
  idPerpus: string
  nama: string
  gmail: string
  nomorTelepon: string
  alamat: string
}

export const columnsAnggota = (
  onEdit?: (id: number) => void,
  onDelete?: (id: number) => void,
): ColumnDef<DataAnggota>[] => [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("no")}</div>
    },
  },
  {
    accessorKey: "idPerpus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          ID Perpus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("idPerpus")}</div>
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("nama")}</div>
    },
  },
  {
    accessorKey: "gmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("gmail")}</div>
    },
  },
  {
    accessorKey: "nomorTelepon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          No. Telepon
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("nomorTelepon")}</div>
    },
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Alamat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm max-w-xs truncate">{row.getValue("alamat")}</div>
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(user.no)}
            className="h-8 px-3 text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(user.no)}
            className="h-8 px-3 text-xs border-red-300 text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Hapus
          </Button>
        </div>
      )
    },
  },
]

export const columnsPustakawan = (
  onEdit?: (id: number) => void,
  onDelete?: (id: number) => void,
): ColumnDef<DataPustakawan>[] => [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("no")}</div>
    },
  },
  {
    accessorKey: "idPerpus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          ID Perpus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("idPerpus")}</div>
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("nama")}</div>
    },
  },
  {
    accessorKey: "gmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("gmail")}</div>
    },
  },
  {
    accessorKey: "nomorTelepon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          No. Telepon
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("nomorTelepon")}</div>
    },
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Alamat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm max-w-xs truncate">{row.getValue("alamat")}</div>
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(user.no)}
            className="h-8 px-3 text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(user.no)}
            className="h-8 px-3 text-xs border-red-300 text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Hapus
          </Button>
        </div>
      )
    },
  },
]
