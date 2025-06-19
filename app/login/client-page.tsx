"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { API_URL } from "@/lib/constant"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  // Redirect kalau sudah login (token tersedia di cookies)
  useEffect(() => {
    const token = Cookies.get("token")
    const role = Cookies.get("role") // role bisa disimpan saat login

    if (token && role) {
      router.replace(`/${role}`)
    }
  }, [router])

  const validateForm = () => {
    const newErrors = { email: "", password: "" }
    let isValid = true

    if (!formData.email) {
      newErrors.email = "Email harus diisi"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi"
      isValid = false
    } else if (formData.password.length < 4) {
      newErrors.password = "Password minimal 4 karakter"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Mohon periksa kembali data yang dimasukkan")
      return
    }

    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      // //const { email, password } = formData
      // const result = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/login`, {email, password}
      // )

      const user = result.data.user
      const token = result.data.token

      // Simpan token dan role ke cookies
      Cookies.set("token", token, { expires: 1 }) // 1 hari
      Cookies.set("role", user.role.toLowerCase(), { expires: 1 })

      toast.success(`Login berhasil! Selamat datang, ${user.name}`)

      // Redirect ke halaman sesuai role
      router.push(`/${user.role.toLowerCase()}`)
    } catch (error: any) {
      toast.error(error.message || "Login gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex animate-in fade-in duration-1000">
      {/* Kiri: ilustrasi */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0E4D97] items-center justify-center p-8 relative overflow-hidden">
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
            <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2>
            <p className="text-blue-100">di Perpustakaan Digital</p>
          </div>
        </div>
      </div>

      {/* Kanan: form login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6 animate-in slide-in-from-right duration-1000 delay-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0E4D97] mb-2">Login</h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top duration-300">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-12 pr-12 transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top duration-300">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#0E4D97] hover:bg-[#0E4D97]/90 text-white font-medium text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <button className="text-[#0E4D97] hover:underline text-sm transition-colors">
              Lupa password?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
