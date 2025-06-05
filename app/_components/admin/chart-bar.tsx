'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const dataPinjam = [
  { name: 'Jan', pinjam: 20, telat: 30 },
  { name: 'Feb', pinjam: 35, telat: 30 },
  { name: 'Mar', pinjam: 40 },
  { name: 'Apr', pinjam: 55 },
  { name: 'May', pinjam: 45 },
];

export function ChartBar() {
  return (
    <Card
      className="pb-1 bg-[#FEFCF3] border border-[#B3B5D1]"
      style={{ boxShadow: "0 0 5px 0 #868896" }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#0E4D97]">
          Tren Peminjaman Buku
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6 px-2">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={dataPinjam}
            margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
          >
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
              formatter={(value) => [`${value}`, 'Peminjaman']}
              cursor={{ fill: 'rgba(14, 77, 151, 0.1)' }}
            />
            <Bar
              dataKey="pinjam"
              fill="#0E4D97"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
            <Bar
              dataKey="telat"
              fill="#0E4D97"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
