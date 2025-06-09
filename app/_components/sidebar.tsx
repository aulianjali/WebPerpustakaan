"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import { BookOpen, Home, FileCheck, History, Users, BookMarked, LogOut, ClipboardList } from "lucide-react"
import { Poppins } from "next/font/google"

// Inisialisasi font Poppins
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

type MenuItem = {
  label: string
  icon: React.ReactNode
  path: string
}

type Role = "anggota" | "admin" | "pustakawan"

// Komponen Role-Specific
export function SidebarAnggota() {
  const menuAnggota: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/anggota" },
    { label: "Konfirmasi", icon: <FileCheck size={20} />, path: "/anggota/konfirmasi" },
    { label: "Riwayat", icon: <History size={20} />, path: "/anggota/riwayat" },
  ]

  return <Sidebar menu={menuAnggota} />
}

export function SidebarAdmin() {
  const menuAdmin: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/admin" },
    { label: "Manajemen User", icon: <Users size={20} />, path: "/admin/users" },
    { label: "Manajemen Buku", icon: <BookMarked size={20} />, path: "/admin/buku" },
    { label: "Manajemen Peminjaman", icon: <ClipboardList size={20} />, path: "/admin/peminjaman" },
  ]

  return <Sidebar menu={menuAdmin} />
}

export function SidebarPustakawan() {
  const menuPustakawan: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/pustakawan" },
    { label: "Manajemen Buku", icon: <BookMarked size={20} />, path: "/pustakawan/buku" },
  ]

  return <Sidebar menu={menuPustakawan} />
}

// Komponen Sidebar Utama
function Sidebar({ menu }: { menu: MenuItem[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userRole")
    router.push("/landingpage")
  }

  return (
    <aside className={`${poppins.className} w-[270px] h-full bg-[#0E4D97] text-white flex flex-col`}>
      {/* Logo Section - Inspired by the image */}
      <div className="p-6 border-b border-[#1E5CA9]/30">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <BookOpen size={20} className="text-white" />
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4">
        <div className="flex flex-col gap-1">
          {menu.map((item) => (
            <div
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all group ${
                pathname === item.path
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-current">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-[#1E5CA9]/30">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-white/80 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={20} className="text-current" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </aside>
  )
}
