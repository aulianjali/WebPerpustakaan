"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

export default function RegisterClientPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    const role = Cookies.get("role")
    if (token && role) {
      router.replace(`/${role}`)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok")
      return
    }

    setIsLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      })

      toast.success("Registrasi berhasil! Silakan login.")
      router.push("/login")
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Registrasi gagal. Coba lagi."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex animate-in fade-in duration-1000">
      {/* Kiri: Ilustrasi */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="max-w-md relative z-10 animate-in slide-in-from-left duration-1000 delay-300">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/library.png"
              alt="Library illustration"
              width={400}
              height={400}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
          <div className="text-center mt-8 text-white animate-in slide-in-from-bottom duration-1000 delay-700">
            <h2 className="text-2xl font-bold mb-2">Buat Akun Baru</h2>
            <p className="text-blue-100">dan bergabunglah di ReadWave</p>
          </div>
        </div>
      </div>

      {/* Kanan: Form Register */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6 animate-in slide-in-from-right duration-1000 delay-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-2 rounded px-4 py-1 inline-block">
              Register
            </h1>
            <p className="text-gray-600">Isi data untuk membuat akun baru</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={handleChange}
                className="h-12 border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
                className="h-12 border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={handleChange}
                className="h-12 border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Konfirmasi Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Ulangi password Anda"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-12 border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "Mendaftarkan..." : "Daftar"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline"
              >
                Masuk
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
