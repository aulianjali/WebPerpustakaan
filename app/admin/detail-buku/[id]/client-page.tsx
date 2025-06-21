"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { Card } from "@/app/_components/member/card"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import axios from "axios"
import Cookies from "js-cookie"

interface BookDetail {
  id: number
  judul: string
  penulis: string
  penerbit: string | null
  tahun_terbit: number | null
  kategori: string | null
  stock: number
  image: string
  sinopsis: string
}

export default function ClientDetailBuku() {
  const params = useParams()
  const router = useRouter()
  const bookId = params.id as string
  const token = Cookies.get("token")

  const [book, setBook] = useState<BookDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const fetchBookDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!token || !bookId) {
        setError("Token atau ID buku tidak tersedia")
        return
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      const bookData = response.data.data || response.data
      setBook(bookData)
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError("Buku tidak ditemukan")
      } else {
        setError("Gagal memuat detail buku. Silakan coba lagi.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (bookId) {
      fetchBookDetail()
    }
  }, [bookId])

  const handleRetry = () => {
    fetchBookDetail()
  }

  const LoadingSkeleton = () => (
    <Card className="p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="flex flex-col items-center w-full md:w-[240px] flex-shrink-0">
          <div className="w-[200px] h-[280px] md:w-[220px] md:h-[310px] rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col justify-center w-full space-y-3.5">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </Card>
  )

  const ErrorState = () => (
    <Card className="p-6 md:p-8 max-w-6xl mx-auto shadow-md rounded-xl">
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 mb-4 bg-red-50 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-600 mb-2">Terjadi Kesalahan</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-[#0E4D97] text-white rounded-lg hover:bg-[#0E4D97]/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </Card>
  )

  return (
    <div className="flex bg-[#D9DBF3] text-[#0E4D97] min-h-screen">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
        <div className="mb-2">
          <DynamicBreadcrumb />
        </div>

        {isLoading && <LoadingSkeleton />}
        {error && !isLoading && <ErrorState />}

        {book && !isLoading && !error && (
          <Card className="p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto shadow-md rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10">
              <div className="flex flex-col items-center w-full md:w-[240px] flex-shrink-0">
                <div className="w-[200px] h-[280px] md:w-[220px] md:h-[310px] rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-white border border-gray-100 relative">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Loader2 className="h-8 w-8 text-[#0E4D97] animate-spin" />
                    </div>
                  )}
                  <Image
                    src={book.image || `/placeholder.svg?height=310&width=220`}
                    alt={book.judul}
                    width={220}
                    height={310}
                    className={`object-contain transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center w-full space-y-3.5">
                <h1 className="text-xl md:text-2xl font-semibold text-[#0E4D97] mb-2 leading-tight">
                  {book.judul}
                </h1>

                <div className="space-y-2 text-base">
                  <p>
                    <span className="font-semibold">Penulis:</span> {book.penulis}
                  </p>
                  {book.penerbit && (
                    <p>
                      <span className="font-semibold">Penerbit:</span> {book.penerbit}
                    </p>
                  )}
                  {book.tahun_terbit && (
                    <p>
                      <span className="font-semibold">Tahun Terbit:</span> {book.tahun_terbit}
                    </p>
                  )}
                  {book.kategori && (
                    <p>
                      <span className="font-semibold">Kategori:</span> {book.kategori}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Stok:</span> {book.stock}
                  </p>
                </div>
              </div>
            </div>

            {book.sinopsis && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="mb-3 font-semibold text-lg">Sinopsis:</h2>
                <p className="text-justify leading-relaxed">{book.sinopsis}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0E4D97] rounded-md hover:bg-[#0E4D97]/90 transition-colors"
              >
                Kembali
              </button>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
