"use client";

import SearchInput from "@/app/_components/input";
import Table from "@/app/_components/anggota/table"; // pastikan path sudah sesuai
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ButtonBatal } from "@/app/_components/anggota/button"; // import ButtonBatal

export default function KonfirmasiPage() {
  const dataBerhasil = [
    { no: 1, judul: "Pemrograman Dasar", tanggalKonfirm: "17-04-2025", waktuKonfirm: "10.14" },
    { no: 2, judul: "Bandung After Rain", tanggalKonfirm: "18-04-2025", waktuKonfirm: "09.01" },
    { no: 3, judul: "Seporsi Mie Ayam Sebelum", tanggalKonfirm: "18-04-2025", waktuKonfirm: "09.01" },
    { no: 4, judul: "Desain Web Responsif", tanggalKonfirm: "19-04-2025", waktuKonfirm: "11.45" },
  ];

  const dataMenunggu = [
    { no: 1, judul: "Matematika Diskrit", tanggalPinjam: "20-04-2025", waktuPinjam: "08.30" },
    { no: 2, judul: "Jaringan Komputer", tanggalPinjam: "21-04-2025", waktuPinjam: "12.00" },
    { no: 3, judul: "Algoritma dan Struktur Data", tanggalPinjam: "22-04-2025", waktuPinjam: "13.15" },
    { no: 4, judul: "Pengembangan Aplikasi Mobile", tanggalPinjam: "23-04-2025", waktuPinjam: "14.50" },
  ];

  // Columns untuk dataBerhasil
  const columnsBerhasil = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: typeof dataBerhasil[0]) => (
        <span className="font-medium text-[#0E4D97]">{item.judul}</span>
      ),
    },
    {
      key: "waktuKonfirm",
      header: "Waktu Konfirm",
      render: (item: typeof dataBerhasil[0]) => (
        <>
          <span className="font-bold">{item.tanggalKonfirm}</span> {item.waktuKonfirm}
        </>
      ),
      align: "left" as const,
    },
  ];

  // Columns untuk dataMenunggu
  const columnsMenunggu = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: typeof dataMenunggu[0]) => (
        <span className="font-medium text-[#0E4D97]">{item.judul}</span>
      ),
    },
    {
      key: "waktuPinjam",
      header: "Waktu Pinjam",
      render: (item: typeof dataMenunggu[0]) => (
        <>
          <span className="font-bold">{item.tanggalPinjam}</span> {item.waktuPinjam}
        </>
      ),
      align: "left" as const,
    },
    {
      key: "aksi",
      header: "Aksi",
      render: () => (
        <ButtonBatal onClick={() => alert("yah kok dibatalin")} />
      ),
      align: "center" as const,
      width: "80px",
    },
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Konfirmasi</h1>
          <div className="w-[280px]">
            <SearchInput type="text" placeholder="Pencarian" />
          </div>
        </div>

        <Tabs defaultValue="berhasil" className="mb-4">
          <TabsList>
            <TabsTrigger value="berhasil">Berhasil konfirmasi</TabsTrigger>
            <TabsTrigger value="menunggu">Menunggu konfirmasi</TabsTrigger>
          </TabsList>

          <TabsContent value="berhasil">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Berhasil Konfirmasi</h2>
              <Table data={dataBerhasil} columns={columnsBerhasil} />
            </div>
          </TabsContent>

          <TabsContent value="menunggu">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Menunggu Konfirmasi</h2>
              <Table data={dataMenunggu} columns={columnsMenunggu} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
