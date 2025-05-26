'use client';

import Image from "next/image";
import Link from "next/link";

import SearchInput from "@/app/_components/input";

export default function Home() {
  const judulBuku = [
    "The Psychology of Money",
    "Laut Bercerita",
    "Hujan",
    "Bulan",
    "Bintang",
    "Ceros dan Batozar",
    "Dunia Sophie",
    "Filosofi Teras",
    "Obat Dungu Resep Akal Sehat",
    "3726 MDPL",
    "Teruslah Bodoh Jangan Pintar",
    "Emotional Intelligence",
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97]">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-[#0E4D97]">Halo! Manusia</h1>

        <SearchInput
          type="text"
          placeholder="Pencarian"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-16">
        {judulBuku.map((judul, i) => (
          <Link key={i} href={`/buku/${i + 1}`}>
            <div className="relative w-[150px] h-[220px] group cursor-pointer overflow-hidden rounded shadow-md">
              <Image
                src={`/books/book-${i + 1}.jpg`}
                alt={judul}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-[#0E4D97] text-sm font-semibold text-center px-2">
                  {judul}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
