"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
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

  const [datamember, setDatamember] = useState<Datamember[]>([])
  const [dataPustakawan, setDataPustakawan] = useState<DataPustakawan[]>([])

  const [pagination, setPagination] = useState({
    member: { page: 1, perPage: 5 },
    pustakawan: { page: 1, perPage: 5 },
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const token = Cookies.get("token")
    if (!token) return

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      const users = response.data.data.data
      const memberList: Datamember[] = []
      const pustakawanList: DataPustakawan[] = []

      let noMember = 1
      let noPustakawan = 1

      users.forEach((user: any) => {
        const baseData = {
          no: 0,
          id: user.id,
          nama: user.name,
          gmail: user.email,
          username: user.username ?? "",
          password: user.password ?? "",
          role: user.role,
        }

        if (user.role === "member") {
          memberList.push({ ...baseData, no: noMember++ })
        } else if (user.role === "pustakawan") {
          pustakawanList.push({ ...baseData, no: noPustakawan++ })
        }
      })

      setDatamember(memberList)
      setDataPustakawan(pustakawanList)
    } catch (error: any) {
      console.error("Gagal mengambil data user:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddUser = (userData: Omit<Datamember | DataPustakawan, "no">) => {
  if (userData.role === "member") {
    const newUser: Datamember = {
      no: Math.max(...datamember.map((u) => u.no), 0) + 1,
      id: userData.id,
      nama: userData.nama,
      gmail: userData.gmail,
      username: userData.username ?? "",
      password: userData.password ?? "",
      role: "member",
    }
    setDatamember((prev) => [...prev, newUser])
  } else if (userData.role === "pustakawan") {
    const newUser: DataPustakawan = {
      no: Math.max(...dataPustakawan.map((u) => u.no), 0) + 1,
      id: userData.id,
      nama: userData.nama,
      gmail: userData.gmail,
      username: userData.username ?? "",
      password: userData.password ?? "",
      role: "pustakawan",
    }
    setDataPustakawan((prev) => [...prev, newUser])
  }
}

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

  const handleUpdateUser = (updatedUser: Datamember | DataPustakawan) => {
  if (activeTab === "member" && "role" in updatedUser && updatedUser.role === "member") {
    setDatamember((prev: Datamember[]) =>
      prev.map((user) => (user.no === updatedUser.no ? updatedUser as Datamember : user))
    )
  } else if (activeTab === "pustakawan" && "role" in updatedUser && updatedUser.role === "pustakawan") {
    setDataPustakawan((prev: DataPustakawan[]) =>
      prev.map((user) => (user.no === updatedUser.no ? updatedUser as DataPustakawan : user))
    )
  }
}


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

  const handleDetail = (user: Datamember | DataPustakawan) => {
    setSelectedUser(user)
    setIsDetailDialogOpen(true)
  }

  const filteredDatamember = datamember.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDataPustakawan = dataPustakawan.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gmail.toLowerCase().includes(searchQuery.toLowerCase()),
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
              <h1 className="text-3xl font-bold">Manajemen User</h1>
              <p className="text-gray-600 text-sm mt-2">Kelola data member dan pustakawan perpustakaan</p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">Loading...</div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "member" | "pustakawan")}>
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger value="member" className="px-6 py-4 font-medium text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97] data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97]">
                    Member
                  </TabsTrigger>
                  <TabsTrigger value="pustakawan" className="px-6 py-4 font-medium text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97] data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97]">
                    Pustakawan
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="member" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Manajemen Member</h2>
                      <p className="text-sm text-gray-600 mt-1">Kelola data user member</p>
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
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#0E4D97] text-white">
                      <Plus className="h-4 w-4 mr-2" /> Tambah Member
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
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Manajemen Pustakawan</h2>
                      <p className="text-sm text-gray-600 mt-1">Kelola data user pustakawan</p>
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
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#0E4D97] text-white">
                      <Plus className="h-4 w-4 mr-2" /> Tambah Pustakawan
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

        <AddUserDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddUser}
          userType={activeTab}
          datamember={datamember}
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
