"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import {
  BookOpen,
  Home,
  FileCheck,
  History,
  Users,
  BookMarked,
  LogOut,
  ClipboardList,
  Loader2,
} from "lucide-react"
import { Poppins } from "next/font/google"
import Cookies from "js-cookie"
import axios from "axios"

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

export function Sidebarmember() {
  const menumember: MenuItem[] = [
    { label: "Home", icon: <Home size={20} />, path: "/member" },
    { label: "Konfirmasi", icon: <FileCheck size={20} />, path: "/member/konfirmasi" },
    { label: "Riwayat", icon: <History size={20} />, path: "/member/riwayat" },
  ]

  return <Sidebar menu={menumember} />
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

function Sidebar({ menu }: { menu: MenuItem[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const token = Cookies.get("token")

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      setTimeout(() => {
      Cookies.remove("token")
      Cookies.remove("role")
      localStorage.removeItem("refreshToken")
      router.push("/")
    }, 900)
  } catch (error) {
    console.error("Gagal logout:", error)
    setIsLoggingOut(false)
    }
  }

  return (
    <aside className={`${poppins.className} w-[270px] h-full bg-[#0E4D97] text-white flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-[#1E5CA9]/30">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <BookOpen size={20} className="text-white" />
        </div>
      </div>

      {/* Menu */}
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

      {/* Logout */}
      <div className="p-4 border-t border-[#1E5CA9]/30">
        <div
          onClick={isLoggingOut ? undefined : handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
            isLoggingOut
              ? "opacity-70 pointer-events-none"
              : "text-white/80 hover:bg-white/5 hover:text-white"
          }`}
        >
          {isLoggingOut ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span className="font-medium">Logging out...</span>
            </>
          ) : (
            <>
              <LogOut size={20} className="text-current" />
              <span className="font-medium">Logout</span>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
