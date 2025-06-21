"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { type DataBuku } from "@/app/_components/pustakawan/buku/columns-buku"
import { Button } from "@/components/ui/button"

const dummyDataBuku: DataBuku[] = [
  {
    no: 1,
    idBuku: "BK001",
    stok: 5,
    judulBuku: "The Psychology of Money",
    penulis: "Morgan Housel",
    penerbit: "Harriman House",
    tahunTerbit: "2020",
    sinopsis: "Buku tentang psikologi keuangan dan investasi yang mengubah cara pandang tentang uang.",
    imageCover: "/books/book-1.jpg",
  },
  {
    no: 2,
    idBuku: "BK002",
    stok: 3,
    judulBuku: "Laut Bercerita",
    penulis: "Leila S. Chudori",
    penerbit: "Kepustakaan Populer Gramedia",
    tahunTerbit: "2017",
    sinopsis: "Novel tentang kisah mahasiswa aktivis yang hilang pada masa Orde Baru.",
    imageCover: "/placeholder.svg?height=300&width=200",
  },
  {
      no: 3,
      idBuku: "BK003",
      stok: 7,
      judulBuku: "Hujan",
      penulis: "Tere Liye",
      penerbit: "Gramedia Pustaka Utama",
      tahunTerbit: "2016",
      sinopsis: "Novel fantasi tentang petualangan di dunia paralel yang penuh misteri.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 4,
      idBuku: "BK004",
      stok: 2,
      judulBuku: "Filosofi Teras",
      penulis: "Henry Manampiring",
      penerbit: "Kompas Gramedia",
      tahunTerbit: "2018",
      sinopsis: "Panduan praktis filosofi Stoikisme untuk kehidupan sehari-hari.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 5,
      idBuku: "BK005",
      stok: 4,
      judulBuku: "Dunia Sophie",
      penulis: "Jostein Gaarder",
      penerbit: "Mizan",
      tahunTerbit: "2015",
      sinopsis: "Novel filosofi yang mengajarkan sejarah pemikiran filosofis dengan cara yang menarik.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 6,
      idBuku: "BK006",
      stok: 0,
      judulBuku: "Emotional Intelligence",
      penulis: "Daniel Goleman",
      penerbit: "Bantam Books",
      tahunTerbit: "1995",
      sinopsis: "Buku tentang pentingnya kecerdasan emosional dalam kehidupan dan karir.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
    {
      no: 7,
      idBuku: "BK007",
      stok: 0,
      judulBuku: "Atomic Habits",
      penulis: "James Clear",
      penerbit: "Avery",
      tahunTerbit: "2018",
      sinopsis: "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
      imageCover: "/placeholder.svg?height=300&width=200",
    },
]

export default function ClientDetailBuku() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [buku, setBuku] = useState<DataBuku | null>(null)

  useEffect(() => {
    if (typeof id === "string") {
      const found = dummyDataBuku.find((b) => b.idBuku === id)
      setBuku(found ?? null)
    }
  }, [id])

  if (!buku) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Buku tidak ditemukan</h1>
        <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0E4D97] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-start gap-6">
          <img src={buku.imageCover} alt={buku.judulBuku} className="w-48 h-auto rounded shadow" />
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">{buku.judulBuku}</h1>
            <p><strong>ID Buku:</strong> {buku.idBuku}</p>
            <p><strong>Penulis:</strong> {buku.penulis}</p>
            <p><strong>Penerbit:</strong> {buku.penerbit}</p>
            <p><strong>Tahun Terbit:</strong> {buku.tahunTerbit}</p>
            <p><strong>Stok:</strong> {buku.stok}</p>
            <p><strong>Sinopsis:</strong></p>
            <p className="text-gray-700">{buku.sinopsis}</p>
            <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
