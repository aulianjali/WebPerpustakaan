"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTableRiwayat } from "@/app/_components/anggota/riwayat/data-table-riwayat"
import {
  columnsRiwayat,
  type DataRiwayat,
  type DataDipinjam,
  createColumnsDipinjam,
} from "@/app/_components/anggota/riwayat/columns-riwayat"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"

export default function ClientRiwayat() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"dipinjam" | "riwayat">("dipinjam")
  const [isLoading, setIsLoading] = useState(true)

  const [pagination, setPagination] = useState({
    riwayat: { page: 1, perPage: 5 },
    dipinjam: { page: 1, perPage: 5 },
  })

  const dataRiwayat: DataRiwayat[] = [
    {
      no: 1,
      judul: "Basis Data",
      tanggalPinjam: "10-04-2025",
      tanggalKembali: "17-04-2025",
      status: "Tidak Terlambat",
    },
    { no: 2, judul: "Pemrograman Web", tanggalPinjam: "11-04-2025", tanggalKembali: "20-04-2025", status: "Terlambat" },
    { no: 3, judul: "AI Dasar", tanggalPinjam: "12-04-2025", tanggalKembali: "19-04-2025", status: "Tidak Terlambat" },
    {
      no: 4,
      judul: "Sistem Informasi",
      tanggalPinjam: "13-04-2025",
      tanggalKembali: "22-04-2025",
      status: "Terlambat",
    },
    {
      no: 5,
      judul: "Jaringan Komputer",
      tanggalPinjam: "14-04-2025",
      tanggalKembali: "21-04-2025",
      status: "Tidak Terlambat",
    },
    { no: 6, judul: "Struktur Data", tanggalPinjam: "15-04-2025", tanggalKembali: "23-04-2025", status: "Terlambat" },
    {
      no: 7,
      judul: "Pemrograman Mobile",
      tanggalPinjam: "16-04-2025",
      tanggalKembali: "24-04-2025",
      status: "Tidak Terlambat",
    },
    {
      no: 8,
      judul: "Keamanan Informasi",
      tanggalPinjam: "17-04-2025",
      tanggalKembali: "25-04-2025",
      status: "Terlambat",
    },
    {
      no: 9,
      judul: "Cloud Computing",
      tanggalPinjam: "18-04-2025",
      tanggalKembali: "26-04-2025",
      status: "Tidak Terlambat",
    },
    {
      no: 10,
      judul: "Machine Learning",
      tanggalPinjam: "19-04-2025",
      tanggalKembali: "27-04-2025",
      status: "Terlambat",
    },
  ]

  const dataDipinjam: DataDipinjam[] = [
    { no: 1, judul: "Sistem Operasi", tanggalPinjam: "24-05-2025", deadlineKembali: "31-05-2025" },
    { no: 2, judul: "Jaringan", tanggalPinjam: "25-05-2025", deadlineKembali: "01-06-2025" },
    { no: 3, judul: "Database", tanggalPinjam: "26-05-2025", deadlineKembali: "02-06-2025" },
    { no: 4, judul: "Web Programming", tanggalPinjam: "27-05-2025", deadlineKembali: "03-06-2025" },
    { no: 5, judul: "Mobile Development", tanggalPinjam: "28-05-2025", deadlineKembali: "04-06-2025" },
    { no: 6, judul: "AI & Machine Learning", tanggalPinjam: "29-05-2025", deadlineKembali: "05-06-2025" },
    { no: 7, judul: "Cloud Computing", tanggalPinjam: "30-05-2025", deadlineKembali: "06-06-2025" },
  ]

  // Simulasi loading saat halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Loading selama 1.2 detik

    return () => clearTimeout(timer)
  }, [])

  const filteredDataRiwayat = dataRiwayat.filter((item) => item.judul.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredDataDipinjam = dataDipinjam.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleReturnBook = (id: number) => {
    // Move book from dipinjam to riwayat
    const bookToReturn = dataDipinjam.find((book) => book.no === id)
    if (bookToReturn) {
      // Add logic to move book to riwayat with current date as return date
      console.log("Returning book:", bookToReturn)
    }
  }

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
              <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
              <p className="text-gray-600 text-sm mt-2">
                Daftar buku yang sedang dipinjam dan riwayat peminjaman yang telah selesai
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
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>

              {/* Content skeleton */}
              <TableSkeleton />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "dipinjam" | "riwayat")}>
              {/* Tab Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger
                    value="dipinjam"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Sedang Dipinjam
                  </TabsTrigger>
                  <TabsTrigger
                    value="riwayat"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E4D97] data-[state=active]:bg-white data-[state=active]:text-[#0E4D97] data-[state=active]:shadow-none px-6 py-4 rounded-none border-b-2 border-transparent font-medium text-gray-600 hover:text-[#0E4D97] transition-colors"
                  >
                    Riwayat
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
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

                  <DataTableRiwayat
                    columns={createColumnsDipinjam(handleReturnBook)}
                    data={filteredDataDipinjam}
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
                </div>
              </TabsContent>

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

                  <DataTableRiwayat
                    columns={columnsRiwayat}
                    data={filteredDataRiwayat}
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
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
