"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonPustakawan } from "@/app/_components/pustakawan/button";

export default function HomePustakawanPage() {
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState("berhasil");
=======
  const [activeTab, setActiveTab] = useState("menunggu");
>>>>>>> e017f374e3716455dc1a0f71bc159560e0e04624

  const dataMenungguKonfirmasi = [
    { no: 1, judul: "Pemrograman Dasar", peminjam: "layla", waktuPengajuan: "20-4-2025" },
    { no: 2, judul: "Bandung After Rain", peminjam: "layla", waktuPengajuan: "20-4-2025" },
    { no: 3, judul: "Seporsi Mie Ayam Sebelum", peminjam: "layla", waktuPengajuan: "20-4-2025" },
    { no: 4, judul: "Desain Web Responsif", peminjam: "layla", waktuPengajuan: "20-4-2025" },
  ];

  const dataDipinjam = [
    { no: 1, judul: "Matematika Diskrit", peminjam: "layla", sisaWaktu: "7 hari" },
    { no: 2, judul: "Jaringan Komputer", peminjam: "layla", sisaWaktu: "7 hari" },
    { no: 3, judul: "Algoritma dan Struktur Data", peminjam: "layla", sisaWaktu: "7 hari" },
    { no: 4, judul: "Pengembangan Aplikasi Mobile", peminjam: "layla", sisaWaktu: "7 hari" },
  ];

  const dataPengembalian = [
<<<<<<< HEAD
    { no: 1, judul: "Matematika Diskrit", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat"},
    { no: 2, judul: "Jaringan Komputer", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat" },
    { no: 3, judul: "Algoritma dan Struktur Data", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat"},
    { no: 4, judul: "Pengembangan Aplikasi Mobile", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat"},
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">

      {/* Konten */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Halo! Pustakawan</h1>
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
            Menunggu Konfirmasi
          </button>
          <button
            className={`text-[#0E4D97] text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "menunggu"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E] "
            }`}
            onClick={() => setActiveTab("menunggu")}
          >
            Dipinjam
          </button>
          <button
            className={`text-[#0E4D97] text-lg px-4 py-2 transition-all duration-300 ${
              activeTab === "pengembalian"
                ? "border-b-4 border-[#0E4D97] text-[#0E4D97] font-semibold"
                : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E] "
            }`}
            onClick={() => setActiveTab("pengembalian")}
          >
            Pengembalian
          </button>
        </div>

        {/* Tabel Menunggu Konfirmasi */}
        {activeTab === "berhasil" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Menunggu Konfirmasi</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead>
                  <tr className="bg-[#E0E7FF] text-left">
                    <th className="px-6 py-3 border text-sm font-semibold">No</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Judul</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Peminjam</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Waktu Peminjaman</th>
                    <th className="px-6 py-3 border text-sm font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataMenungguKonfirmasi.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border text-[#0E4D97] font-medium hover:underline cursor-pointer">
                        {item.judul}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.peminjam}</span> 
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.waktuPengajuan}</span> 
                      </td>
                      <td className="px-6 py-3 border">
                        <ButtonPustakawan/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabel Dipinjam */}
        {activeTab === "menunggu" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Dipinjam</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead>
                  <tr className="bg-[#E0E7FF] text-left">
                    <th className="px-6 py-3 border text-sm font-semibold">No</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Judul</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Peminjam</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Sisa Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDipinjam.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border text-[#0E4D97] font-medium hover:underline cursor-pointer">
                        {item.judul}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.peminjam}</span> {item.peminjam}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.sisaWaktu}</span> {item.sisaWaktu}
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

        {/* Tabel Pengembalian */}
        {activeTab === "pengembalian" && (
          <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Pengembalian</h2>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-sm text-[#0E4D97] border border-collapse">
                <thead>
                  <tr className="bg-[#E0E7FF] text-left">
                    <th className="px-6 py-3 border text-sm font-semibold">No</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Judul</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Peminjam</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Tanggal</th>
                    <th className="px-6 py-3 border text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengembalian.map((item) => (
                    <tr key={item.no} className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300">
                      <td className="px-6 py-3 border">{item.no}.</td>
                      <td className="px-6 py-3 border text-[#0E4D97] font-medium hover:underline cursor-pointer">
                        {item.judul}
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.peminjam}</span> 
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.tanggal}</span> 
                      </td>
                      <td className="px-6 py-3 border">
                        <span className="font-bold">{item.status}</span> 
                      </td>
                      <td className="px-6 py-3 border">
                        <ButtonPustakawan/>
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
=======
    { no: 1, judul: "Matematika Diskrit", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat" },
    { no: 2, judul: "Jaringan Komputer", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat" },
    { no: 3, judul: "Algoritma dan Struktur Data", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat" },
    { no: 4, judul: "Pengembangan Aplikasi Mobile", peminjam: "layla", tanggal: "20-4-2025", status: "Tidak Terlambat" },
  ];

  return (
    <main className="p-6 text-[#0E4D97]">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Halo! Pustakawan</h1>
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
            activeTab === "menunggu"
              ? "border-b-4 border-[#0E4D97] font-semibold"
              : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
          }`}
          onClick={() => setActiveTab("menunggu")}
        >
          Menunggu Konfirmasi
        </button>
        <button
          className={`text-lg px-4 py-2 transition-all duration-300 ${
            activeTab === "dipinjam"
              ? "border-b-4 border-[#0E4D97] font-semibold"
              : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
          }`}
          onClick={() => setActiveTab("dipinjam")}
        >
          Dipinjam
        </button>
        <button
          className={`text-lg px-4 py-2 transition-all duration-300 ${
            activeTab === "pengembalian"
              ? "border-b-4 border-[#0E4D97] font-semibold"
              : "hover:border-b-4 hover:border-[#A1C4E9] text-[#34495E]"
          }`}
          onClick={() => setActiveTab("pengembalian")}
        >
          Pengembalian
        </button>
      </div>

      {/* Konten Tab */}
      {activeTab === "menunggu" && (
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Menunggu Konfirmasi</h2>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-sm border border-collapse">
              <thead>
                <tr className="bg-[#E0E7FF] text-left">
                  <th className="px-6 py-3 border">No</th>
                  <th className="px-6 py-3 border">Judul</th>
                  <th className="px-6 py-3 border">Peminjam</th>
                  <th className="px-6 py-3 border">Waktu Peminjaman</th>
                  <th className="px-6 py-3 border"></th>
                </tr>
              </thead>
              <tbody>
                {dataMenungguKonfirmasi.map((item) => (
                  <tr key={item.no} className="hover:bg-[#F3F4F6]">
                    <td className="px-6 py-3 border">{item.no}.</td>
                    <td className="px-6 py-3 border font-medium hover:underline cursor-pointer">{item.judul}</td>
                    <td className="px-6 py-3 border font-bold">{item.peminjam}</td>
                    <td className="px-6 py-3 border font-bold">{item.waktuPengajuan}</td>
                    <td className="px-6 py-3 border">
                      <ButtonPustakawan />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "dipinjam" && (
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Dipinjam</h2>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-sm border border-collapse">
              <thead>
                <tr className="bg-[#E0E7FF] text-left">
                  <th className="px-6 py-3 border">No</th>
                  <th className="px-6 py-3 border">Judul</th>
                  <th className="px-6 py-3 border">Peminjam</th>
                  <th className="px-6 py-3 border">Sisa Waktu</th>
                  <th className="px-6 py-3 border text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataDipinjam.map((item) => (
                  <tr key={item.no} className="hover:bg-[#F3F4F6]">
                    <td className="px-6 py-3 border">{item.no}.</td>
                    <td className="px-6 py-3 border font-medium hover:underline cursor-pointer">{item.judul}</td>
                    <td className="px-6 py-3 border font-bold">{item.peminjam}</td>
                    <td className="px-6 py-3 border font-bold">{item.sisaWaktu}</td>
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

      {activeTab === "pengembalian" && (
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Pengembalian</h2>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-sm border border-collapse">
              <thead>
                <tr className="bg-[#E0E7FF] text-left">
                  <th className="px-6 py-3 border">No</th>
                  <th className="px-6 py-3 border">Judul</th>
                  <th className="px-6 py-3 border">Peminjam</th>
                  <th className="px-6 py-3 border">Tanggal</th>
                  <th className="px-6 py-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {dataPengembalian.map((item) => (
                  <tr key={item.no} className="hover:bg-[#F3F4F6]">
                    <td className="px-6 py-3 border">{item.no}.</td>
                    <td className="px-6 py-3 border font-medium hover:underline cursor-pointer">{item.judul}</td>
                    <td className="px-6 py-3 border font-bold">{item.peminjam}</td>
                    <td className="px-6 py-3 border font-bold">{item.tanggal}</td>
                    <td className="px-6 py-3 border">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
>>>>>>> e017f374e3716455dc1a0f71bc159560e0e04624
  );
}
