"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, EyeOff } from "lucide-react"
import type { DataAnggota, DataPustakawan } from "./columns-user"
import { toast } from "sonner" 

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: DataAnggota | DataPustakawan) => void
  userData: DataAnggota | DataPustakawan | null
  userType: "anggota" | "pustakawan"
}

export function EditUserDialog({ isOpen, onClose, onSubmit, userData, userType }: EditUserDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    no: 0,
    idPerpus: "",
    nama: "",
    gmail: "",
    username: "",
    password: "",
  })

  // Update form data ketika userData berubah
  useEffect(() => {
    if (userData) {
      setFormData({
        no: userData.no,
        idPerpus: userData.idPerpus,
        nama: userData.nama,
        gmail: userData.gmail,
        username: userData.username || "",
        password: userData.password || "",
      })
    }
  }, [userData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)

    toast.success("Data user berhasil diperbarui!", {
          description: `User dengan ID "${formData.idPerpus}" telah diupdate.`,
          duration: 3000,
        })

    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 border border-gray-200 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">
            Edit {userType === "anggota" ? "Anggota" : "Pustakawan"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Ubah data {userType === "anggota" ? "anggota" : "pustakawan"}{" "}
            <span className="font-medium text-[#0E4D97]">{userData?.nama}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <div className="space-y-1">
            <Label htmlFor="idPerpus" className="text-xs font-medium text-[#0E4D97]">
              ID Perpustakaan
            </Label>
            <Input
              id="idPerpus"
              value={formData.idPerpus}
              onChange={(e) => handleInputChange("idPerpus", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="nama" className="text-xs font-medium text-[#0E4D97]">
              Nama Lengkap
            </Label>
            <Input
              id="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="gmail" className="text-xs font-medium text-[#0E4D97]">
              Email
            </Label>
            <Input
              id="gmail"
              type="email"
              placeholder="Masukkan alamat email"
              value={formData.gmail}
              onChange={(e) => handleInputChange("gmail", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="username" className="text-xs font-medium text-[#0E4D97]">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-medium text-[#0E4D97]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200 rounded-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-3 w-3 text-gray-600" />
                ) : (
                  <Eye className="h-3 w-3 text-gray-600" />
                )}
                <span className="sr-only">{showPassword ? "Sembunyikan password" : "Tampilkan password"}</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}