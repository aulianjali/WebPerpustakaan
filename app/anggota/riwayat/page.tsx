"use client";

import { useState } from "react";
import SearchInput from "@/app/_components/input";
import Table from "@/app/_components/anggota/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PaginationControls from "@/app/_components/anggota/pagination";

type DataRiwayat = {
  no: number;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  status: "Terlambat" | "Tidak Terlambat";
};

type DataDipinjam = {
  no: number;
  judul: string;
  tanggalPinjam: string;
  deadlineKembali: string;
};

export default function RiwayatPage() {
  const dataRiwayat: DataRiwayat[] = [
    { no: 1, judul: "Basis Data", tanggalPinjam: "10-04-2025", tanggalKembali: "17-04-2025", status: "Tidak Terlambat" },
    { no: 2, judul: "Pemrograman Web", tanggalPinjam: "11-04-2025", tanggalKembali: "20-04-2025", status: "Terlambat" },
    { no: 3, judul: "AI Dasar", tanggalPinjam: "12-04-2025", tanggalKembali: "19-04-2025", status: "Tidak Terlambat" },
    { no: 4, judul: "Sistem Informasi", tanggalPinjam: "13-04-2025", tanggalKembali: "22-04-2025", status: "Terlambat" },
  ];

  const dataDipinjam: DataDipinjam[] = [
    { no: 1, judul: "Sistem Operasi", tanggalPinjam: "24-05-2025", deadlineKembali: "31-05-2025" },
    { no: 2, judul: "Jaringan", tanggalPinjam: "25-05-2025", deadlineKembali: "01-06-2025" },
  ];

  const columnsRiwayat = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: DataRiwayat) => <span className="font-medium text-[#0E4D97]">{item.judul}</span>,
    },
    { key: "tanggalPinjam", header: "Tanggal Pinjam", align: "center" as const },
    { key: "tanggalKembali", header: "Tanggal Kembali", align: "center" as const },
    {
      key: "status",
      header: "Status",
      align: "center" as const,
      render: (item: DataRiwayat) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            item.status === "Terlambat"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const columnsDipinjam = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    {
      key: "judul",
      header: "Judul",
      align: "left" as const,
      render: (item: DataDipinjam) => <span className="font-medium text-[#0E4D97]">{item.judul}</span>,
    },
    { key: "tanggalPinjam", header: "Tanggal Pinjam", align: "center" as const },
    { key: "deadlineKembali", header: "Deadline Kembali", align: "center" as const },
  ];

  const [activeTab, setActiveTab] = useState<"dipinjam" | "riwayat">("dipinjam");

  const [pagination, setPagination] = useState({
    riwayat: { page: 1, perPage: 5 },
    dipinjam: { page: 1, perPage: 5 },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-auto">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Riwayat Peminjaman</h1>
          <div className="w-[280px]">
            <SearchInput type="text" placeholder="Pencarian" />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "dipinjam" | "riwayat")}
          className="mb-4"
        >
          <TabsList>
            <TabsTrigger value="dipinjam">Sedang dipinjam</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
          </TabsList>

          <TabsContent value="dipinjam">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Sedang Dipinjam</h2>
              <Table<DataDipinjam>
                data={dataDipinjam.slice(
                  (pagination.dipinjam.page - 1) * pagination.dipinjam.perPage,
                  pagination.dipinjam.page * pagination.dipinjam.perPage
                )}
                columns={columnsDipinjam}
              />
              <PaginationControls
                page={pagination.dipinjam.page}
                setPage={(page) =>
                  setPagination((prev) => ({
                    ...prev,
                    dipinjam: { ...prev.dipinjam, page },
                  }))
                }
                total={dataDipinjam.length}
                perPage={pagination.dipinjam.perPage}
                setPerPage={(perPage) =>
                  setPagination((prev) => ({
                    ...prev,
                    dipinjam: { page: 1, perPage },
                  }))
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="riwayat">
            <div className="bg-white p-4 rounded shadow-lg transition-all duration-300">
              <h2 className="text-lg font-bold mb-4 text-[#0E4D97]">Riwayat</h2>
              <Table<DataRiwayat>
                data={dataRiwayat.slice(
                  (pagination.riwayat.page - 1) * pagination.riwayat.perPage,
                  pagination.riwayat.page * pagination.riwayat.perPage
                )}
                columns={columnsRiwayat}
              />
              <PaginationControls
                page={pagination.riwayat.page}
                setPage={(page) =>
                  setPagination((prev) => ({
                    ...prev,
                    riwayat: { ...prev.riwayat, page },
                  }))
                }
                total={dataRiwayat.length}
                perPage={pagination.riwayat.perPage}
                setPerPage={(perPage) =>
                  setPagination((prev) => ({
                    ...prev,
                    riwayat: { page: 1, perPage },
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
