"use client"

import React from "react"
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

// Data per tahun (bisa ambil dari API nantinya)
const dataPerTahun: Record<string, { name: string; peminjaman: number; terlambat: number }[]> = {
  "2023": [
    { name: "Jan", peminjaman: 15, terlambat: 2 },
    { name: "Feb", peminjaman: 25, terlambat: 1 },
    { name: "Mar", peminjaman: 30, terlambat: 2 },
    { name: "Apr", peminjaman: 28, terlambat: 3 },
    { name: "May", peminjaman: 32, terlambat: 2 },
    { name: "Jun", peminjaman: 36, terlambat: 1 },
    { name: "Jul", peminjaman: 40, terlambat: 3 },
    { name: "Aug", peminjaman: 38, terlambat: 2 },
    { name: "Sep", peminjaman: 45, terlambat: 4 },
    { name: "Oct", peminjaman: 48, terlambat: 3 },
    { name: "Nov", peminjaman: 44, terlambat: 2 },
    { name: "Dec", peminjaman: 50, terlambat: 5 },
  ],
  "2024": [
    { name: "Jan", peminjaman: 18, terlambat: 2 },
    { name: "Feb", peminjaman: 30, terlambat: 3 },
    { name: "Mar", peminjaman: 27, terlambat: 1 },
    { name: "Apr", peminjaman: 33, terlambat: 2 },
    { name: "May", peminjaman: 40, terlambat: 4 },
    { name: "Jun", peminjaman: 42, terlambat: 3 },
    { name: "Jul", peminjaman: 39, terlambat: 2 },
    { name: "Aug", peminjaman: 35, terlambat: 2 },
    { name: "Sep", peminjaman: 37, terlambat: 1 },
    { name: "Oct", peminjaman: 44, terlambat: 3 },
    { name: "Nov", peminjaman: 46, terlambat: 3 },
    { name: "Dec", peminjaman: 52, terlambat: 4 },
  ],
  "2025": [
    { name: "Jan", peminjaman: 20, terlambat: 2 },
    { name: "Feb", peminjaman: 35, terlambat: 3 },
    { name: "Mar", peminjaman: 30, terlambat: 1 },
    { name: "Apr", peminjaman: 40, terlambat: 4 },
    { name: "May", peminjaman: 55, terlambat: 5 },
    { name: "Jun", peminjaman: 45, terlambat: 3 },
  ],
}

const renderLegend = (props: any) => {
  const { payload } = props
  return (
    <div className="flex justify-center gap-6 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-[#0E4D97] font-medium">
            {entry.value === "peminjaman" ? "Peminjaman" : "Terlambat"}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ChartBar() {
  const [selectedYear, setSelectedYear] = React.useState("2024")
  const data = dataPerTahun[selectedYear] || []

  return (
    <Card className="w-full bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg h-full">
      <CardHeader className="pb-2 flex flex-col md:flex-row  md:justify-between gap-2">
        <CardTitle className="text-lg font-semibold text-[#0E4D97]">
          Tren Peminjaman Buku
        </CardTitle>
        <SelectChartFilter value={selectedYear} onChange={setSelectedYear} />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-start">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
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
