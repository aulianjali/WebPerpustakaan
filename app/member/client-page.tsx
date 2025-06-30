"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import { useRouter } from "next/navigation"
import SearchInput from "@/app/_components/input"
import axios from "axios"
import Cookies from "js-cookie"

interface Book {
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

interface User {
  id: number
  name: string
  email: string
  role: string
}

export default function ClientHomemember() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Selamat pagi")
    else if (hour < 15) setGreeting("Selamat siang")
    else if (hour < 18) setGreeting("Selamat sore")
    else setGreeting("Selamat malam")
  }, [])

  const getUserData = async () => {
    try {
      const userDataFromCookie = Cookies.get("user")
      if (userDataFromCookie) {
        const userData = JSON.parse(userDataFromCookie)
        setUser(userData)
        return
      }
      const userDataFromStorage = localStorage.getItem("user")
      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage)
        setUser(userData)
        return
      }
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }

  const fetchUserDataFromAPI = async (token: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })
      if (response.data.success) {
        const userData = response.data.data
        setUser(userData)
        Cookies.set("user", JSON.stringify(userData), { expires: 1 })
        localStorage.setItem("user", JSON.stringify(userData))
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error.response?.data || error.message)
    }
  }

  const fetchBooks = async (token: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })

      const booksData = response.data?.data?.data
      if (Array.isArray(booksData)) {
        setBooks(booksData)
      } else {
        setBooks([])
      }
    } catch (error: any) {
      setError(`Gagal memuat data buku: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Init data
  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      fetchBooks(token)
      getUserData()
      fetchUserDataFromAPI(token)
    } else {
      setError("Token tidak tersedia")
    }
  }, [])

  const filteredBooks = books.filter(
    (book) =>
      book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.penulis?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleImageLoaded = (bookId: number) => {
    setLoadedImages((prev) => ({ ...prev, [bookId]: true }))
  }

  const handleImageError = (bookId: number) => {
    setLoadedImages((prev) => ({ ...prev, [bookId]: true }))
    console.error(`Failed to load image for book ID: ${bookId}`)
  }

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.svg"
    const backendHost = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000"
    try {
      const url = new URL(imageUrl)
      if (url.hostname === "127.0.0.1" || url.hostname === "localhost") {
        return backendHost + url.pathname
      }
      return imageUrl
    } catch {
      return `${backendHost}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
    }
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97]">
      <div className="mb-2">
        <DynamicBreadcrumb />
      </div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0E4D97]">
            {user ? `${greeting}, ${user.name}!` : "Selamat datang kembali!"}
          </h1>
          <p className="text-gray-600 text-sm mt-2">Temukan dan pinjam buku favoritmu hari ini</p>
        </div>
        <SearchInput
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!isLoading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-16">
          {filteredBooks.map((book) => {
            const imageLoaded = loadedImages[book.id]
            return (
              <div
                key={book.id}
                onClick={() => router.push(`/member/buku/${book.id}`)}
                className="relative w-[150px] h-[220px] group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <Loader2 className="h-8 w-8 text-[#0E4D97] animate-spin" />
                  </div>
                )}

                <Image
                  src={getImageUrl(book.image)}
                  alt={book.judul}
                  width={150}
                  height={220}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoaded(book.id)}
                  onError={() => handleImageError(book.id)}
                  // unoptimized
                  priority={book.id === filteredBooks[0]?.id}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4D97]/80 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-3 w-full text-center">
                    <span className="text-white text-sm font-medium line-clamp-2 mb-1">{book.judul}</span>
                    {book.penulis && (
                      <span className="text-white/80 text-xs line-clamp-1">{book.penulis}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
