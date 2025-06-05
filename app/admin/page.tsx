"use client"

import { useState, useEffect } from "react"
import { StatCard } from "@/app/_components/admin/card"
import { ChartBar } from "@/app/_components/admin/chart-bar"
import { ChartPie } from "@/app/_components/admin/chart-pie"

export default function AdminHomePage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulasi loading saat halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Loading selama 1 detik

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="text-[#0E4D97] font-medium">Home</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#0E4D97]">Selamat datang, Admin!</h1>
            <p className="text-gray-600 text-sm mt-2">Kelola sistem peminjaman dengan mudah dan efisien</p>
          </>
        )}
      </div>

      {/* Admin Cards */}
      {isLoading ? (
        <div className="space-y-8">
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-56 bg-white border border-[#B3B5D1] rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 5px 0 #868896" }}
              >
                <div className="flex flex-col items-center pt-4 space-y-4">
                  {/* Icon Skeleton */}
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>

                  {/* Title Skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>

                  {/* Value Skeleton */}
                  <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart Skeleton */}
            <div
              className="bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg overflow-hidden"
              style={{ boxShadow: "0 0 5px 0 #868896" }}
            >
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-40 animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-end space-x-2">
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                      <div
                        className="bg-gray-200 rounded-t animate-pulse w-8"
                        style={{ height: `${Math.random() * 100 + 50}px` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pie Chart Skeleton */}
            <div
              className="bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg overflow-hidden"
              style={{ boxShadow: "0 0 5px 0 #868896" }}
            >
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>
                <div className="flex flex-col items-center space-y-4">
                  {/* Circle Skeleton */}
                  <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>

                  {/* Legend Skeleton */}
                  <div className="flex space-x-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-1">
                        <div className="w-2.5 h-2.5 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              title="Total Anggota"
              value={45}
              iconSrc="/group.png"
              textColor="text-blue-600"
              ringColor="ring-blue-300"
              glowColor="0 0 12px rgba(59,130,246,0.6)"
              className="bg-blue-50"
            />

            <StatCard
              title="Total Buku"
              value={200}
              iconSrc="/bukulogo.png"
              textColor="text-purple-600"
              ringColor="ring-purple-300"
              glowColor="0 0 12px rgba(168,85,247,0.6)"
              className="bg-purple-50"
            />

            <StatCard
              title="Buku Tersedia"
              value={115}
              iconSrc="/bukuada.png"
              textColor="text-green-600"
              ringColor="ring-green-300"
              glowColor="0 0 12px rgba(34,197,94,0.6)"
              className="bg-green-50"
            />

            <StatCard
              title="Buku Dipinjam"
              value={80}
              iconSrc="/lended.png"
              textColor="text-yellow-600"
              ringColor="ring-yellow-300"
              glowColor="0 0 12px rgba(234,179,8,0.6)"
              className="bg-yellow-50"
            />

            <StatCard
              title="Buku Terlambat"
              value={5}
              iconSrc="/bukugd.png"
              textColor="text-red-600"
              ringColor="ring-red-300"
              glowColor="0 0 12px rgba(239,68,68,0.6)"
              className="bg-red-50"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartBar />
            <ChartPie />
          </div>
        </div>
      )}
    </main>
  )
}
