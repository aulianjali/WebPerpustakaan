"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export type DataBuku = {
  no: number
  idBuku: string
  stok: number
  judulBuku: string
  penulis: string
  penerbit: string
  tahunTerbit: string
  sinopsis: string
  imageCover: string
}

export const columnsBuku = (
  onEdit?: (id: number) => void,
  onDelete?: (id: number) => void,
  onImagePreview?: (imageUrl: string) => void,
): ColumnDef<DataBuku>[] => [
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
    accessorKey: "idBuku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          ID Buku
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("idBuku")}</div>
    },
  },
  {
    accessorKey: "stok",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const stok = row.getValue("stok") as number
      return (
        <div className="text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              stok > 5
                ? "bg-green-100 text-green-700"
                : stok > 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {stok}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "judulBuku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Judul Buku
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium max-w-xs truncate">{row.getValue("judulBuku")}</div>
    },
  },
  {
    accessorKey: "penulis",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Penulis
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm max-w-xs truncate">{row.getValue("penulis")}</div>
    },
  },
  {
    accessorKey: "penerbit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Penerbit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-sm max-w-xs truncate">{row.getValue("penerbit")}</div>
    },
  },
  {
    accessorKey: "tahunTerbit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Tahun
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center text-sm">{row.getValue("tahunTerbit")}</div>
    },
  },
  {
    accessorKey: "imageCover",
    header: "Cover",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageCover") as string
      return (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onImagePreview?.(imageUrl)}
            className="h-7 px-2 text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const buku = row.original
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(buku.no)}
            className="h-8 px-3 text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(buku.no)}
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
