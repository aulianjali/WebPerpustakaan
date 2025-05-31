'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

const dataKetersediaan = [
  { name: 'Tersedia', value: 50, color: '#10b981' },
  { name: 'Dipinjam', value: 45, color: '#3b82f6' },
  { name: 'Dipesan', value: 5, color: '#facc15' },
];

export function ChartPie() {
  return (
    <Card
      className="pb-1 h-full flex flex-col bg-[#FEFCF3] border border-[#B3B5D1]"
      style={{ boxShadow: "0 0 5px 0 #868896" }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#0E4D97]">
          Ketersediaan Buku
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-start space-y-4 pt-0 pb-4 flex-grow">
        <ResponsiveContainer width={220} height={200}>
          <PieChart>
            <Pie
              data={dataKetersediaan}
              cx="50%"
              cy="48%"
              innerRadius={65}
              outerRadius={85}
              dataKey="value"
              stroke="none"
            >
              {dataKetersediaan.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: '12px' }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex space-x-4 text-sm mt-2">
          {dataKetersediaan.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">
                {item.value}% {item.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
