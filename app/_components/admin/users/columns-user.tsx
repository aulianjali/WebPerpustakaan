"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Key, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Datamember = {
  id: number
  name: string
  email: string
  role?: "member"
}

export type DataPustakawan = {
  id: number
  name: string
  email: string
  role?: "pustakawan"
}

export const columnsmember = (
  onEdit?: (id: number) => void,
  onDelete?: (id: number) => void,
  onDetail?: (user: Datamember) => void,
): ColumnDef<Datamember>[] => [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID User</div>,
    cell: ({ row }) => {
      return <div className="text-black pl-8">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="pl-2">Nama</div>,
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("email")}</div>
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const member = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDetail?.(member)}
              className="text-[#0E4D97] hover:bg-[#E8F1FB]"
            >
              <Key className="mr-2 h-4 w-4 text-[#0E4D97]" />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit?.(member.id)}
              className="text-[#F4B400] hover:bg-[#FFF8E1]"
            >
              <Edit className="mr-2 h-4 w-4 text-[#F4B400]" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(member.id)}
              className="text-[#D32F2F] hover:bg-[#FFEBEE]"
            >
              <Trash2 className="mr-2 h-4 w-4 text-[#D32F2F]" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const columnsPustakawan = (
  onEdit?: (id: number) => void,
  onDelete?: (id: number) => void,
  onDetail?: (user: DataPustakawan) => void,
): ColumnDef<DataPustakawan>[] => [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID User</div>,
    cell: ({ row }) => {
      return <div className="text-black pl-8">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="pl-2">Nama</div>,
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-black">{row.getValue("email")}</div>
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const pustakawan = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDetail?.(pustakawan)}
              className="text-[#0E4D97] hover:bg-[#E8F1FB]  focus:text-[#0E4D97]"
            >
              <Key className="mr-2 h-4 w-4 text-[#0E4D97]" />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit?.(pustakawan.id)}
              className="text-[#F4B400] hover:bg-[#FFF8E1] hover:text-[#F4B400]"
            >
              <Edit className="mr-2 h-4 w-4 text-[#F4B400]" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(pustakawan.id)}
              className="text-[#D32F2F] hover:bg-[#FFEBEE] focus:text-[#D32F2F]"
            >
              <Trash2 className="mr-2 h-4 w-4 text-[#D32F2F]" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
