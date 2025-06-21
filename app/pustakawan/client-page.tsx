"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
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
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import axios from "axios"
import Cookies from "js-cookie"

export default function HomePage() {
  const token = Cookies.get("token")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"menunggu" | "dipinjam" | "pengembalian">("menunggu")
  const [isLoading, setIsLoading] = useState(true)

  const [pagination, setPagination] = useState({
    menunggu: { page: 1, perPage: 5 },
    dipinjam: { page: 1, perPage: 5 },
    pengembalian: { page: 1, perPage: 5 },
  })

  const [dataMenunggu, setDataMenunggu] = useState<DataMenunggu[]>([])
  const [dataDipinjam, setDataDipinjam] = useState<DataDipinjam[]>([])
  const [dataPengembalian, setDataPengembalian] = useState<DataPengembalian[]>([])

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        console.error("Token tidak tersedia")
        return
      }

      try {
        const [resMenunggu, resDipinjam, resPengembalian] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/borrow/need-confirm`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/borrow/active`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/borrow/returned`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const formatDate = (dateStr: string) => {
          const date = new Date(dateStr)
          return date.toLocaleDateString("id-ID")
        }

        const formatTime = (dateStr: string) => {
          const date = new Date(dateStr)
          return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }

        const mappedMenunggu: DataMenunggu[] = resMenunggu.data.data.map((item: any, i: number) => ({
          no: i + 1,
          judul: item.buku,
          peminjam: item.user.name,
          tanggalPinjam: formatDate(item.waktu_peminjaman),
          waktuPinjam: formatTime(item.waktu_peminjaman),
        }))

        const mappedDipinjam: DataDipinjam[] = resDipinjam.data.data.map((item: any, i: number) => ({
          no: i + 1,
          judul: item.buku,
          peminjam: item.user.name,
          sisaWaktu: item.sisa_waktu ?? "-",
        }))

        const mappedPengembalian: DataPengembalian[] = resPengembalian.data.data.map((item: any, i: number) => ({
          no: i + 1,
          judul: item.buku,
          peminjam: item.user.name,
          tanggalKembali: formatDate(item.waktu_kembali),
          waktuKembali: formatTime(item.waktu_kembali),
          status: item.terlambat ? "Terlambat" : "Tidak Terlambat",
        }))

        setDataMenunggu(mappedMenunggu)
        setDataDipinjam(mappedDipinjam)
        setDataPengembalian(mappedPengembalian)
      } catch (err) {
        console.error("Gagal fetch data pustakawan:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const filteredMenunggu = dataMenunggu.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredDipinjam = dataDipinjam.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredPengembalian = dataPengembalian.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const TableSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
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
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Manajemen Peminjaman</h1>
              <p className="text-gray-600 text-sm mt-2">
                Kelola daftar buku yang harus dikonfirmasi, sedang dipinjam, atau perlu dikembalikan
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <div className="flex gap-4 mb-6 border-b pb-4">
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <TableSkeleton />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <div className="border-b border-gray-200 bg-gray-50/50">
                <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                  <TabsTrigger value="menunggu" className="...">Menunggu</TabsTrigger>
                  <TabsTrigger value="dipinjam" className="...">Dipinjam</TabsTrigger>
                  <TabsTrigger value="pengembalian" className="...">Pengembalian</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="menunggu" className="mt-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#0E4D97] mb-2">Konfirmasi Peminjaman</h2>
                  <Input placeholder="Cari berdasarkan judul buku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-6 pl-10" />
                  <DataTableHome
                    columns={columnsMenunggu}
                    data={filteredMenunggu.slice((pagination.menunggu.page - 1) * pagination.menunggu.perPage, pagination.menunggu.page * pagination.menunggu.perPage)}
                    page={pagination.menunggu.page}
                    setPage={(p) => setPagination(prev => ({ ...prev, menunggu: { ...prev.menunggu, page: p } }))}
                    perPage={pagination.menunggu.perPage}
                    setPerPage={(pp) => setPagination(prev => ({ ...prev, menunggu: { page: 1, perPage: pp } }))}
                    total={filteredMenunggu.length}
                  />
                </div>
              </TabsContent>

              <TabsContent value="dipinjam" className="mt-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#0E4D97] mb-2">Saat Ini Dipinjam</h2>
                  <Input placeholder="Cari berdasarkan judul buku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-6 pl-10" />
                  <DataTableHome
                    columns={columnsDipinjam}
                    data={filteredDipinjam.slice((pagination.dipinjam.page - 1) * pagination.dipinjam.perPage, pagination.dipinjam.page * pagination.dipinjam.perPage)}
                    page={pagination.dipinjam.page}
                    setPage={(p) => setPagination(prev => ({ ...prev, dipinjam: { ...prev.dipinjam, page: p } }))}
                    perPage={pagination.dipinjam.perPage}
                    setPerPage={(pp) => setPagination(prev => ({ ...prev, dipinjam: { page: 1, perPage: pp } }))}
                    total={filteredDipinjam.length}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pengembalian" className="mt-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#0E4D97] mb-2">Pengembalian</h2>
                  <Input placeholder="Cari berdasarkan judul buku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-6 pl-10" />
                  <DataTableHome
                    columns={columnsPengembalian}
                    data={filteredPengembalian.slice((pagination.pengembalian.page - 1) * pagination.pengembalian.perPage, pagination.pengembalian.page * pagination.pengembalian.perPage)}
                    page={pagination.pengembalian.page}
                    setPage={(p) => setPagination(prev => ({ ...prev, pengembalian: { ...prev.pengembalian, page: p } }))}
                    perPage={pagination.pengembalian.perPage}
                    setPerPage={(pp) => setPagination(prev => ({ ...prev, pengembalian: { page: 1, perPage: pp } }))}
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
