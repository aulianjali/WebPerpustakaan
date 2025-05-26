"use client";

import SearchInput from "@/app/_components/input";
import Table from "@/app/_components/anggota/table"; // pastikan path sudah sesuai
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BadgeAnggota } from "@/app/_components/anggota/badge";

export default function RiwayatPage() {
  const dataRiwayat = [
    { no: 1, judul: "Hujan", tanggalPinjam: "01-04-2025", tanggalKembali: "08-04-2025", status: "Tidak Terlambat" },
    { no: 2, judul: "Bulan", tanggalPinjam: "05-04-2025", tanggalKembali: "15-04-2025", status: "Terlambat" },
    { no: 3, judul: "Bintang", tanggalPinjam: "10-04-2025", tanggalKembali: "17-04-2025", status: "Tidak Terlambat" },
  ];

  const dataSedangDipinjam = [
    { no: 1, judul: "3726 MDPL", tanggalPinjam: "01-05-2025", deadlineKembali: "08-05-2025" },
    { no: 2, judul: "Pemrograman Web", tanggalPinjam: "01-05-2025", deadlineKembali: "08-05-2025" },
  ];

  // Columns untuk dataSedangDipinjam
  const columnsSedangDipinjam = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    { key: "judul", header: "Judul", align: "left" as const, render: (item: typeof dataSedangDipinjam[0]) => (
      <span className="font-medium text-[#0E4D97]">{item.judul}</span>
    )},
    { key: "tanggalPinjam", header: "Tanggal Pinjam", align: "center" as const },
    { key: "deadlineKembali", header: "Deadline Kembali", align: "center" as const },
  ];

  // Columns untuk dataRiwayat
  const columnsRiwayat = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    { key: "judul", header: "Judul", align: "left" as const, render: (item: typeof dataRiwayat[0]) => (
      <span className="font-medium text-[#0E4D97]">{item.judul}</span>
    )},
    { key: "tanggalPinjam", header: "Tanggal Pinjam", align: "center" as const },
    { key: "tanggalKembali", header: "Tanggal Kembali", align: "center" as const },
    { 
      key: "status", 
      header: "Status", 
      align: "center" as const,
      render: (item: typeof dataRiwayat[0]) => (
        <BadgeAnggota
          label={item.status}
          className={
            item.status === "Terlambat"
              ? "bg-red-100 text-red-600 px-4 py-1 text-sm rounded-md"
              : "bg-green-100 text-green-600 px-4 py-1 text-sm rounded-md"
          }
        />
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Riwayat Peminjaman</h1>
          <div className="w-[280px]">
            <SearchInput type="text" placeholder="Pencarian" />
          </div>
        </div>

        <Tabs defaultValue="sedang" className="mb-4">
          <TabsList>
            <TabsTrigger value="sedang">Sedang Dipinjam</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
          </TabsList>

          <TabsContent value="sedang">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300 max-h-[400px] overflow-auto">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Sedang Dipinjam</h2>
              <Table data={dataSedangDipinjam} columns={columnsSedangDipinjam} />
            </div>
          </TabsContent>

          <TabsContent value="riwayat">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300 max-h-[400px] overflow-auto">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Riwayat</h2>
              <Table data={dataRiwayat} columns={columnsRiwayat} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
