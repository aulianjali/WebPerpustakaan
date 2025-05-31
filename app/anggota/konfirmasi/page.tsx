"use client";

import { useState } from "react";
import SearchInput from "@/app/_components/input";
import Table from "@/app/_components/anggota/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BatalAlert } from "@/app/_components/anggota/alert-dialog";
import PaginationControls from "@/app/_components/anggota/pagination";

type DataBerhasil = {
  no: number;
  judul: string;
  tanggalKonfirm: string; 
  waktuKonfirm: string;
};

type DataMenunggu = {
  no: number;
  judul: string;
  tanggalPinjam: string;
  waktuPinjam: string;
};

export default function KonfirmasiPage() {
  const dataBerhasil: DataBerhasil[] = Array.from({ length: 100 }, (_, i) => ({
    no: i + 1,
    judul: `Judul Buku ${i + 1}`,
    tanggalKonfirm: `20-04-2025`,
    waktuKonfirm: `${String(8 + (i % 8)).padStart(2, "0")}:${String(15 + (i % 45)).padStart(2, "0")}`,
  }));

  const dataMenunggu: DataMenunggu[] = [
    { no: 1, judul: "Matematika Diskrit", tanggalPinjam: "20-04-2025", waktuPinjam: "08.30" },
    { no: 2, judul: "Jaringan Komputer", tanggalPinjam: "21-04-2025", waktuPinjam: "12.00" },
    { no: 3, judul: "Algoritma dan Struktur Data", tanggalPinjam: "22-04-2025", waktuPinjam: "13.15" },
    { no: 4, judul: "Pengembangan Aplikasi Mobile", tanggalPinjam: "23-04-2025", waktuPinjam: "14.50" },
  ];

  const columnsBerhasil = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: DataBerhasil) => <span className="font-medium text-[#0E4D97]">{item.judul}</span>,
    },
    {
      key: "waktuKonfirm",
      header: "Waktu Konfirm",
      render: (item: DataBerhasil) => (
        <>
          <span className="font-bold">{item.tanggalKonfirm}</span> {item.waktuKonfirm}
        </>
      ),
      align: "left" as const,
    },
  ];

  const columnsMenunggu = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: DataMenunggu) => <span className="font-medium text-[#0E4D97]">{item.judul}</span>,
    },
    {
      key: "waktuPinjam",
      header: "Waktu Pinjam",
      render: (item: DataMenunggu) => (
        <>
          <span className="font-bold">{item.tanggalPinjam}</span> {item.waktuPinjam}
        </>
      ),
      align: "left" as const,
    },
    {
      key: "aksi",
      header: "Aksi",
      render: () => <BatalAlert onConfirm={() => alert("yah kok dibatalin")} />,
      align: "center" as const,
      width: "80px",
    },
  ];

  const [activeTab, setActiveTab] = useState<"berhasil" | "menunggu">("berhasil");

  const [pagination, setPagination] = useState({
    berhasil: { page: 1, perPage: 5 },
    menunggu: { page: 1, perPage: 5 },
  });

  const { page, perPage } = pagination[activeTab];

  // Data sesuai tab
  const currentData = activeTab === "berhasil" ? dataBerhasil : dataMenunggu;

  const paginatedData = currentData.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-auto">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Konfirmasi</h1>
          <div className="w-[280px]">
            <SearchInput type="text" placeholder="Pencarian" />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "berhasil" | "menunggu")}
          className="mb-4"
        >
          <TabsList>
            <TabsTrigger value="berhasil">Berhasil konfirmasi</TabsTrigger>
            <TabsTrigger value="menunggu">Menunggu konfirmasi</TabsTrigger>
          </TabsList>

          <TabsContent value="berhasil">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Berhasil Konfirmasi</h2>
              <Table<DataBerhasil> data={paginatedData as DataBerhasil[]} columns={columnsBerhasil} />
              <PaginationControls
                page={pagination.berhasil.page}
                setPage={(page) =>
                  setPagination((prev) => ({
                    ...prev,
                    berhasil: { ...prev.berhasil, page },
                  }))
                }
                total={dataBerhasil.length}
                perPage={pagination.berhasil.perPage}
                setPerPage={(perPage) =>
                  setPagination((prev) => ({
                    ...prev,
                    berhasil: { page: 1, perPage },
                  }))
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="menunggu">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Menunggu Konfirmasi</h2>
              <Table<DataMenunggu> data={paginatedData as DataMenunggu[]} columns={columnsMenunggu} />
              <PaginationControls
                page={pagination.menunggu.page}
                setPage={(page) =>
                  setPagination((prev) => ({
                    ...prev,
                    menunggu: { ...prev.menunggu, page },
                  }))
                }
                total={dataMenunggu.length}
                perPage={pagination.menunggu.perPage}
                setPerPage={(perPage) =>
                  setPagination((prev) => ({
                    ...prev,
                    menunggu: { page: 1, perPage },
                  }))
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
