"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import SearchInput from "@/app/_components/input"

export default function ClientPageHome() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

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
  ]

  // Filter buku berdasarkan search query
  const filteredBuku = judulBuku.filter((judul) => judul.toLowerCase().includes(searchQuery.toLowerCase()))

  // Simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle image loaded
  const handleImageLoaded = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="text-[#0E4D97] font-medium">Home</span>
      </div>

      {/* Enhanced Header Section */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0E4D97]">Selamat datang kembali manusia!</h1>
          <p className="text-gray-600 text-sm mt-2">Temukan dan pinjam buku favoritmu hari ini</p>
        </div>

        <SearchInput
          type="text"
          placeholder="Cari berdasarkan judul buku..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-16">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="relative w-[150px] h-[220px] bg-gray-200 animate-pulse rounded shadow-md overflow-hidden"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Empty State */}
          {searchQuery && filteredBuku.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0E4D97"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#0E4D97] mb-2">Tidak ada hasil</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Tidak ada buku yang ditemukan untuk "{searchQuery}". Coba kata kunci lain atau periksa ejaan.
              </p>
            </div>
          )}

          {/* Search Results Count */}
          {searchQuery && filteredBuku.length > 0 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              Menampilkan {filteredBuku.length} dari {judulBuku.length} buku
            </div>
          )}
        </>
      )}
    </main>
  )
}