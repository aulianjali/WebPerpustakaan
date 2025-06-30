"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { SelectChartFilter } from "@/app/_components/admin/home/select-chart"
import { toast } from "sonner"
import Cookies from "js-cookie"

type RecapItem = {
  bulan: string // "2025-06"
  total_berhasil: string // string from API, will be parsed to number
  total_terlambat: string
}

type ChartData = {
  name: string // e.g. "Jan"
  peminjaman: number
  terlambat: number
}

const monthMap = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const renderLegend = (props: any) => {
  const { payload } = props
  return (
    <div className="flex justify-center gap-6 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-[#0E4D97] font-medium">
            {entry.value === "peminjaman" ? "Peminjaman" : "Terlambat"}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ChartBar() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [dataPerTahun, setDataPerTahun] = useState<Record<string, ChartData[]>>({})

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = Cookies.get("token")
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans/recap`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        const recap: RecapItem[] = response.data.data

        const groupedByYear: Record<string, ChartData[]> = {}

        recap.forEach((item) => {
          const [year, month] = item.bulan.split("-")
          const monthIndex = parseInt(month, 10) - 1

          const entry: ChartData = {
            name: monthMap[monthIndex] || month,
            peminjaman: parseInt(item.total_berhasil),
            terlambat: parseInt(item.total_terlambat),
          }

          if (!groupedByYear[year]) groupedByYear[year] = []
          groupedByYear[year].push(entry)
        })

        // Urutkan bulan per tahun (Jan–Dec)
        Object.keys(groupedByYear).forEach((year) => {
          groupedByYear[year].sort(
            (a, b) => monthMap.indexOf(a.name) - monthMap.indexOf(b.name)
          )
        })

        setDataPerTahun(groupedByYear)
      } catch (error: any) {
        console.error("❌ Gagal fetch chart data:", error)
        toast.error("Gagal memuat data grafik peminjaman.")
      }
    }

    fetchChartData()
  }, [])

  const data = dataPerTahun[selectedYear] || []

  return (
    <Card className="w-full bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg h-full">
      <CardHeader className="pb-2 flex flex-col md:flex-row md:justify-between gap-2">
        <CardTitle className="text-lg font-semibold text-[#0E4D97]">
          Tren Peminjaman Buku
        </CardTitle>
        <SelectChartFilter value={selectedYear} onChange={setSelectedYear} />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-start">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              stroke="#0E4D97"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#0E4D97" }}
            />
            <YAxis
              stroke="#0E4D97"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#0E4D97" }}
            />
            <Tooltip
              formatter={(value, name) => [
                `${value}`,
                name === "peminjaman" ? "Peminjaman" : "Terlambat",
              ]}
              cursor={{ fill: "rgba(14, 77, 151, 0.1)" }}
            />
            <Legend content={renderLegend} />
            <Bar
              dataKey="peminjaman"
              fill="#3B82F6"
              radius={[2, 2, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="terlambat"
              fill="#1E40AF"
              radius={[2, 2, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
