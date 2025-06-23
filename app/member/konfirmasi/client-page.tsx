"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableConfirm } from "@/app/_components/member/konfirmasi/data-table-konfirmasi"
import {
  columnsBerhasil,
  createColumnsMenunggu,
  type DataBerhasil,
  type DataMenunggu,
} from "@/app/_components/member/konfirmasi/columns-konfirmasi"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import axios from "axios"
import Cookies from "js-cookie"

export default function ClientKonfirmasi() {
  const token = Cookies.get("token")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"berhasil" | "menunggu">("menunggu")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataMenunggu, setDataMenunggu] = useState<DataMenunggu[]>([])
  const [dataBerhasil, setDataBerhasil] = useState<DataBerhasil[]>([])
  const [pagination, setPagination] = useState({
    berhasil: { page: 1, perPage: 5 },
    menunggu: { page: 1, perPage: 5 },
  })

  const fetchDataMenunggu = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("=== DEBUG FETCH DATA MENUNGGU ===")
      console.log("Token:", token ? "Ada" : "Tidak ada")
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)

      if (!token) {
        throw new Error("Token tidak tersedia")
      }

      console.log("Melakukan request ke:", `${process.env.NEXT_PUBLIC_API_URL}/borrow/pending`)

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      console.log("Full response pending:", response)
      console.log("Response status:", response.status)
      console.log("Response data:", response.data)

      if (response.data && response.data.success && response.data.data) {
        console.log("Memproses data menunggu...")
        const formattedData: DataMenunggu[] = response.data.data.map((item: any, index: number) => {
          console.log(`Item ${index}:`, item)
          return {
            no: index + 1,
            id: item.id_peminjaman,
            judul: item.judul,
            tanggalPinjam: new Date(item.tanggal_peminjaman).toLocaleDateString("id-ID"),
            waktuPinjam: item.waktu_peminjaman,
          }
        })

        console.log("Formatted data menunggu:", formattedData)
        setDataMenunggu(formattedData)
      } else {
        console.log("Data menunggu tidak valid atau kosong")
        setDataMenunggu([])
      }
    } catch (error: any) {
      console.error("=== ERROR FETCH DATA MENUNGGU ===")
      console.error("Error object:", error)
      console.error("Error response:", error.response)
      console.error("Error message:", error.message)
      setError(error.response?.data?.message || error.message || "Gagal memuat data menunggu")
      setDataMenunggu([])
    }
  }

  const fetchDataBerhasil = async () => {
    try {
      setError(null)

      console.log("=== DEBUG FETCH DATA BERHASIL ===")
      console.log("Token:", token ? "Ada" : "Tidak ada")
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)

      if (!token) {
        throw new Error("Token tidak tersedia")
      }

      console.log("Melakukan request ke:", `${process.env.NEXT_PUBLIC_API_URL}/borrow/active`)

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      console.log("Full response active:", response)
      console.log("Response status:", response.status)
      console.log("Response data:", response.data)

      if (response.data && response.data.success && response.data.data) {
        console.log("Memproses data berhasil...")
        const formattedData: DataBerhasil[] = response.data.data.map((item: any, index: number) => {
          console.log(`Item berhasil ${index}:`, item)
          return {
            no: index + 1,
            judul: item.judul,
            tanggalKonfirm: new Date(item.tanggal_konfirmasi || item.tanggal_peminjaman).toLocaleDateString("id-ID"),
            waktuKonfirm: item.waktu_konfirmasi || item.waktu_peminjaman,
          }
        })

        console.log("Formatted data berhasil:", formattedData)
        setDataBerhasil(formattedData)
      } else {
        console.log("Data berhasil tidak valid atau kosong")
        setDataBerhasil([])
      }
    } catch (error: any) {
      console.error("=== ERROR FETCH DATA BERHASIL ===")
      console.error("Error object:", error)
      console.error("Error response:", error.response)
      console.error("Error message:", error.message)
      setError(error.response?.data?.message || error.message || "Gagal memuat data berhasil")
      setDataBerhasil([])
    }
  }

  const fetchAllData = async () => {
    setIsLoading(true)
    await Promise.all([fetchDataMenunggu(), fetchDataBerhasil()])
    setIsLoading(false)
  }

  useEffect(() => {
    if (token) {
      fetchAllData()
    }
  }, [token])

  // Refresh data when tab changes
  useEffect(() => {
    if (token && !isLoading) {
      if (activeTab === "berhasil") {
        fetchDataBerhasil()
      } else {
        fetchDataMenunggu()
      }
    }
  }, [activeTab])

  const handleDelete = (id: number) => {
    setDataMenunggu((prev) => prev.filter((item) => item.id !== id))
  }

  const filteredDataBerhasil = dataBerhasil.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredDataMenunggu = dataMenunggu.filter((item) => 
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Skeleton untuk tabel
  const TableSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
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

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Konfirmasi Peminjaman</h1>
          <p className="text-gray-600 text-sm mt-2">
            Daftar peminjaman yang sudah dikonfirmasi dan yang masih menunggu konfirmasi
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "berhasil" | "menunggu")}>
            <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="berhasil"
                    className="text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97]">
                    Berhasil
                  </TabsTrigger>
                  <TabsTrigger
                    value="menunggu"
                    className="text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97]">
                    Menunggu
                  </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="berhasil" className="mt-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0E4D97]">Berhasil Konfirmasi</h2>
                    <p className="text-sm text-gray-600 mt-1">Daftar peminjaman yang telah berhasil dikonfirmasi</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      <strong>Error:</strong> {error}
                    </p>
                  </div>
                )}

                <div className="relative mb-6 w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari berdasarkan judul buku..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                    disabled={isLoading}
                  />
                </div>

                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <>
                    {filteredDataBerhasil.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {searchQuery ? "Tidak ada hasil pencarian" : "Tidak ada data berhasil konfirmasi"}
                        </h3>
                        <p className="text-gray-500">
                          {searchQuery
                            ? `Tidak ditemukan peminjaman dengan kata kunci "${searchQuery}"`
                            : "Belum ada peminjaman yang berhasil dikonfirmasi"}
                        </p>
                      </div>
                    ) : (
                      <DataTableConfirm
                        columns={columnsBerhasil}
                        data={filteredDataBerhasil.slice(
                          (pagination.berhasil.page - 1) * pagination.berhasil.perPage,
                          pagination.berhasil.page * pagination.berhasil.perPage,
                        )}
                        page={pagination.berhasil.page}
                        setPage={(p) => setPagination((prev) => ({ ...prev, berhasil: { ...prev.berhasil, page: p } }))}
                        perPage={pagination.berhasil.perPage}
                        setPerPage={(pp) => setPagination((prev) => ({ ...prev, berhasil: { page: 1, perPage: pp } }))}
                        total={filteredDataBerhasil.length}
                      />
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="menunggu" className="mt-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0E4D97]">Menunggu Konfirmasi</h2>
                    <p className="text-sm text-gray-600 mt-1">Daftar peminjaman yang masih menunggu konfirmasi</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      <strong>Error:</strong> {error}
                    </p>
                  </div>
                )}

                <div className="relative mb-6 w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari berdasarkan judul buku..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                    disabled={isLoading}
                  />
                </div>

                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <>
                    {filteredDataMenunggu.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {searchQuery ? "Tidak ada hasil pencarian" : "Tidak ada data menunggu konfirmasi"}
                        </h3>
                        <p className="text-gray-500">
                          {searchQuery
                            ? `Tidak ditemukan peminjaman dengan kata kunci "${searchQuery}"`
                            : "Belum ada peminjaman yang menunggu konfirmasi"}
                        </p>
                      </div>
                    ) : (
                      <DataTableConfirm
                        columns={createColumnsMenunggu(handleDelete)}
                        data={filteredDataMenunggu.slice(
                          (pagination.menunggu.page - 1) * pagination.menunggu.perPage,
                          pagination.menunggu.page * pagination.menunggu.perPage,
                        )}
                        page={pagination.menunggu.page}
                        setPage={(p) => setPagination((prev) => ({ ...prev, menunggu: { ...prev.menunggu, page: p } }))}
                        perPage={pagination.menunggu.perPage}
                        setPerPage={(pp) => setPagination((prev) => ({ ...prev, menunggu: { page: 1, perPage: pp } }))}
                        total={filteredDataMenunggu.length}
                      />
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}