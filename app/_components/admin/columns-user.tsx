"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"
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
    accessorKey: "idPerpus",
    header: () => <div className="pl-4">ID Perpus</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-black pl-4">{row.getValue("idPerpus")}</div>
    },
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("nama")}</div>
    },
  },
  {
    accessorKey: "gmail",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("gmail")}</div>
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
            className="h-8 text-xs border-none shadow-none"
          >
            <Edit className="h-3 w-3" />
            
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(user.no)}
            className="h-8 text-xs border-none text-red-500 hover:text-red-600 shadow-none"
          >
            <Trash2 className="h-3 w-3" />
          
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
    accessorKey: "idPerpus",
    header: () => <div className="pl-4">ID Perpus</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-black pl-4">{row.getValue("idPerpus")}</div>
    },
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("nama")}</div>
    },
  },
  {
    accessorKey: "gmail",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("gmail")}</div>
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
            className="h-8 text-xs border-none shadow-none"
          >
            <Edit className="h-3 w-3 mr-1" />
           
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(user.no)}
            className="h-8 text-xs border-none text-red-500 hover:text-red-600 shadow-none"
          >
            <Trash2 className="h-3 w-3 mr-1" />
          </Button>
        </div>
      )
    },
  },
]
