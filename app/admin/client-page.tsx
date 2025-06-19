"use client"

import { useState, useEffect } from "react"
import { StatCard } from "@/app/_components/admin/home/card"
import { ChartBar } from "@/app/_components/admin/home/chart-bar"
import { DynamicBreadcrumb } from "@/app/_components/breadcrumb"
import { Users, Book, BookOpen, BookMarked, Clock } from 'lucide-react'
import ChartPie from "../_components/admin/home/chart-pie"

export default function ClientHomeAdmin() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

      {/* Header Section */}
      <div className="mb-6">
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
        <div className="space-y-6">
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-3 gap-4 h-[200px]">
            {/* Total member Skeleton (besar) */}
            <div className="col-span-1 row-span-2 bg-white border border-gray-200 rounded-lg p-4 h-full">
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>

            {/* Kanan Atas Skeleton */}
            <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Kanan Bawah Skeleton */}
            <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-3 gap-6">
            {/* Bar Chart Skeleton */}
            <div className="col-span-2 bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Pie Chart Skeleton */}
            <div className="col-span-1 bg-[#FEFCF3] border border-[#B3B5D1] rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat Cards - Layout baru */}
          <div className="grid grid-cols-3 gap-4 h-[200px]">
            {/* Total member (besar) - Redesigned dengan gradient biru muda-ungu muda */}
            <div className="col-span-1 row-span-2">
              <StatCard
                title="Total member"
                value={45}
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

            {/* Kanan Atas */}
            <div className="col-span-1">
              <StatCard
                title="Total Buku"
                value={200}
                icon={<Book size={20} />}
                textColor="text-[#4338CA]"
                borderColor="border-[#4338CA]/20"
                iconBgColor="bg-[#4338CA]/10"
                className="bg-white h-full shadow-sm"
                valueColor="text-gray-900"
                detailHref="/admin/buku"
                showDetail={true}
              />
            </div>

            <div className="col-span-1">
              <StatCard
                title="Buku Tersedia"
                value={115}
                icon={<BookOpen size={20} />}
                textColor="text-[#059669]"
                borderColor="border-[#059669]/20"
                iconBgColor="bg-[#059669]/10"
                className="bg-white h-full shadow-sm"
                valueColor="text-gray-900"
                detailHref="/admin/buku"
                showDetail={true}
              />
            </div>

            {/* Kanan Bawah */}
            <div className="col-span-1">
              <StatCard
                title="Buku Dipinjam"
                value={80}
                icon={<BookMarked size={20} />}
                textColor="text-[#D97706]"
                borderColor="border-[#D97706]/20"
                iconBgColor="bg-[#D97706]/10"
                className="bg-white h-full shadow-sm"
                valueColor="text-gray-900"
                detailHref="/admin/peminjaman?tab=dipinjam"
                showDetail={true} 
              />
            </div>

            <div className="col-span-1">
              <StatCard
                title="Buku Terlambat"
                value={5}
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
          </div>

          {/* Charts Section - Dalam satu baris */}
          <div className="grid grid-cols-3 gap-4">
            {/* Bar Chart - 2/3 lebar */}
            <div className="col-span-2">
              <ChartBar />
            </div>
            
            {/* Pie Chart - 1/3 lebar */}
            <div className="col-span-1">
              <ChartPie />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}