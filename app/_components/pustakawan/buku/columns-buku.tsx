"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export type DataBuku = {
  no: number
  id: number
  stock: number
  stock_awal: number
  judul: string
  penulis: string
  penerbit: string
  tahun_terbit: string
  kategori: string
  sinopsis: string
  image: string
}

export const columnsBuku = (
  onEdit?: (buku: DataBuku) => void,
  onDelete?: (buku: DataBuku) => void,
): ColumnDef<DataBuku>[] => [
  {
    accessorKey: "id",
    header: () => <div className="pl-4">ID Buku</div>,
    cell: ({ row }) => {
      return <div className="pl-8 text-black">{row.getValue("id")}</div>
    },
  },
  {
  id: "stock",
  header: () => <div className="pl-5">Stok</div>,
  cell: ({ row }) => {
    const stock = row.original.stock
    const stockAwal = row.original.stock_awal ?? stock // fallback kalau null
    const ratio = stockAwal === 0 ? 0 : stock / stockAwal

    let badgeColor = "bg-red-100 text-red-700"
    if (stock === stockAwal) {
      badgeColor = "bg-green-100 text-green-700" // penuh
    } else if (stock > 0) {
      badgeColor = "bg-yellow-100 text-yellow-700" // sisa sedikit
    } // stock === 0 tetap merah

    return (
      <div className="pl-4 pr-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {stock} / {stockAwal}
        </span>
      </div>
    )
  },
},

  {
    accessorKey: "judul",
    header: "Judul Buku",
    cell: ({ row }) => <div className="text-black">{row.getValue("judul")}</div>,
  },
  {
    accessorKey: "penulis",
    header: "Penulis",
    cell: ({ row }) => <div className="text-black">{row.getValue("penulis")}</div>,
  },
  
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const buku = row.original
      const router = useRouter()

      const handleDetail = () => {
        router.push(`/pustakawan/detail-buku/${buku.id}`)
      }

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
              onClick={handleDetail}
              className="text-[#0E4D97] hover:bg-[#E8F1FB] focus:text-[#0E4D97]"
            >
              <Eye className="mr-2 h-4 w-4 text-[#0E4D97]" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit?.(buku)}
              className="text-[#F4B400] hover:bg-[#FFF8E1] focus:text-[#F4B400]"
            >
              <Edit className="mr-2 h-4 w-4 text-[#F4B400]" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(buku)}
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
