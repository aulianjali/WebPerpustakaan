"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableRiwayat } from "@/app/_components/member/riwayat/data-table-riwayat"
import {
  columnsRiwayat,
  type DataRiwayat,
  type DataDipinjam,
  columnsDipinjam,
} from "@/app/_components/member/riwayat/columns-riwayat"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import axios from "axios"
import Cookies from "js-cookie"

export default function ClientRiwayat() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"dipinjam" | "riwayat">("dipinjam")
  const [isLoading, setIsLoading] = useState(true)
  const [dataDipinjam, setDataDipinjam] = useState<DataDipinjam[]>([])
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([])
  const [error, setError] = useState<string | null>(null)
  const token = Cookies.get("token")

  const [pagination, setPagination] = useState({
    riwayat: { page: 1, perPage: 5 },
    dipinjam: { page: 1, perPage: 5 },
  })

  const fetchDataDipinjam = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (response.data?.success && response.data?.data) {
        const formattedData: DataDipinjam[] = response.data.data.map((item: any, index: number) => ({
          no: index + 1,
          judul: item.judul,
          tanggalPinjam: new Date(item.tanggal_peminjaman).toLocaleDateString("id-ID"),
          deadlineKembali: new Date(item.deadline_waktu).toLocaleDateString("id-ID"),
        }))
        setDataDipinjam(formattedData)
      } else {
        setDataDipinjam([])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Gagal memuat data sedang dipinjam")
      setDataDipinjam([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDataRiwayat = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (response.data?.success && response.data?.data) {
        const formattedData: DataRiwayat[] = response.data.data.map((item: any, index: number) => ({
          no: index + 1,
          judul: item.judul,
          tanggalPinjam: new Date(item.tanggal_peminjaman).toLocaleDateString("id-ID"),
          tanggalKembali: new Date(item.tanggal_dikembalikan).toLocaleDateString("id-ID"),
          status: item.terlambat ? "Terlambat" : "Tidak Terlambat",
        }))
        setDataRiwayat(formattedData)
      } else {
        setDataRiwayat([])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Gagal memuat data riwayat")
      setDataRiwayat([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchDataDipinjam()
      fetchDataRiwayat()
    }
  }, [token])

  const filteredDataRiwayat = dataRiwayat.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredDataDipinjam = dataDipinjam.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
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

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-2">
        <Search className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
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
              <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
              <p className="text-gray-600 text-sm mt-2">
                Daftar buku yang sedang dipinjam dan riwayat peminjaman yang telah selesai
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <div className="flex gap-4 mb-6 border-b pb-4">
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <TableSkeleton />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "dipinjam" | "riwayat")}>
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="dipinjam"
                    className="text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97]">
                    Sedang Dipinjam
                  </TabsTrigger>
                  <TabsTrigger
                    value="riwayat"
                    className="text-gray-600 hover:text-[#0E4D97] data-[state=active]:text-[#0E4D97]">
                    Riwayat
                  </TabsTrigger>
                </TabsList>
            </div>

              {/* === DIPINJAM === */}
              <TabsContent value="dipinjam" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Sedang Dipinjam</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar buku yang sedang dalam masa peminjaman</p>
                    </div>
                  </div>
                  <div className="relative mb-6 w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Cari berdasarkan judul buku..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </div>

                  {filteredDataDipinjam.length === 0 ? (
                    <EmptyState
                      title="Tidak ada data sedang dipinjam"
                      description="Belum ada buku yang sedang dipinjam"
                    />
                  ) : (
                    <DataTableRiwayat
                      columns={columnsDipinjam}
                      data={filteredDataDipinjam.slice(
                        (pagination.dipinjam.page - 1) * pagination.dipinjam.perPage,
                        pagination.dipinjam.page * pagination.dipinjam.perPage
                      )}
                      page={pagination.dipinjam.page}
                      setPage={(page) =>
                        setPagination((prev) => ({
                          ...prev,
                          dipinjam: { ...prev.dipinjam, page },
                        }))
                      }
                      total={filteredDataDipinjam.length}
                      perPage={pagination.dipinjam.perPage}
                      setPerPage={(perPage) =>
                        setPagination((prev) => ({
                          ...prev,
                          dipinjam: { page: 1, perPage },
                        }))
                      }
                    />
                  )}
                </div>
              </TabsContent>

              {/* === RIWAYAT === */}
              <TabsContent value="riwayat" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Riwayat Peminjaman</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar riwayat peminjaman yang telah selesai</p>
                    </div>
                  </div>
                  <div className="relative mb-6 w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Cari berdasarkan judul buku..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </div>

                  {filteredDataRiwayat.length === 0 ? (
                    <EmptyState
                      title="Tidak ada data riwayat peminjaman"
                      description="Belum ada riwayat peminjaman yang tersimpan"
                    />
                  ) : (
                    <DataTableRiwayat
                      columns={columnsRiwayat}
                      data={filteredDataRiwayat.slice(
                        (pagination.riwayat.page - 1) * pagination.riwayat.perPage,
                        pagination.riwayat.page * pagination.riwayat.perPage
                      )}
                      page={pagination.riwayat.page}
                      setPage={(page) =>
                        setPagination((prev) => ({
                          ...prev,
                          riwayat: { ...prev.riwayat, page },
                        }))
                      }
                      total={filteredDataRiwayat.length}
                      perPage={pagination.riwayat.perPage}
                      setPerPage={(perPage) =>
                        setPagination((prev) => ({
                          ...prev,
                          riwayat: { page: 1, perPage },
                        }))
                      }
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
