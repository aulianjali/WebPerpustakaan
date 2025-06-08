import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const dataKategori = [
  { name: "Fiksi", value: 45, color: "#0E4D97" }, // Dark blue to match title
  { name: "Non-Fiksi", value: 35, color: "#2563EB" }, // Medium blue
  { name: "Akademik", value: 25, color: "#60A5FA" }, // Light blue
  { name: "Referensi", value: 15, color: "#93C5FD" }, // Very light blue
]

const ChartPie = () => {
  // Split data for 2-row legend
  const firstRow = dataKategori.slice(0, 2)
  const secondRow = dataKategori.slice(2)

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

        {/* Legend in 2 rows */}
        <div className="flex flex-col items-center space-y-2 mt-2">
          {/* First row */}
          <div className="flex justify-center gap-6">
            {firstRow.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Second row */}
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