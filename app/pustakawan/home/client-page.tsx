"use client"

import { useState, useEffect } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableHome } from "@/app/_components/pustakawan/home/data-table-home"
import {
  columnsMenunggu,
  columnsDipinjam,
  columnsPengembalian,
  type DataMenunggu,
  type DataDipinjam,
  type DataPengembalian,
} from "@/app/_components/pustakawan/home/columns-home"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"menunggu" | "dipinjam" | "pengembalian">("menunggu")
  const [isLoading, setIsLoading] = useState(true)

  const [pagination, setPagination] = useState({
    menunggu: { page: 1, perPage: 5 },
    dipinjam: { page: 1, perPage: 5 },
    pengembalian: { page: 1, perPage: 5 },
  })

  // Contoh data awal
  const [dataMenunggu, setDataMenunggu] = useState<DataMenunggu[]>([
    { no: 1, judul: "Matematika Diskrit", peminjam: "Andi", tanggalPinjam: "20-04-2025", waktuPinjam: "08:30" },
    { no: 2, judul: "Jaringan Komputer", peminjam: "Budi", tanggalPinjam: "21-04-2025", waktuPinjam: "12:00" },
    { no: 3, judul: "Algoritma & Struktur Data", peminjam: "Citra", tanggalPinjam: "22-04-2025", waktuPinjam: "13:15" },
    { no: 4, judul: "Pemrograman Web", peminjam: "Dewi", tanggalPinjam: "23-04-2025", waktuPinjam: "14:50" },
  ])

  const [dataDipinjam, setDataDipinjam] = useState<DataDipinjam[]>([
    { no: 1, judul: "Basis Data", peminjam: "Eka", sisaWaktu: "2 hari" },
    { no: 2, judul: "Pemrograman Java", peminjam: "Fajar", sisaWaktu: "1 hari" },
    { no: 3, judul: "Sistem Operasi", peminjam: "Gita", sisaWaktu: "5 jam" },
    { no: 4, judul: "Kalkulus", peminjam: "Hadi", sisaWaktu: "3 hari" },
  ])

  const [dataPengembalian, setDataPengembalian] = useState<DataPengembalian[]>([
    { no: 1, judul: "Statistika", peminjam: "Ika", tanggalKembali: "18-04-2025", waktuKembali: "10:00" },
    { no: 2, judul: "Keamanan Jaringan", peminjam: "Joko", tanggalKembali: "19-04-2025", waktuKembali: "11:30" },
    { no: 3, judul: "Machine Learning", peminjam: "Kiki", tanggalKembali: "20-04-2025", waktuKembali: "09:45" },
    { no: 4, judul: "Grafika Komputer", peminjam: "Lina", tanggalKembali: "21-04-2025", waktuKembali: "15:20" },
  ])

  // Simulasi loading saat halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Loading selama 1.2 detik

    return () => clearTimeout(timer)
  }, [])

  // Filter data berdasarkan searchQuery
  const filteredMenunggu = dataMenunggu.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredDipinjam = dataDipinjam.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredPengembalian = dataPengembalian.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-[#0E4D97] cursor-pointer">Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#0E4D97] font-medium">Daftar Buku</span>
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
              <h1 className="text-3xl font-bold">Daftar Peminjaman</h1>
              <p className="text-gray-600 text-sm mt-2">
                Kelola daftar buku yang sedang menunggu, dipinjam, atau perlu dikembalikan
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
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>

              {/* Content skeleton */}
              <TableSkeleton />
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "menunggu" | "dipinjam" | "pengembalian")}
            >
              {/* Tab Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="menunggu"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Menunggu
                  </TabsTrigger>
                  <TabsTrigger
                    value="dipinjam"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Dipinjam
                  </TabsTrigger>
                  <TabsTrigger
                    value="pengembalian"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Pengembalian
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content: Menunggu */}
              <TabsContent value="menunggu" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Menunggu Konfirmasi</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar buku yang masih menunggu konfirmasi</p>
                    </div>
                    <div className="text-sm text-gray-500">Total: {filteredMenunggu.length} data</div>
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

                  <DataTableHome
                    columns={columnsMenunggu}
                    data={filteredMenunggu.slice(
                      (pagination.menunggu.page - 1) * pagination.menunggu.perPage,
                      pagination.menunggu.page * pagination.menunggu.perPage
                    )}
                    page={pagination.menunggu.page}
                    setPage={(p) =>
                      setPagination((prev) => ({
                        ...prev,
                        menunggu: { ...prev.menunggu, page: p },
                      }))
                    }
                    perPage={pagination.menunggu.perPage}
                    setPerPage={(pp) =>
                      setPagination((prev) => ({
                        ...prev,
                        menunggu: { page: 1, perPage: pp },
                      }))
                    }
                    total={filteredMenunggu.length}
                  />
                </div>
              </TabsContent>

              {/* Tab Content: Dipinjam */}
              <TabsContent value="dipinjam" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Saat Ini Dipinjam</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar buku yang sedang dipinjam</p>
                    </div>
                    <div className="text-sm text-gray-500">Total: {filteredDipinjam.length} data</div>
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

                  <DataTableHome
                    columns={columnsDipinjam}
                    data={filteredDipinjam.slice(
                      (pagination.dipinjam.page - 1) * pagination.dipinjam.perPage,
                      pagination.dipinjam.page * pagination.dipinjam.perPage
                    )}
                    page={pagination.dipinjam.page}
                    setPage={(p) =>
                      setPagination((prev) => ({
                        ...prev,
                        dipinjam: { ...prev.dipinjam, page: p },
                      }))
                    }
                    perPage={pagination.dipinjam.perPage}
                    setPerPage={(pp) =>
                      setPagination((prev) => ({
                        ...prev,
                        dipinjam: { page: 1, perPage: pp },
                      }))
                    }
                    total={filteredDipinjam.length}
                  />
                </div>
              </TabsContent>

              {/* Tab Content: Pengembalian */}
              <TabsContent value="pengembalian" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0E4D97]">Pengembalian</h2>
                      <p className="text-sm text-gray-600 mt-1">Daftar buku yang sudah dikembalikan</p>
                    </div>
                    <div className="text-sm text-gray-500">Total: {filteredPengembalian.length} data</div>
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

                  <DataTableHome
                    columns={columnsPengembalian}
                    data={filteredPengembalian.slice(
                      (pagination.pengembalian.page - 1) * pagination.pengembalian.perPage,
                      pagination.pengembalian.page * pagination.pengembalian.perPage
                    )}
                    page={pagination.pengembalian.page}
                    setPage={(p) =>
                      setPagination((prev) => ({
                        ...prev,
                        pengembalian: { ...prev.pengembalian, page: p },
                      }))
                    }
                    perPage={pagination.pengembalian.perPage}
                    setPerPage={(pp) =>
                      setPagination((prev) => ({
                        ...prev,
                        pengembalian: { page: 1, perPage: pp },
                      }))
                    }
                    total={filteredPengembalian.length}
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
