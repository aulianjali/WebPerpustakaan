"use client";

import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("berhasil");

  // Data Berhasil Konfirmasi
  const dataBerhasil = [
    { no: 1, judul: "Pemrograman Dasar", tanggalKonfirm: "17-04-2025", waktuKonfirm: "10.14" },
    { no: 2, judul: "Bandung After Rain", tanggalKonfirm: "18-04-2025", waktuKonfirm: "09.01" },
    { no: 3, judul: "Seporsi Mie Ayam Sebelum", tanggalKonfirm: "18-04-2025", waktuKonfirm: "09.01" },
    { no: 4, judul: "Desain Web Responsif", tanggalKonfirm: "19-04-2025", waktuKonfirm: "11.45" },
  ];

  // Data Menunggu Konfirmasi
  const dataMenunggu = [
    { no: 1, judul: "Matematika Diskrit", tanggalPinjam: "20-04-2025", waktuPinjam: "08.30" },
    { no: 2, judul: "Jaringan Komputer", tanggalPinjam: "21-04-2025", waktuPinjam: "12.00" },
    { no: 3, judul: "Algoritma dan Struktur Data", tanggalPinjam: "22-04-2025", waktuPinjam: "13.15" },
    { no: 4, judul: "Pengembangan Aplikasi Mobile", tanggalPinjam: "23-04-2025", waktuPinjam: "14.50" },
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[270px] bg-[#0E4D97] text-white p-4 flex flex-col gap-6 pt-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/globe.svg"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full bg-white p-2"
          />
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
          <h1 className="text-2xl font-bold text-[#0E4D97]">Konfirmasi</h1>
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
            className={`text-[#0E4D97] text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "berhasil"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
            }`}
            onClick={() => setActiveTab("berhasil")}
          >
            Berhasil konfirmasi
          </button>
          <button
            className={`text-[#0E4D97] text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "menunggu"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E] "
            }`}
            onClick={() => setActiveTab("menunggu")}
          >
            Menunggu konfirmasi
          </button>
        </div>

        {/* Tabel Berhasil Konfirmasi */}
        {activeTab === "berhasil" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Berhasil Konfirmasi</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead>
                  <tr className="bg-[#E0E7FF] text-left">
                    <th className="px-6 py-3 border text-sm font-semibold">No</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Judul</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Waktu Konfirm</th>
                  </tr>
                </thead>
                <tbody>
                  {dataBerhasil.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border text-[#0E4D97] font-medium hover:underline cursor-pointer">
                        {item.judul}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.tanggalKonfirm}</span> {item.waktuKonfirm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabel Menunggu Konfirmasi */}
        {activeTab === "menunggu" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Menunggu Konfirmasi</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead>
                  <tr className="bg-[#E0E7FF] text-left">
                    <th className="px-6 py-3 border text-sm font-semibold">No</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Judul</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Waktu Pinjam</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMenunggu.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border text-[#0E4D97] font-medium hover:underline cursor-pointer">
                        {item.judul}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.tanggalPinjam}</span> {item.waktuPinjam}
                      </td>
                      <td className="px-6 py-3 border text-center">
                        <button className="text-[#F4273F] font-semibold">Batal</button>
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
