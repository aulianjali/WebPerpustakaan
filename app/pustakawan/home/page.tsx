"use client";

import { useState } from "react";
import SearchInput from "@/app/_components/input";
import Table from "@/app/_components/pustakawan/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ConfirmAlert } from "@/app/_components/pustakawan/alert-dialog";
import PaginationControls from "@/app/_components/pustakawan/pagination";

type DataMenunggu = {
  no: number;
  judul: string;
  peminjam: string;
  tanggalPinjam: string;
  waktuPinjam: string;
};

type DataDipinjam = {
  no: number;
  judul: string;
  peminjam: string;
  sisaWaktu: string;
};

type DataPengembalian = {
  no: number;
  judul: string;
  peminjam: string;
  tanggal: string;
  status: string;
};

export default function HomePage() {
  const dataMenunggu: DataMenunggu[] = [
    { no: 1, judul: "Matematika Diskrit", peminjam: "Aqila", tanggalPinjam: "20-04-2025", waktuPinjam: "08.30" },
    { no: 2, judul: "Jaringan Komputer", peminjam: "Rani", tanggalPinjam: "21-04-2025", waktuPinjam: "12.00" },
    { no: 3, judul: "Struktur Data", peminjam: "Budi", tanggalPinjam: "22-04-2025", waktuPinjam: "10.00" },
    { no: 4, judul: "Rekayasa Perangkat Lunak", peminjam: "Citra", tanggalPinjam: "23-04-2025", waktuPinjam: "13.45" },
    { no: 5, judul: "Interaksi Manusia dan Komputer", peminjam: "Eko", tanggalPinjam: "24-04-2025", waktuPinjam: "09.15" },
    { no: 6, judul: "Algoritma dan Pemrograman", peminjam: "Fitri", tanggalPinjam: "25-04-2025", waktuPinjam: "11.30" },
    { no: 7, judul: "Etika Profesi", peminjam: "Gilang", tanggalPinjam: "26-04-2025", waktuPinjam: "14.20" },
  ];

  const dataDipinjam: DataDipinjam[] = [
    { no: 1, judul: "Basis Data", peminjam: "Dika", sisaWaktu: "2 hari" },
    { no: 2, judul: "Sistem Operasi", peminjam: "Nina", sisaWaktu: "1 hari" },
    { no: 3, judul: "Pemrograman Mobile", peminjam: "Hana", sisaWaktu: "4 hari" },
    { no: 4, judul: "Kalkulus", peminjam: "Ivan", sisaWaktu: "3 hari" },
    { no: 5, judul: "Metode Numerik", peminjam: "Joko", sisaWaktu: "5 hari" },
    { no: 6, judul: "Statistika", peminjam: "Kirana", sisaWaktu: "2 hari" },
    { no: 7, judul: "Keamanan Jaringan", peminjam: "Leo", sisaWaktu: "6 hari" },
  ];

  const dataPengembalian: DataPengembalian[] = [
    { no: 1, judul: "Pemrograman Web", peminjam: "Ilham", tanggal: "28-04-2025", status: "Sudah Dikembalikan" },
    { no: 2, judul: "Kecerdasan Buatan", peminjam: "Maya", tanggal: "29-04-2025", status: "Terlambat" },
    { no: 3, judul: "Sistem Digital", peminjam: "Nina", tanggal: "27-04-2025", status: "Sudah Dikembalikan" },
    { no: 4, judul: "Pemrograman Berorientasi Objek", peminjam: "Oscar", tanggal: "26-04-2025", status: "Sudah Dikembalikan" },
    { no: 5, judul: "Sistem Terdistribusi", peminjam: "Putri", tanggal: "25-04-2025", status: "Terlambat" },
    { no: 6, judul: "Cloud Computing", peminjam: "Qori", tanggal: "24-04-2025", status: "Sudah Dikembalikan" },
    { no: 7, judul: "UI/UX Design", peminjam: "Rama", tanggal: "23-04-2025", status: "Terlambat" },
  ];

  const [pageMenunggu, setPageMenunggu] = useState(1);
  const [perPageMenunggu, setPerPageMenunggu] = useState(5);

  const [pageDipinjam, setPageDipinjam] = useState(1);
  const [perPageDipinjam, setPerPageDipinjam] = useState(5);

  const [pagePengembalian, setPagePengembalian] = useState(1);
  const [perPagePengembalian, setPerPagePengembalian] = useState(5);

  const paginated = <T,>(data: T[], page: number, perPage: number) =>
    data.slice((page - 1) * perPage, page * perPage);

  const columnsMenunggu = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    { key: "judul", header: "Judul", align: "left" as const },
    { key: "peminjam", header: "Peminjam", align: "left" as const },
    {
      key: "waktuPengajuan",
      header: "Waktu Pengajuan",
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
      render: () => <ConfirmAlert onConfirm={() => alert("Berhasil dikonfirmasi")} />,
      align: "center" as const,
      width: "80px",
    },
  ];

  const columnsDipinjam = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    { key: "judul", header: "Judul", align: "left" as const },
    { key: "peminjam", header: "Peminjam", align: "left" as const },
    { key: "sisaWaktu", header: "Sisa Waktu", align: "left" as const },
    {
      key: "aksi",
      header: "Aksi",
      render: () => <ConfirmAlert onConfirm={() => alert("Konfirmasi pengembalian")} />,
      align: "center" as const,
      width: "80px",
    },
  ];

  const columnsPengembalian = [
    { key: "no", header: "No", width: "50px", align: "center" as const },
    { key: "judul", header: "Judul", align: "left" as const },
    { key: "peminjam", header: "Peminjam", align: "left" as const },
    { key: "tanggal", header: "Tanggal", align: "left" as const },
    { key: "status", header: "Status", align: "left" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-lg ">Pustakawan</h1>
        <SearchInput placeholder="Cari judul atau peminjam..."  />
      </div>
      <Tabs defaultValue="menunggu">
        <TabsList>
          <TabsTrigger value="menunggu">Menunggu</TabsTrigger>
          <TabsTrigger value="dipinjam">Dipinjam</TabsTrigger>
          <TabsTrigger value="pengembalian">Pengembalian</TabsTrigger>
        </TabsList>

        <TabsContent value="menunggu">
          <Table data={paginated(dataMenunggu, pageMenunggu, perPageMenunggu)} columns={columnsMenunggu} />
          <PaginationControls
            page={pageMenunggu}
            setPage={setPageMenunggu}
            total={dataMenunggu.length}
            perPage={perPageMenunggu}
            setPerPage={setPerPageMenunggu}
          />
        </TabsContent>

        <TabsContent value="dipinjam">
          <Table data={paginated(dataDipinjam, pageDipinjam, perPageDipinjam)} columns={columnsDipinjam} />
          <PaginationControls
            page={pageDipinjam}
            setPage={setPageDipinjam}
            total={dataDipinjam.length}
            perPage={perPageDipinjam}
            setPerPage={setPerPageDipinjam}
          />
        </TabsContent>

        <TabsContent value="pengembalian">
          <Table data={paginated(dataPengembalian, pagePengembalian, perPagePengembalian)} columns={columnsPengembalian} />
          <PaginationControls
            page={pagePengembalian}
            setPage={setPagePengembalian}
            total={dataPengembalian.length}
            perPage={perPagePengembalian}
            setPerPage={setPerPagePengembalian}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
