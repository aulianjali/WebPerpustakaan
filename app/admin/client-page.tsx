"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import { Users, Book, BookOpen, BookMarked, Clock } from "lucide-react"

import { StatCard } from "@/app/_components/admin/home/card"
import { ChartBar } from "@/app/_components/admin/home/chart-bar"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import ChartPie from "../_components/admin/home/chart-pie"

interface User {
  id: number
  name: string
  email: string
  role: string
}

export default function ClientHomeAdmin() {
  const token = Cookies.get("token")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // State untuk dashboard stats
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalBooks, setTotalBooks] = useState(0)
  const [availableBooks, setAvailableBooks] = useState(0)
  const [borrowedBooks, setBorrowedBooks] = useState(0)
  const [lateBooks, setLateBooks] = useState(0)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Selamat pagi"
    if (hour < 15) return "Selamat siang"
    if (hour < 18) return "Selamat sore"
    return "Selamat malam"
  }

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
      await fetchUserDataFromAPI()
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }

  const fetchUserDataFromAPI = async () => {
    if (!token) return
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

  const fetchDashboardStats = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }

      // Users
      const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, { headers })
      if (usersRes.data.success) {
        setTotalUsers(usersRes.data.data.total)
      }

      // Books
      const booksRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, { headers })
      if (booksRes.data.success) {
        setTotalBooks(booksRes.data.data.total)
        setAvailableBooks(booksRes.data.data.buku_tersedia)
      }

      // Loans
      const loansRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loans`, { headers })
      if (loansRes.data.success) {
        setBorrowedBooks(loansRes.data.data.total_buku_dipinjam)
        setLateBooks(loansRes.data.data.total_buku_terlambat)
      }
    } catch (error) {
      console.error("Gagal mengambil statistik dashboard:", error)
    }
  }

  useEffect(() => {
    getUserData()
    fetchDashboardStats()

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {/* Breadcrumb */}
      <div className="mb-2">
        <DynamicBreadcrumb />
      </div>

      {/* Header */}
      <div className="mb-6">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#0E4D97]">{user ? `${getGreeting()}, ${user.name}!` : "Selamat datang kembali!"}</h1>
            <p className="text-gray-600 text-sm mt-2">
              Kelola sistem peminjaman dengan mudah dan efisien
            </p>
          </>
        )}
      </div>

      {/* Statistik Card */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 h-[200px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`col-span-1 bg-white border border-gray-200 rounded-lg p-4 ${
                  i === 0 ? "row-span-2 h-full" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4 h-[200px]">
            <div className="col-span-1 row-span-2">
              <StatCard
                title="Total user"
                value={totalUsers}
                icon={<Users size={28} />}
                textColor="text-white"
                borderColor="border-none"
                iconBgColor="bg-white/20"
                className="bg-gradient-to-br from-[#60a5fa] to-[#c084fc] h-full shadow-lg"
                valueSize="text-5xl"
                valueColor="text-white"
                isLarge={true}
                detailHref="/admin/users"
                showDetail={true}
              />
            </div>

            <StatCard
              title="Total Judul Buku"
              value={totalBooks}
              icon={<Book size={20} />}
              textColor="text-[#4338CA]"
              borderColor="border-[#4338CA]/20"
              iconBgColor="bg-[#4338CA]/10"
              className="bg-white h-full shadow-sm"
              valueColor="text-gray-900"
              detailHref="/admin/buku"
              showDetail={true}
            />

            <StatCard
              title="Buku Tersedia"
              value={availableBooks}
              icon={<BookOpen size={20} />}
              textColor="text-[#059669]"
              borderColor="border-[#059669]/20"
              iconBgColor="bg-[#059669]/10"
              className="bg-white h-full shadow-sm"
              valueColor="text-gray-900"
              detailHref="/admin/buku"
              showDetail={true}
            />

            <StatCard
              title="Buku Dipinjam"
              value={borrowedBooks}
              icon={<BookMarked size={20} />}
              textColor="text-[#D97706]"
              borderColor="border-[#D97706]/20"
              iconBgColor="bg-[#D97706]/10"
              className="bg-white h-full shadow-sm"
              valueColor="text-gray-900"
              detailHref="/admin/peminjaman?tab=dipinjam"
              showDetail={true}
            />

            <StatCard
              title="Buku Terlambat"
              value={lateBooks}
              icon={<Clock size={20} />}
              textColor="text-[#DC2626]"
              borderColor="border-[#DC2626]/20"
              iconBgColor="bg-[#DC2626]/10"
              className="bg-white h-full shadow-sm"
              valueColor="text-gray-900"
              detailHref="/admin/peminjaman?tab=dipinjam"
              showDetail={true}
            />
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <ChartBar />
            </div>
            <div className="col-span-1">
              <ChartPie />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
