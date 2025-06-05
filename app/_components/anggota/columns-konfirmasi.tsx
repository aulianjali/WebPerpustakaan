"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
    accessorKey: "judul",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Judul
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalKonfirm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Tanggal Konfirm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("tanggalKonfirm")}</div>
    },
  },
  {
    accessorKey: "waktuKonfirm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Waktu Konfirm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("waktuKonfirm")}</div>
    },
  },
]

export const createColumnsMenunggu = (onDelete: (id: number) => void): ColumnDef<DataMenunggu>[] => [
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
    accessorKey: "judul",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Judul
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalPinjam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Tanggal Pinjam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("tanggalPinjam")}</div>
    },
  },
  {
    accessorKey: "waktuPinjam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Waktu Pinjam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("waktuPinjam")}</div>
    },
  },
  {
    id: "aksi",
    header: () => <div className="text-center font-semibold">Aksi</div>,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      const rowId = row.original.no
      const judul = row.getValue("judul") as string

      return (
        <div className="text-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Hapus</span>
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
                  onClick={() => {
                    onDelete(rowId)
                    setOpen(false)
                  }}
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
    accessorKey: "judul",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Judul
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-[#0E4D97]">{row.getValue("judul")}</div>
    },
  },
  {
    accessorKey: "tanggalPinjam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Tanggal Pinjam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("tanggalPinjam")}</div>
    },
  },
  {
    accessorKey: "waktuPinjam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Waktu Pinjam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("waktuPinjam")}</div>
    },
  },
]
