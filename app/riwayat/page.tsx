"use client";

import { useState } from "react";
import Image from "next/image";

export default function RiwayatPage() {
  const [activeTab, setActiveTab] = useState("sedang");

  const dataRiwayat = [
    { no: 1, judul: "Hujan", tanggalPinjam: "01-04-2025", tanggalKembali: "08-04-2025", status: "Tidak Terlambat" },
    { no: 2, judul: "Bulan", tanggalPinjam: "05-04-2025", tanggalKembali: "15-04-2025", status: "Terlambat" },
    { no: 3, judul: "Bintang", tanggalPinjam: "10-04-2025", tanggalKembali: "17-04-2025", status: "Tidak Terlambat" },
  ];

  const dataSedangDipinjam = [
    { no: 1, judul: "3726 MDPL", tanggalPinjam: "01-05-2025", deadlineKembali: "08-05-2025" },
    { no: 2, judul: "Pemrograman Web", tanggalPinjam: "01-05-2025", deadlineKembali: "08-05-2025" },
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[270px] bg-[#0E4D97] text-white p-4 flex flex-col gap-6 pt-8">
        <div className="flex justify-center mb-4">
          <Image src="/globe.svg" alt="Logo" width={80} height={80} className="rounded-full bg-white p-2" />
        </div>
        <div className="flex flex-col gap-2">
          <SidebarItem label="Home" icon="/home.png" />
          <SidebarItem label="Konfirmasi" icon="/confirm.png" />
          <SidebarItem label="Riwayat" icon="/file.png" />
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Riwayat Peminjaman</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Pencarian"
              className="pl-10 pr-4 py-2 rounded shadow-sm bg-[#FEFCF3] border border-[#9FA8C2] focus:outline-none focus:ring-1 focus:ring-[#094B9B]"
            />
            <span className="absolute left-3 top-2.5">
              <Image src="/search.png" alt="search icon" width={20} height={20} />
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-4">
          <button
            className={`text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "sedang"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
            }`}
            onClick={() => setActiveTab("sedang")}
          >
            Sedang Dipinjam
          </button>
          <button
            className={`text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "riwayat"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
            }`}
            onClick={() => setActiveTab("riwayat")}
          >
            Riwayat
          </button>
        </div>

        {/* Tabel Sedang Dipinjam */}
        {activeTab === "sedang" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Sedang Dipinjam</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead className="bg-[#E0E7FF] text-left">
                  <tr>
                    <th className="px-6 py-3 border font-semibold">No</th>
                    <th className="px-6 py-3 border font-semibold">Judul</th>
                    <th className="px-6 py-3 border font-semibold">Tanggal Pinjam</th>
                    <th className="px-6 py-3 border font-semibold">Deadline Kembali</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSedangDipinjam.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border">{item.judul}</td>
                      <td className="px-6 py-3 border">{item.tanggalPinjam}</td>
                      <td className="px-6 py-3 border">{item.deadlineKembali}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabel Riwayat */}
        {activeTab === "riwayat" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Riwayat</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead className="bg-[#E0E7FF] text-left">
                  <tr>
                    <th className="px-6 py-3 border font-semibold">No</th>
                    <th className="px-6 py-3 border font-semibold">Judul</th>
                    <th className="px-6 py-3 border font-semibold">Tanggal Pinjam</th>
                    <th className="px-6 py-3 border font-semibold">Tanggal Kembali</th>
                    <th className="px-6 py-3 border font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRiwayat.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border">{item.judul}</td>
                      <td className="px-6 py-3 border">{item.tanggalPinjam}</td>
                      <td className="px-6 py-3 border">{item.tanggalKembali}</td>
                      <td className={`px-6 py-3 border font-semibold ${item.status === "Terlambat" ? "text-[#F4273F]" : "text-[#22D025]"}`}> 
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#1E5CA9] transition cursor-pointer">
      <Image src={icon} alt={label} width={20} height={20} />
      <span className="ml-2">{label}</span>
    </div>
  );
}
