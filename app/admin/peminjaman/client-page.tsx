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
import { Search } from "lucide-react"

function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Cari berdasarkan judul buku..."
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  )
}

export default function ClientManajemenPeminjaman() {
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-"
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("id-ID")
  }

  const formatTime = (timeStr: string | null | undefined): string => {
    if (!timeStr) return "-"
    const [hour, minute] = timeStr.split(":")
    return `${hour}:${minute}`
  }

  useEffect(() => {
    const fetchDataByTab = async () => {
      if (!token) {
        console.error("Token tidak tersedia")
        return
      }

      setIsLoading(true)

      try {
        if (activeTab === "menunggu") {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setDataMenunggu(
            Array.isArray(res.data.data)
              ? res.data.data.map((item: any, i: number) => ({
                  id: item.id_peminjaman,
                  no: i + 1,
                  judul: item.buku,
                  peminjam: item.user ?? "Tidak diketahui",
                  tanggalPesan: formatDate(item.tanggal_pesan),
                  waktuPesan: formatTime(item.waktu_pesan),
                }))
              : []
          )
        } else if (activeTab === "dipinjam") {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/borrowed`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setDataDipinjam(
            Array.isArray(res.data.data)
              ? res.data.data.map((item: any, i: number) => {
                  let sisaWaktuLabel = "-"
                  if (typeof item.sisa_hari === "number") {
                    if (item.sisa_hari < 0) sisaWaktuLabel = `${Math.abs(item.sisa_hari)} hari lewat`
                    else if (item.sisa_hari === 0) sisaWaktuLabel = "Hari ini"
                    else sisaWaktuLabel = `${item.sisa_hari} hari lagi`
                  }

                  return {
                    id: item.id_peminjaman,
                    no: i + 1,
                    judul: item.buku,
                    peminjam: item.user ?? "Tidak diketahui",
                    sisaWaktu: sisaWaktuLabel,
                  }
                })
              : []
          )
        } else if (activeTab === "pengembalian") {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/returned`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setDataPengembalian(
            Array.isArray(res.data.data)
              ? res.data.data.map((item: any, i: number) => ({
                  id: item.id_peminjaman,
                  no: i + 1,
                  judul: item.buku,
                  peminjam: item.user ?? "Tidak diketahui",
                  tanggalKembali: formatDate(item.tanggal_dikembalikan),
                  waktuKembali: formatTime(item.waktu_dikembalikan),
                  status: item.terlambat ? "Terlambat" : "Tidak Terlambat",
                }))
              : []
          )
        }
      } catch (err) {
        console.error("Gagal fetch data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataByTab()
  }, [activeTab])

  const filterByQuery = (data: any[]) =>
    data.filter((item) => item.judul.toLowerCase().includes(searchQuery.toLowerCase()))

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
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <DataTableHome
                  columns={columnsMenunggu}
                  data={filterByQuery(dataMenunggu).slice(
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
                  total={filterByQuery(dataMenunggu).length}
                />
              </div>
            </TabsContent>

            <TabsContent value="dipinjam">
              <div className="p-6">
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <DataTableHome
                  columns={columnsDipinjam}
                  data={filterByQuery(dataDipinjam).slice(
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
                  total={filterByQuery(dataDipinjam).length}
                />
              </div>
            </TabsContent>

            <TabsContent value="pengembalian">
              <div className="p-6">
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <DataTableHome
                  columns={columnsPengembalian}
                  data={filterByQuery(dataPengembalian).slice(
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
