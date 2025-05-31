"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeAnggota } from "@/app/_components/anggota/badge";
import { Card } from "@/app/_components/anggota/card";
import { PinjamAlert } from "@/app/_components/anggota/alert-dialog";

export default function DetailBuku() {
  return (
    <div className="flex bg-[#D9DBF3] text-[#0E4D97] min-h-screen">
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="p-8 flex flex-col gap-6 max-w-6xl mx-auto">
          {/* Bagian atas: Gambar + Info */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Gambar buku dan status */}
            <div className="flex flex-col items-center w-full md:w-[220px] flex-shrink-0">
              <div className="w-[200px] h-[280px] rounded shadow overflow-hidden flex items-center justify-center bg-white">
                <Image
                  src="/books/book-1.jpg"
                  alt="The Psychology of Money"
                  width={200}
                  height={280}
                  className="object-contain"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <BadgeAnggota
                  label="Tersedia"
                  className="bg-green-100 text-green-600 px-4 py-1 text-sm rounded-md"
                />
                <PinjamAlert onConfirm={() => alert("Buku berhasil dipinjam!")} />
              </div>
            </div>

            {/* Info buku */}
            <div className="flex flex-col justify-center w-full">
              <p className="mb-2">
                <strong>Judul :</strong> The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness
              </p>
              <p className="mb-2">
                <strong>Penulis :</strong> Morgan Housel
              </p>
              <p className="mb-2">
                <strong>Penerbit :</strong> Harriman House
              </p>
              <p className="mb-2">
                <strong>Tahun Terbit :</strong> 2020
              </p>
              <p className="mb-2">
                <strong>Stok :</strong> 5 
              </p>
            </div>
          </div>

          {/* Sinopsis di bawah */}
          <div>
            <p className="mb-1 font-semibold">Sinopsis :</p>
            <p className="text-justify">
              The Psychology of Money mengeksplorasi bagaimana perilaku manusia memengaruhi
              keputusan finansial lebih dari sekadar angka atau teori ekonomi. Melalui 19 esai pendek,
              Morgan Housel menyoroti bahwa kesuksesan finansial lebih ditentukan oleh perilaku seperti kesabaran,
              pengendalian diri, dan pemahaman akan risiko, dibandingkan dengan kecerdasan atau pengetahuan teknis semata.
            </p>
          </div>
        </Card>

        {/* Tombol kembali */}
        <div className="max-w-6xl mx-auto mt-6 flex justify-end">
          <Link href="/anggota" title="Kembali ke halaman utama">
            <Image
              src="/undo.png"
              width={40}
              height={40}
              alt="kembali"
              className="hover:opacity-80"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
