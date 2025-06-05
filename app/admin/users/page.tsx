"use client"

import { useState, useEffect } from "react"
import { Search, ChevronRight, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableUsers } from "@/app/_components/admin/data-table-user"
import { AddUserDialog } from "@/app/_components/admin/add-user-dialog"
import { EditUserDialog } from "@/app/_components/admin/edit-user-dialog"
import { DeleteUserDialog } from "@/app/_components/admin/delete-user-dialog"
import {
  columnsAnggota,
  columnsPustakawan,
  type DataAnggota,
  type DataPustakawan,
} from "@/app/_components/admin/columns-user"

export default function ManajemenUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"anggota" | "pustakawan">("anggota")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<DataAnggota | DataPustakawan | null>(null)

  const [pagination, setPagination] = useState({
    anggota: { page: 1, perPage: 5 },
    pustakawan: { page: 1, perPage: 5 },
  })

  // State untuk data yang bisa diubah
  const [dataAnggota, setDataAnggota] = useState<DataAnggota[]>([
    {
      no: 1,
      idPerpus: "A001",
      nama: "Ahmad Rizki",
      gmail: "ahmad.rizki@gmail.com",
      nomorTelepon: "081234567890",
      alamat: "Jl. Merdeka No. 123, Jakarta",
    },
    {
      no: 2,
      idPerpus: "A002",
      nama: "Siti Nurhaliza",
      gmail: "siti.nurhaliza@gmail.com",
      nomorTelepon: "081234567891",
      alamat: "Jl. Sudirman No. 456, Bandung",
    },
    {
      no: 3,
      idPerpus: "A003",
      nama: "Budi Santoso",
      gmail: "budi.santoso@gmail.com",
      nomorTelepon: "081234567892",
      alamat: "Jl. Gatot Subroto No. 789, Surabaya",
    },
    {
      no: 4,
      idPerpus: "A004",
      nama: "Maya Sari",
      gmail: "maya.sari@gmail.com",
      nomorTelepon: "081234567893",
      alamat: "Jl. Diponegoro No. 321, Yogyakarta",
    },
    {
      no: 5,
      idPerpus: "A005",
      nama: "Dedi Kurniawan",
      gmail: "dedi.kurniawan@gmail.com",
      nomorTelepon: "081234567894",
      alamat: "Jl. Ahmad Yani No. 654, Medan",
    },
  ])

  const [dataPustakawan, setDataPustakawan] = useState<DataPustakawan[]>([
    {
      no: 1,
      idPerpus: "P001",
      nama: "Dr. Indira Sari",
      gmail: "indira.sari@perpus.ac.id",
      nomorTelepon: "081234567895",
      alamat: "Jl. Pendidikan No. 111, Jakarta",
    },
    {
      no: 2,
      idPerpus: "P002",
      nama: "Prof. Bambang Wijaya",
      gmail: "bambang.wijaya@perpus.ac.id",
      nomorTelepon: "081234567896",
      alamat: "Jl. Ilmu No. 222, Bandung",
    },
  ])

  // Simulasi loading saat halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Loading selama 1.2 detik

    return () => clearTimeout(timer)
  }, [])

  // Fungsi untuk menambah user baru
  const handleAddUser = (userData: Omit<DataAnggota | DataPustakawan, "no">) => {
    if (activeTab === "anggota") {
      const newUser: DataAnggota = {
        ...userData,
        no: Math.max(...dataAnggota.map((u) => u.no)) + 1,
      } as DataAnggota
      setDataAnggota((prev) => [...prev, newUser])
    } else {
      const newUser: DataPustakawan = {
        ...userData,
        no: Math.max(...dataPustakawan.map((u) => u.no)) + 1,
      } as DataPustakawan
      setDataPustakawan((prev) => [...prev, newUser])
    }
  }

  // Fungsi untuk edit user
  const handleEdit = (id: number) => {
    let user: DataAnggota | DataPustakawan | undefined

    if (activeTab === "anggota") {
      user = dataAnggota.find((u) => u.no === id)
    } else {
      user = dataPustakawan.find((u) => u.no === id)
    }

    if (user) {
      setSelectedUser(user)
      setIsEditDialogOpen(true)
    }
  }

  // Fungsi untuk update user setelah edit
  const handleUpdateUser = (updatedUser: DataAnggota | DataPustakawan) => {
    if (activeTab === "anggota") {
      setDataAnggota((prev) => prev.map((user) => (user.no === updatedUser.no ? (updatedUser as DataAnggota) : user)))
    } else {
      setDataPustakawan((prev) =>
        prev.map((user) => (user.no === updatedUser.no ? (updatedUser as DataPustakawan) : user)),
      )
    }
  }

  // Fungsi untuk hapus user
  const handleDelete = (id: number) => {
    let user: DataAnggota | DataPustakawan | undefined

    if (activeTab === "anggota") {
      user = dataAnggota.find((u) => u.no === id)
    } else {
      user = dataPustakawan.find((u) => u.no === id)
    }

    if (user) {
      setSelectedUser(user)
      setIsDeleteDialogOpen(true)
    }
  }

  // Fungsi untuk konfirmasi hapus user
  const handleConfirmDelete = () => {
    if (selectedUser) {
      if (activeTab === "anggota") {
        setDataAnggota((prev) => prev.filter((user) => user.no !== selectedUser.no))
      } else {
        setDataPustakawan((prev) => prev.filter((user) => user.no !== selectedUser.no))
      }
      setSelectedUser(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredDataAnggota = dataAnggota.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.idPerpus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDataPustakawan = dataPustakawan.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.idPerpus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gmail.toLowerCase().includes(searchQuery.toLowerCase()),
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
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
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
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }).map((_, j) => (
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-[#0E4D97] cursor-pointer">Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#0E4D97] font-medium">Manajemen User</span>
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
              <h1 className="text-3xl font-bold">Manajemen User</h1>
              <p className="text-gray-600 text-sm mt-2">Kelola data anggota dan pustakawan perpustakaan</p>
            </>
          )}
        </div>

        {/* Tab Terintegrasi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              {/* Tab skeleton */}
              <div className="flex gap-4 mb-6 border-b pb-4">
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>

              {/* Content skeleton */}
              <TableSkeleton />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "anggota" | "pustakawan")}>
              {/* Tab Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="anggota"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Anggota
                  </TabsTrigger>
                  <TabsTrigger
                    value="pustakawan"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Pustakawan
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <TabsContent value="anggota" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Data Anggota</h2>
                      <p className="text-sm text-gray-600 mt-1">Kelola data anggota perpustakaan</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Cari berdasarkan nama, ID, atau email..."
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
                      Tambah Anggota
                    </Button>
                  </div>

                  <DataTableUsers
                    columns={columnsAnggota(handleEdit, handleDelete)}
                    data={filteredDataAnggota.slice(
                      (pagination.anggota.page - 1) * pagination.anggota.perPage,
                      pagination.anggota.page * pagination.anggota.perPage,
                    )}
                    page={pagination.anggota.page}
                    setPage={(p) => setPagination((prev) => ({ ...prev, anggota: { ...prev.anggota, page: p } }))}
                    perPage={pagination.anggota.perPage}
                    setPerPage={(pp) => setPagination((prev) => ({ ...prev, anggota: { page: 1, perPage: pp } }))}
                    total={filteredDataAnggota.length}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pustakawan" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Data Pustakawan</h2>
                      <p className="text-sm text-gray-600 mt-1">Kelola data pustakawan perpustakaan</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Cari berdasarkan nama, ID, atau email..."
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
                      Tambah Pustakawan
                    </Button>
                  </div>

                  <DataTableUsers
                    columns={columnsPustakawan(handleEdit, handleDelete)}
                    data={filteredDataPustakawan.slice(
                      (pagination.pustakawan.page - 1) * pagination.pustakawan.perPage,
                      pagination.pustakawan.page * pagination.pustakawan.perPage,
                    )}
                    page={pagination.pustakawan.page}
                    setPage={(p) => setPagination((prev) => ({ ...prev, pustakawan: { ...prev.pustakawan, page: p } }))}
                    perPage={pagination.pustakawan.perPage}
                    setPerPage={(pp) => setPagination((prev) => ({ ...prev, pustakawan: { page: 1, perPage: pp } }))}
                    total={filteredDataPustakawan.length}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Dialogs */}
        <AddUserDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddUser}
          userType={activeTab}
        />

        <EditUserDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedUser(null)
          }}
          onSubmit={handleUpdateUser}
          userData={selectedUser}
          userType={activeTab}
        />

        <DeleteUserDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={handleConfirmDelete}
          userData={selectedUser}
        />
      </main>
    </div>
  )
}
