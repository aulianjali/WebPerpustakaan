"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableBuku } from "@/app/_components/pustakawan/buku/data-table-buku"
import { AddBukuDialog } from "@/app/_components/pustakawan/buku/add-buku-dialog"
import { EditBukuDialog } from "@/app/_components/pustakawan/buku/edit-buku-dialog"
import { DeleteBukuDialog } from "@/app/_components/pustakawan/buku/delete-buku-dialog"
import { columnsBuku, type DataBuku } from "@/app/_components/pustakawan/buku/columns-buku"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import axios from "axios"
import Cookies from "js-cookie"

export default function ClientManajemenBuku() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBuku, setSelectedBuku] = useState<DataBuku | null>(null)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const [dataBuku, setDataBuku] = useState<DataBuku[]>([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
  const token = Cookies.get("token")
  if (!token) {
    setIsLoading(false)
    return
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    console.log("RESPON BUKU:", response.data)

    const fetchedBooks = response.data.data.data.map((book: any, index: number) => ({
      no: index + 1,
      idBuku: `${String(book.id)}`,
      judulBuku: book.judul,
      penulis: book.penulis,
      stok: book.stock,
      penerbit: book.penerbit || "",
      tahunTerbit: book.tahun_terbit || "",
      sinopsis: book.sinopsis || "",
      imageCover: book.image || "/placeholder.svg"
    }))

    setDataBuku(fetchedBooks)
  } catch (error: any) {
    console.error("Gagal memuat data buku:", error.response?.data || error.message)
  } finally {
    setIsLoading(false)
  }
}


  const handleAddBuku = (bukuData: Omit<DataBuku, "no">) => {
    const newBuku: DataBuku = {
      ...bukuData,
      no: Math.max(...dataBuku.map((b) => b.no), 0) + 1
    }
    setDataBuku((prev) => [...prev, newBuku])
  }

  const handleEdit = (buku: DataBuku) => {
    setSelectedBuku(buku)
    setIsEditDialogOpen(true)
  }

  const handleUpdateBuku = (updatedBuku: DataBuku) => {
    setDataBuku((prev) => prev.map((buku) => (buku.no === updatedBuku.no ? updatedBuku : buku)))
  }

  const handleDelete = (buku: DataBuku) => {
    setSelectedBuku(buku)
    setIsDeleteDialogOpen(true)
  }

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
      item.penulis.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#D9DBF3] text-[#0E4D97]">
      <main className="flex-1 p-6">
        <div className="mb-2">
          <DynamicBreadcrumb />
        </div>

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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">Loading...</div>
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
                    placeholder="Cari berdasarkan judul, ID, penulis..."
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
