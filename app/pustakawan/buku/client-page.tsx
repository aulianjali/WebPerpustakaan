"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableBuku } from "@/app/_components/pustakawan/buku/data-table-buku"
import { AddBukuDialog } from "@/app/_components/pustakawan/buku/add-buku-dialog"
import { EditBukuDialog } from "@/app/_components/pustakawan/buku/edit-buku-dialog"
import { DeleteBukuDialog } from "@/app/_components/pustakawan/buku/delete-buku-dialog"
import { columnsBuku, type DataBuku } from "@/app/_components/pustakawan/buku/columns-buku"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"


export default function ClientManajemenBuku() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBuku, setSelectedBuku] = useState<DataBuku | null>(null)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  // State untuk data yang bisa diubah
  const [dataBuku, setDataBuku] = useState<DataBuku[]>([
    {
      no: 1,
      idBuku: "BK001",
      stok: 5,
      judulBuku: "The Psychology of Money",
      penulis: "Morgan Housel",
      penerbit: "Harriman House",
      tahunTerbit: "2020",
      sinopsis: "Buku tentang psikologi keuangan dan investasi yang mengubah cara pandang tentang uang.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 2,
      idBuku: "BK002",
      stok: 3,
      judulBuku: "Laut Bercerita",
      penulis: "Leila S. Chudori",
      penerbit: "Kepustakaan Populer Gramedia",
      tahunTerbit: "2017",
      sinopsis: "Novel tentang kisah mahasiswa aktivis yang hilang pada masa Orde Baru.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 3,
      idBuku: "BK003",
      stok: 7,
      judulBuku: "Hujan",
      penulis: "Tere Liye",
      penerbit: "Gramedia Pustaka Utama",
      tahunTerbit: "2016",
      sinopsis: "Novel fantasi tentang petualangan di dunia paralel yang penuh misteri.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 4,
      idBuku: "BK004",
      stok: 2,
      judulBuku: "Filosofi Teras",
      penulis: "Henry Manampiring",
      penerbit: "Kompas Gramedia",
      tahunTerbit: "2018",
      sinopsis: "Panduan praktis filosofi Stoikisme untuk kehidupan sehari-hari.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 5,
      idBuku: "BK005",
      stok: 4,
      judulBuku: "Dunia Sophie",
      penulis: "Jostein Gaarder",
      penerbit: "Mizan",
      tahunTerbit: "2015",
      sinopsis: "Novel filosofi yang mengajarkan sejarah pemikiran filosofis dengan cara yang menarik.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 6,
      idBuku: "BK006",
      stok: 0,
      judulBuku: "Emotional Intelligence",
      penulis: "Daniel Goleman",
      penerbit: "Bantam Books",
      tahunTerbit: "1995",
      sinopsis: "Buku tentang pentingnya kecerdasan emosional dalam kehidupan dan karir.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 7,
      idBuku: "BK007",
      stok: 0,
      judulBuku: "Atomic Habits",
      penulis: "James Clear",
      penerbit: "Avery",
      tahunTerbit: "2018",
      sinopsis: "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
  ])

  // Simulasi loading saat halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Loading selama 1.2 detik

    return () => clearTimeout(timer)
  }, [])

  // Fungsi untuk menambah buku baru
  const handleAddBuku = (bukuData: Omit<DataBuku, "no">) => {
    const newBuku: DataBuku = {
      ...bukuData,
      no: Math.max(...dataBuku.map((b) => b.no)) + 1,
    }
    setDataBuku((prev) => [...prev, newBuku])
  }

  // Fungsi untuk edit buku
  const handleEdit = (buku: DataBuku) => {
    setSelectedBuku(buku)
    setIsEditDialogOpen(true)
  }

  // Fungsi untuk update buku setelah edit
  const handleUpdateBuku = (updatedBuku: DataBuku) => {
    setDataBuku((prev) => prev.map((buku) => (buku.no === updatedBuku.no ? updatedBuku : buku)))
  }

  // Fungsi untuk hapus buku
  const handleDelete = (buku: DataBuku) => {
    setSelectedBuku(buku)
    setIsDeleteDialogOpen(true)
  }

  // Fungsi untuk konfirmasi hapus buku
  const handleConfirmDelete = () => {
    if (selectedBuku) {
      setDataBuku((prev) => prev.filter((buku) => buku.no !== selectedBuku.no))
      setSelectedBuku(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredData = dataBuku.filter(
    (item) =>
      item.judulBuku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.idBuku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.penulis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.penerbit.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Skeleton untuk tabel
  const TableSkeleton = () => (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>

      {/* Search and button skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      {/* Table skeleton */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#D9DBF3] text-[#0E4D97]">
      <main className="flex-1 p-6">

        <div className="mb-2">
          <DynamicBreadcrumb />
        </div>

        {/* Header */}
        <div className="mb-6">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Manajemen Buku</h1>
              <p className="text-gray-600 text-sm mt-2">Kelola koleksi buku perpustakaan</p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#0E4D97]">Data Buku</h2>
                  <p className="text-sm text-gray-600 mt-1">Kelola data buku perpustakaan</p>
                </div>
               
              </div>

              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari berdasarkan judul, ID, penulis, atau penerbit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </div>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-[#0E4D97] hover:bg-[#0E4D97]/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Buku
                </Button>
              </div>

              <DataTableBuku
                columns={columnsBuku(handleEdit, handleDelete)}
                data={filteredData.slice((page - 1) * perPage, page * perPage)}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                total={filteredData.length}
              />
            </div>
          )}
        </div>

        {/* Dialogs */}
        <AddBukuDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSubmit={handleAddBuku} />

        <EditBukuDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedBuku(null)
          }}
          onSubmit={handleUpdateBuku}
          bukuData={selectedBuku}
        />

        <DeleteBukuDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false)
            setSelectedBuku(null)
          }}
          onConfirm={handleConfirmDelete}
          bukuData={selectedBuku}
        />
      </main>
    </div>
  )
}
