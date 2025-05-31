'use client';

import { StatCard } from "@/app/_components/admin/card";
import { ChartBar } from "@/app/_components/admin/chart-bar";
import { ChartPie } from "@/app/_components/admin/chart-pie";

export default function AdminHome() {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Halo! Admin</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Anggota"
          value={50}
          iconSrc="/group.png"
          className="bg-blue-100"
          textColor="text-blue-700"
          ringColor="ring-blue-300"
          glowColor="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        />
        <StatCard
          title="Total Buku"
          value={150}
          iconSrc="/bukulogo.png"
          className="bg-purple-100"
          textColor="text-purple-700"
          ringColor="ring-purple-300"
          glowColor="drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        />
        <StatCard
          title="Buku Dipinjam"
          value={30}
          iconSrc="/lended.png"
          className="bg-yellow-100"
          textColor="text-yellow-700"
          ringColor="ring-yellow-300"
          glowColor="drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
        />
        <StatCard
          title="Buku Tersedia"
          value={50}
          iconSrc="/bukuada.png"
          className="bg-green-100"
          textColor="text-green-700"
          ringColor="ring-green-300"
          glowColor="drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]"
        />
        <StatCard
          title="Buku Overdue"
          value={5}
          iconSrc="/bukugd.png"
          className="bg-red-100"
          textColor="text-red-700"
          ringColor="ring-red-300"
          glowColor="drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        />
      </div>

      {/* Grafik */}
      <div className="flex gap-8 items-stretch">
        {/* Lebarkan Pie Chart container jadi 320px, dan pakai h-full supaya card setinggi bar chart */}
        <div className="w-[320px] h-full">
          <ChartPie />
        </div>
        {/* Bar chart flex-grow dan min-width serta h-full agar tinggi seragam */}
        <div className="flex-1 min-w-[400px] h-full">
          <ChartBar />
        </div>
      </div>
    </main>
  );
}
