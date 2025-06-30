"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { Badgemember } from "@/app/_components/member/badge"
import { Card } from "@/app/_components/member/card"
import { PinjamAlert } from "@/app/_components/member/alert-dialog"
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
  const [isBorrowing, setIsBorrowing] = useState(false)

  // Fetch book detail from API
  const fetchBookDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!token) {
        setError("Token tidak tersedia")
        return
      }

      if (!bookId) {
        setError("ID buku tidak valid")
        return
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      console.log("Book detail response:", response.data)

      // Sesuaikan dengan struktur response API Anda
      const bookData = response.data.data || response.data
      setBook(bookData)
    } catch (error: any) {
      console.error("Gagal mengambil detail buku:", error.response?.data || error.message)

      if (error.response?.status === 404) {
        setError("Buku tidak ditemukan")
      } else {
        setError("Gagal memuat detail buku. Silakan coba lagi.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle borrow book
  const handleBorrowBook = () => {
    if (!book || !token || isBorrowing) return

    setIsBorrowing(true)

    console.log("Attempting to borrow book:", {
      bookId: book.id,
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/borrow`,
    })

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/borrow`,
        {
          id_buku: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        console.log("Borrow response:", response.data)
        // alert("Buku berhasil dipinjam!")
        // Refresh book data to get updated stock
        fetchBookDetail()
      })
      .catch((error) => {
        console.error("Full error object:", error)
        console.error("Error response:", error.response)
        console.error("Error message:", error.message)
        console.error("Error status:", error.response?.status)
        console.error("Error data:", error.response?.data)

        let errorMessage = "Gagal meminjam buku. Silakan coba lagi."

        if (error.response) {
          // Server responded with error status
          const status = error.response.status
          const data = error.response.data

          console.log("Server error - Status:", status, "Data:", data)

          if (status === 400) {
            errorMessage = data?.message || "Buku tidak tersedia atau stok habis"
          } else if (status === 401) {
            errorMessage = "Sesi Anda telah berakhir. Silakan login kembali."
          } else if (status === 409) {
            errorMessage = data?.message || "Anda sudah meminjam buku ini"
          } else if (status === 422) {
            errorMessage = data?.message || "Data tidak valid"
          } else if (status >= 500) {
            errorMessage = "Terjadi kesalahan server. Silakan coba lagi nanti."
          } else {
            errorMessage = data?.message || `Error ${status}: ${error.response.statusText}`
          }
        } else if (error.request) {
          // Network error
          console.log("Network error:", error.request)
          errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        } else {
          // Other error
          console.log("Other error:", error.message)
          errorMessage = error.message || "Terjadi kesalahan yang tidak diketahui"
        }

        alert(errorMessage)
      })
      .finally(() => {
        setIsBorrowing(false)
      })
  }

  useEffect(() => {
    if (bookId) {
      fetchBookDetail()
    }
  }, [bookId])

  // Handle retry fetch
  const handleRetry = () => {
    fetchBookDetail()
  }

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <Card className="p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Image skeleton */}
        <div className="flex flex-col items-center w-full md:w-[240px] flex-shrink-0">
          <div className="w-[200px] h-[280px] md:w-[220px] md:h-[310px] rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse" />
          <div className="flex gap-3 mt-6 w-full justify-center">
            <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Info skeleton */}
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

      {/* Synopsis skeleton */}
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

  // Error State
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
        {/* Breadcrumb */}
        <div className="mb-2">
          <DynamicBreadcrumb />
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !isLoading && <ErrorState />}

        {/* Content */}
        {book && !isLoading && !error && (
          <Card className="p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto shadow-md rounded-xl">
            {/* Bagian atas: Gambar + Info */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-10">
              {/* Gambar buku dan status */}
              <div className="flex flex-col items-center w-full md:w-[240px] flex-shrink-0">
                <div className="w-[200px] h-[280px] md:w-[220px] md:h-[310px] rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-white border border-gray-100 relative">
                  {/* Loading spinner for image */}
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

                <div className="flex gap-3 mt-6 w-full justify-center">
                  <Badgemember
                    label={book.stock > 0 ? "Tersedia" : "Habis"}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                      book.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  />
                  {book.stock > 0 ? (
                    <PinjamAlert
                      bookData={{
                        judul: book.judul,
                        penulis: book.penulis,
                        penerbit: book.penerbit || "Tidak diketahui",
                        tahun: book.tahun_terbit?.toString() || "Tidak diketahui",
                      }}
                      onConfirm={handleBorrowBook}
                      isLoading={isBorrowing}
                    />
                  ) : (
                    <button
                      disabled
                      className="px-4 py-1.5 text-sm font-medium rounded-md bg-[#0E4D97]/50 text-white cursor-not-allowed"
                    >
                      Pinjam
                    </button>
                  )}
                </div>
              </div>

              {/* Info buku */}
              <div className="flex flex-col justify-center w-full space-y-3.5">
                <h1 className="text-xl md:text-2xl font-semibold text-[#0E4D97] mb-2 leading-tight">{book.judul}</h1>

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

            {/* Sinopsis di bawah */}
            {book.sinopsis && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="mb-3 font-semibold text-lg">Sinopsis:</h2>
                <p className="text-justify leading-relaxed">{book.sinopsis}</p>
              </div>
            )}
          </Card>
        )}
      </main>
    </div>
  )
}
