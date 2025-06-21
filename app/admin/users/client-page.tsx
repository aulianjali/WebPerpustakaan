"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableUsers } from "@/app/_components/admin/users/data-table-user"
import { AddUserDialog } from "@/app/_components/admin/users/add-user-dialog"
import { EditUserDialog } from "@/app/_components/admin/users/edit-user-dialog"
import { DeleteUserDialog } from "@/app/_components/admin/users/delete-user-dialog"
import { DetailUserDialog } from "@/app/_components/admin/users/detail-user-dialog"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"

import {
  columnsmember,
  columnsPustakawan,
  type Datamember,
  type DataPustakawan,
} from "@/app/_components/admin/users/columns-user"

export default function ClientManajemenUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"member" | "pustakawan">("member")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Datamember | DataPustakawan | null>(null)

  const [pagination, setPagination] = useState({
    member: { page: 1, perPage: 5 },
    pustakawan: { page: 1, perPage: 5 },
  })

  // State untuk data yang bisa diubah - Hanya field yang diperlukan
  const [datamember, setDatamember] = useState<Datamember[]>([
    {
      no: 1,
      idPerpus: "A001",
      nama: "Ahmad Rizki",
      gmail: "ahmad.rizki@gmail.com",
      username: "ahmad_rizki",
      password: "ahmad123",
    },
    {
      no: 2,
      idPerpus: "A002",
      nama: "Siti Nurhaliza",
      gmail: "siti.nurhaliza@gmail.com",
      username: "siti_nurhaliza",
      password: "siti456",
    },
    {
      no: 3,
      idPerpus: "A003",
      nama: "Budi Santoso",
      gmail: "budi.santoso@gmail.com",
      username: "budi_santoso",
      password: "budi789",
    },
    {
      no: 4,
      idPerpus: "A004",
      nama: "Maya Sari",
      gmail: "maya.sari@gmail.com",
      username: "maya_sari",
      password: "maya321",
    },
    {
      no: 5,
      idPerpus: "A005",
      nama: "Dedi Kurniawan",
      gmail: "dedi.kurniawan@gmail.com",
      username: "dedi_kurniawan",
      password: "dedi654",
    },
    {
      no: 6,
      idPerpus: "A006",
      nama: "Rina Wati",
      gmail: "rina.wati@gmail.com",
      username: "rina_wati",
      password: "rina987",
    },
    {
      no: 7,
      idPerpus: "A007",
      nama: "Joko Widodo",
      gmail: "joko.widodo@gmail.com",
      username: "joko_widodo",
      password: "joko123",
    },
    {
      no: 8,
      idPerpus: "A008",
      nama: "Anisa Rahma",
      gmail: "anisa.rahma@gmail.com",
      username: "anisa_rahma",
      password: "anisa456",
    },
    {
      no: 9,
      idPerpus: "A009",
      nama: "Rudi Hartono",
      gmail: "rudi.hartono@gmail.com",
      username: "rudi_hartono",
      password: "rudi789",
    },
    {
      no: 10,
      idPerpus: "A010",
      nama: "Dewi Lestari",
      gmail: "dewi.lestari@gmail.com",
      username: "dewi_lestari",
      password: "dewi321",
    },
  ])

  const [dataPustakawan, setDataPustakawan] = useState<DataPustakawan[]>([
    {
      no: 1,
      idPerpus: "P001",
      nama: "Dr. Indira Sari",
      gmail: "indira.sari@perpus.ac.id",
      username: "indira_sari",
      password: "indira111",
    },
    {
      no: 2,
      idPerpus: "P002",
      nama: "Prof. Bambang Wijaya",
      gmail: "bambang.wijaya@perpus.ac.id",
      username: "bambang_wijaya",
      password: "bambang222",
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
  const handleAddUser = (userData: Omit<Datamember | DataPustakawan, "no">) => {
    if (activeTab === "member") {
      const newUser: Datamember = {
        ...userData,
        no: Math.max(...datamember.map((u) => u.no)) + 1,
      } as Datamember
      setDatamember((prev) => [...prev, newUser])
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
    let user: Datamember | DataPustakawan | undefined

    if (activeTab === "member") {
      user = datamember.find((u) => u.no === id)
    } else {
      user = dataPustakawan.find((u) => u.no === id)
    }

    if (user) {
      setSelectedUser(user)
      setIsEditDialogOpen(true)
    }
  }

  // Fungsi untuk detail user
  const handleDetail = (user: Datamember | DataPustakawan) => {
    setSelectedUser(user)
    setIsDetailDialogOpen(true)
  }

  // Fungsi untuk update user setelah edit
  const handleUpdateUser = (updatedUser: Datamember | DataPustakawan) => {
    if (activeTab === "member") {
      setDatamember((prev) => prev.map((user) => (user.no === updatedUser.no ? (updatedUser as Datamember) : user)))
    } else {
      setDataPustakawan((prev) =>
        prev.map((user) => (user.no === updatedUser.no ? (updatedUser as DataPustakawan) : user)),
      )
    }
  }

  // Fungsi untuk hapus user
  const handleDelete = (id: number) => {
    let user: Datamember | DataPustakawan | undefined

    if (activeTab === "member") {
      user = datamember.find((u) => u.no === id)
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
      if (activeTab === "member") {
        setDatamember((prev) => prev.filter((user) => user.no !== selectedUser.no))
      } else {
        setDataPustakawan((prev) => prev.filter((user) => user.no !== selectedUser.no))
      }
      setSelectedUser(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredDatamember = datamember.filter(
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
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
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
              <h1 className="text-3xl font-bold">Manajemen User</h1>
              <p className="text-gray-600 text-sm mt-2">Kelola data member dan pustakawan perpustakaan</p>
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
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "member" | "pustakawan")}>
              {/* Tab Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="member"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Member
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
              <TabsContent value="member" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Data Member</h2>
                      <p className="text-sm text-gray-600 mt-1">Kelola data member perpustakaan</p>
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
                      Tambah member
                    </Button>
                  </div>

                  <DataTableUsers
                    columns={columnsmember(handleEdit, handleDelete, handleDetail)}
                    data={filteredDatamember.slice(
                      (pagination.member.page - 1) * pagination.member.perPage,
                      pagination.member.page * pagination.member.perPage,
                    )}
                    page={pagination.member.page}
                    setPage={(p) => setPagination((prev) => ({ ...prev, member: { ...prev.member, page: p } }))}
                    perPage={pagination.member.perPage}
                    setPerPage={(pp) => setPagination((prev) => ({ ...prev, member: { page: 1, perPage: pp } }))}
                    total={filteredDatamember.length}
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
                    columns={columnsPustakawan(handleEdit, handleDelete, handleDetail)}
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
          datamember={datamember}         // <-- tambahkan ini
          dataPustakawan={dataPustakawan} 
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

        <DetailUserDialog
          isOpen={isDetailDialogOpen}
          onClose={() => {
            setIsDetailDialogOpen(false)
            setSelectedUser(null)
          }}
          userData={selectedUser}
        />
      </main>
    </div>
  )
}