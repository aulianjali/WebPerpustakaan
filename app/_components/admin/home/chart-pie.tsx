"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface PieData {
  name: string
  value: number
  color: string
}

const warnaKategori: Record<string, string> = {
  Fiksi: "#123968",
  Nonfiksi: "#0E4D97" ,
  Akademik: "#3B82F6",
  Referensi: "#60A5FA",
  Lainnya: "#93C5FD",
  Komik: "#3B82F6",
  Biografi: "#1D4ED8",
  Sejarah: "#1E40AF",
}

const fallbackBiru = [
  "#0E4D97", "#1D4ED8", "#2563EB", "#3B82F6",
  "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE",
]

const ChartPie = () => {
  const [dataKategori, setDataKategori] = useState<PieData[]>([])

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const token = Cookies.get("token")
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        const dataBuku = res.data.data.data
        const kategoriCount: Record<string, number> = {}

        dataBuku.forEach((buku: any) => {
          const kategori = buku.kategori ?? "Lainnya"
          kategoriCount[kategori] = (kategoriCount[kategori] || 0) + 1
        })

        let colorIndex = 0

        const chartData = Object.entries(kategoriCount).map(([name, value]) => {
          const color = warnaKategori[name] ?? fallbackBiru[colorIndex++ % fallbackBiru.length]
          return { name, value, color }
        })

        setDataKategori(chartData)
      } catch (err) {
        console.error("Gagal fetch kategori buku:", err)
      }
    }

    fetchKategori()
  }, [])

  const firstRow = dataKategori.slice(0, 3)
  const secondRow = dataKategori.slice(3)

  return (
    <Card className="bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#0E4D97]">Kategori Buku</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-start space-y-4 pt-0 pb-4">
        <ResponsiveContainer width={250} height={210}>
          <PieChart>
            <Pie
              data={dataKategori}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              dataKey="value"
              stroke="none"
              paddingAngle={2}
            >
              {dataKategori.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: "12px" }}
              formatter={(value: number, name: string) => [`${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col items-center space-y-2 mt-2">
          <div className="flex justify-center gap-6">
            {firstRow.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6">
            {secondRow.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartPie
