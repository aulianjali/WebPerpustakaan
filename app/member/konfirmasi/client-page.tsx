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

  const [dataMenunggu, setDataMenunggu] = useState<DataMenunggu[]>([])
  const [pagination, setPagination] = useState({
    berhasil: { page: 1, perPage: 5 },
    menunggu: { page: 1, perPage: 5 },
  })

  const fetchDataConfirm = async () => {
    try {
      if (!token) {
        console.error("Token tidak tersedia")
        return
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        console.log(response);
        
      const formattedData: DataMenunggu[] = response.data.data.map((item: any, index: number) => ({
        no: index + 1,
        judul: item.buku,
        tanggalPinjam: new Date().toLocaleDateString("id-ID"),
        waktuPinjam: item.waktu_peminjaman,
      }))

      setDataMenunggu(formattedData)
    } catch (error: any) {
      console.error("Gagal ambil data menunggu konfirmasi:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataConfirm()
  }, [])

  const handleDelete = (id: number) => {
    setDataMenunggu((prev) => prev.filter((item) => item.no !== id))
  }

  const dataBerhasil: DataBerhasil[] = Array.from({ length: 100 }, (_, i) => ({
    no: i + 1,
    judul: `Judul Buku ${i + 1}`,
    tanggalKonfirm: "20-04-2025",
    waktuKonfirm: `${String(8 + (i % 8)).padStart(2, "0")}:${String(15 + (i % 45)).padStart(2, "0")}`,
  }))

  const filteredDataBerhasil = dataBerhasil.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredDataMenunggu = dataMenunggu.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
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

      {/* Search skeleton */}
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>

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
              <h1 className="text-3xl font-bold">Konfirmasi Peminjaman</h1>
              <p className="text-gray-600 text-sm mt-2">
                Daftar peminjaman yang sudah dikonfirmasi dan yang masih menunggu konfirmasi
              </p>
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
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>

              {/* Content skeleton */}
              <TableSkeleton />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "berhasil" | "menunggu")}>
              {/* Tab Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="berhasil"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Berhasil
                  </TabsTrigger>
                  <TabsTrigger
                    value="menunggu"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Menunggu
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <TabsContent value="berhasil" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Berhasil Konfirmasi</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar peminjaman yang telah berhasil dikonfirmasi</p>
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

                  <div className="relative mb-6 w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Cari berdasarkan judul buku..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </div>

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
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
