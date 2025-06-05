"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { BadgeAnggota } from "@/app/_components/anggota/badge"
import { Card } from "@/app/_components/anggota/card"
import { PinjamAlert } from "@/app/_components/anggota/alert-dialog"

export default function DetailBuku() {
  return (
    <div className="flex bg-[#D9DBF3] text-[#0E4D97] min-h-screen">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 max-w-6xl mx-auto">
          <span className="hover:text-[#0E4D97] cursor-pointer">Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#0E4D97] font-medium">Detail Buku</span>
        </div>

        <Card className="p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto shadow-md rounded-xl">
          {/* Bagian atas: Gambar + Info */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Gambar buku dan status */}
            <div className="flex flex-col items-center w-full md:w-[240px] flex-shrink-0">
              <div className="w-[200px] h-[280px] md:w-[220px] md:h-[310px] rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-white border border-gray-100">
                <Image
                  src="/books/book-1.jpg"
                  alt="The Psychology of Money"
                  width={220}
                  height={310}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex gap-3 mt-6 w-full justify-center">
                <BadgeAnggota
                  label="Tersedia"
                  className="bg-green-100 text-green-600 px-4 py-1.5 text-sm font-medium rounded-md"
                />
                <PinjamAlert onConfirm={() => alert("Buku berhasil dipinjam!")} />
              </div>
            </div>

            {/* Info buku */}
            <div className="flex flex-col justify-center w-full space-y-3.5">
              <h1 className="text-xl md:text-2xl font-semibold text-[#0E4D97] mb-2 leading-tight">
                The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness
              </h1>

              {/* Opsi 1: Format Natural (tanpa grid) */}
              <div className="space-y-2 text-base">
                <p>
                  <span className="font-semibold">Penulis:</span> Morgan Housel
                </p>
                <p>
                  <span className="font-semibold">Penerbit:</span> Harriman House
                </p>
                <p>
                  <span className="font-semibold">Tahun Terbit:</span> 2020
                </p>
                <p>
                  <span className="font-semibold">Stok:</span> 5
                </p>
              </div>

              {/* Opsi 2: Format Grid (sejajar) - comment out yang ini jika pakai opsi 1 */}
              {/* <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-1 text-base">
                <span className="font-semibold">Penulis:</span>
                <span>Morgan Housel</span>

                <span className="font-semibold">Penerbit:</span>
                <span>Harriman House</span>

                <span className="font-semibold">Tahun Terbit:</span>
                <span>2020</span>

                <span className="font-semibold">Stok:</span>
                <span>5</span>
              </div> */}
            </div>
          </div>

          {/* Sinopsis di bawah */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="mb-3 font-semibold text-lg">Sinopsis:</h2>
            <p className="text-justify leading-relaxed">
              The Psychology of Money mengeksplorasi bagaimana perilaku manusia memengaruhi keputusan finansial lebih
              dari sekadar angka atau teori ekonomi. Melalui 19 esai pendek, Morgan Housel menyoroti bahwa kesuksesan
              finansial lebih ditentukan oleh perilaku seperti kesabaran, pengendalian diri, dan pemahaman akan risiko,
              dibandingkan dengan kecerdasan atau pengetahuan teknis semata.
            </p>
          </div>
        </Card>

        {/* Tombol kembali */}
        <div className="max-w-6xl mx-auto mt-6 flex justify-end">
          <Link
            href="/anggota"
            title="Kembali ke halaman utama"
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <Image src="/undo.png" width={44} height={44} alt="kembali" className="drop-shadow-sm" />
          </Link>
        </div>
      </main>
    </div>
  )
}
