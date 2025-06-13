"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { dummyUsers, type DummyUser } from "@/app/_data/dummy-users"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  })

  const router = useRouter()

  const validateForm = () => {
    const newErrors = { emailOrUsername: "", password: "" }
    let isValid = true

    // Validasi email atau username
    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = "Email atau username harus diisi"
      isValid = false
    }

    // Validasi password
    if (!formData.password) {
      newErrors.password = "Password harus diisi"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Fungsi untuk autentikasi user dari dummy data
  const authenticateUser = (emailOrUsername: string, password: string): DummyUser | null => {
    const user = dummyUsers.find(
      (u) => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password,
    )
    return user || null
  }

  // Fungsi untuk menyimpan user session
  const saveUserSession = (user: DummyUser) => {
    // Simpan ke cookie (simulasi - nanti bisa pakai library seperti js-cookie)
    const userSession = {
      email: user.email,
      username: user.username,
      role: user.role,
      name: user.name,
    }

    // Set cookie dengan expires 7 hari
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    document.cookie = `user-session=${JSON.stringify(userSession)}; expires=${expires.toUTCString()}; path=/`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Mohon periksa kembali data yang dimasukkan")
      return
    }

    setIsLoading(true)

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Cek apakah user ada di dummy data
      const user = authenticateUser(formData.emailOrUsername, formData.password)

      if (!user) {
        toast.error("Email atau password salah")
        setIsLoading(false)
        return
      }

      // Simpan user session
      saveUserSession(user)

      toast.success(`Login berhasil! Selamat datang, ${user.name}`)

      // Redirect berdasarkan role
      router.push(`/${user.role}`)
    } catch (error) {
      toast.error("Login gagal. Silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error saat user mulai mengetik
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex animate-in fade-in duration-1000">
      {/* Left side - Library illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0E4D97] items-center justify-center p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="max-w-md relative z-10 animate-in slide-in-from-left duration-1000 delay-300">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/library.png"
              alt="Library illustration with people reading and organizing books"
              width={400}
              height={400}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Welcome text */}
          <div className="text-center mt-8 text-white animate-in slide-in-from-bottom duration-1000 delay-700">
            <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2>
            <p className="text-blue-100">di Perpustakaan Digital</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6 animate-in slide-in-from-right duration-1000 delay-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0E4D97] mb-2">Login</h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername" className="text-gray-700 font-medium">
                Email atau Username
              </Label>
              <Input
                id="emailOrUsername"
                type="text"
                placeholder="Masukkan email atau username Anda"
                value={formData.emailOrUsername}
                onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
                className={`h-12 transition-all duration-300 ${
                  errors.emailOrUsername
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#0E4D97] focus:ring-[#0E4D97]"
                }`}
                disabled={isLoading}
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top duration-300">
                  {errors.emailOrUsername}
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
                <p className="text-red-500 text-sm animate-in slide-in-from-top duration-300">{errors.password}</p>
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

          {/* Additional links */}
          <div className="text-center space-y-2">
            <button className="text-[#0E4D97] hover:underline text-sm transition-colors">Lupa password?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
