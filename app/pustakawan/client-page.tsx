"use client"

import { useState, useEffect } from "react"
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

  // Fungsi realtime
  const realtimeDate = new Date().toLocaleDateString("id-ID")
  const realtimeTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-"
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("id-ID")
  }

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "-"
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? "-" : date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        console.error("Token tidak tersedia")
        return
      }

      try {
        const [resMenunggu, resDipinjam, resPengembalian] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/returned`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        setDataMenunggu(Array.isArray(resMenunggu.data.data)
          ? resMenunggu.data.data.map((item: any, i: number) => {
              const peminjam = item.user?.name ?? "Tidak diketahui"
              return {
                no: i + 1,
                judul: item.buku,
                peminjam,
                tanggalPinjam: realtimeDate,
                waktuPinjam: realtimeTime,
              }
            })
          : [])

        setDataDipinjam(Array.isArray(resDipinjam.data.data)
          ? resDipinjam.data.data.map((item: any, i: number) => ({
              no: i + 1,
              judul: item.buku,
              peminjam: item.user?.name ?? "Tidak diketahui",
              sisaWaktu: item.sisa_waktu ?? "-",
            }))
          : [])

        setDataPengembalian(Array.isArray(resPengembalian.data.data)
          ? resPengembalian.data.data.map((item: any, i: number) => ({
              no: i + 1,
              judul: item.buku,
              peminjam: item.user?.name ?? "Tidak diketahui",
              tanggalKembali: formatDate(item.waktu_kembali),
              waktuKembali: formatTime(item.waktu_kembali),
              status: item.terlambat ? "Terlambat" : "Tidak Terlambat",
            }))
          : [])

      } catch (err) {
        console.error("Gagal fetch data pustakawan:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const filterByQuery = (data: any[]) =>
    data.filter((item) =>
      item.judul.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="flex flex-col min-h-screen bg-[#D9DBF3] text-[#0E4D97]">
      <main className="flex-1 p-6">
        <div className="mb-2">
          <DynamicBreadcrumb />
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manajemen Peminjaman</h1>
          <p className="text-gray-600 text-sm mt-2">
            Kelola daftar buku yang harus dikonfirmasi, sedang dipinjam, atau sudah dikembalikan
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <div className="border-b border-gray-200 bg-gray-50/50">
              <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start">
                <TabsTrigger value="menunggu">Menunggu</TabsTrigger>
                <TabsTrigger value="dipinjam">Dipinjam</TabsTrigger>
                <TabsTrigger value="pengembalian">Pengembalian</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="menunggu">
              <div className="p-6">
                <Input
                  placeholder="Cari berdasarkan judul buku..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-6 pl-10"
                />
                <DataTableHome
                  columns={columnsMenunggu}
                  data={filterByQuery(dataMenunggu)}
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
                  total={filterByQuery(dataMenunggu).length}
                />
              </div>
            </TabsContent>

            <TabsContent value="dipinjam">
              <div className="p-6">
                <Input
                  placeholder="Cari berdasarkan judul buku..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-6 pl-10"
                />
                <DataTableHome
                  columns={columnsDipinjam}
                  data={filterByQuery(dataDipinjam)}
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
                  total={filterByQuery(dataDipinjam).length}
                />
              </div>
            </TabsContent>

            <TabsContent value="pengembalian">
              <div className="p-6">
                <Input
                  placeholder="Cari berdasarkan judul buku..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-6 pl-10"
                />
                <DataTableHome
                  columns={columnsPengembalian}
                  data={filterByQuery(dataPengembalian)}
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
                  total={filterByQuery(dataPengembalian).length}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
