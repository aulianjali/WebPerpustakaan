"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Datamember, DataPustakawan } from "./columns-user"

interface AddUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: Omit<Datamember | DataPustakawan, "no">) => void
  userType: "member" | "pustakawan"
  datamember: Datamember[]
  dataPustakawan: DataPustakawan[]
}

export function AddUserDialog({ isOpen, onClose, onSubmit, datamember, dataPustakawan }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    nama: "",
    gmail: "",
    role: "" as "member" | "pustakawan" | "",
  })

  // Function to generate next ID based on role
  const generateNextId = (role: "member" | "pustakawan"): string => {
    if (role === "member") {
      const lastId =
        datamember
          .map((user) => Number.parseInt(user.idPerpus.substring(1))) // Remove 'A' and convert to number
          .filter((num) => !isNaN(num))
          .sort((a, b) => b - a)[0] || 0 // Get highest number or 0 if none

      return `A${String(lastId + 1).padStart(3, "0")}` // Format as A001, A002, etc.
    } else {
      const lastId =
        dataPustakawan
          .map((user) => Number.parseInt(user.idPerpus.substring(1))) // Remove 'P' and convert to number
          .filter((num) => !isNaN(num))
          .sort((a, b) => b - a)[0] || 0 // Get highest number or 0 if none

      return `P${String(lastId + 1).padStart(3, "0")}` // Format as P001, P002, etc.
    }
  }

  // Function to generate username from name
  const generateUsername = (nama: string): string => {
    return nama
      .toLowerCase()
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, "") // Remove special characters
      .substring(0, 20) // Limit length
  }

  // Function to generate random password
  const generatePassword = (): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.role) {
      toast.error("Role harus dipilih!")
      return
    }

    const idPerpus = generateNextId(formData.role)
    const username = generateUsername(formData.nama)
    const password = generatePassword()

    const userData = {
      idPerpus,
      nama: formData.nama,
      gmail: formData.gmail,
      username,
      password,
    }

    onSubmit(userData)

    toast.success("Data user berhasil ditambah!", {
      description: `User dengan ID "${idPerpus}" telah ditambah.`,
      duration: 3000,
    })

    onClose()
    // Reset form
    setFormData({
      nama: "",
      gmail: "",
      role: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-md w-full mx-4 p-4 border border-gray-200 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">Tambah User Baru</DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Lengkapi form di bawah untuk menambah user baru ke sistem
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="nama" className="text-xs font-medium text-[#0E4D97]">
              Nama Lengkap
            </Label>
            <Input
              id="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-10 text-sm"
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
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-10 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="role" className="text-xs font-medium text-[#0E4D97]">
              Role
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger className="focus:ring-1 focus:ring-[#0E4D97] focus:ring-offset-0 border-[#0E4D97] h-10 text-sm w-full">
                <SelectValue placeholder="Pilih role user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">member</SelectItem>
                <SelectItem value="pustakawan">Pustakawan</SelectItem>
              </SelectContent>
            </Select>
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
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
