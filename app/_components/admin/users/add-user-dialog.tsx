"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
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

export function AddUserDialog({
  isOpen,
  onClose,
  onSubmit,
  datamember,
  dataPustakawan,
}: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    nama: "",
    gmail: "",
    role: "" as "member" | "pustakawan" | "",
  })

  const generateUsername = (nama: string): string => {
    return nama
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
      .substring(0, 20)
  }

  const generatePassword = (): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.role) {
      toast.error("Role harus dipilih!")
      return
    }

    const username = generateUsername(formData.nama)
    const password = generatePassword()

    const userData = {
      name: formData.nama,
      email: formData.gmail,
      username,
      password,
      role: formData.role,
    }

    const token = Cookies.get("token")

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      if (response.data && response.data.data) {
        const createdUser = response.data.data

        onSubmit({
          id: createdUser.id,
          nama: createdUser.name,
          gmail: createdUser.email,
          username: createdUser.username,
          password: createdUser.password,
          role: createdUser.role,
        })

        console.log("✅ User berhasil ditambahkan:", createdUser)

        toast.success("User berhasil ditambahkan!", {
          description: `User dengan ID "${createdUser.id}" berhasil dibuat.`,
          duration: 3000,
        })

        setFormData({ nama: "", gmail: "", role: "" })
        onClose()
      } else {
        toast.error("Gagal menambahkan user.")
      }
    } catch (error: any) {
      console.error("Gagal menambahkan user:", error)
      toast.error("Terjadi kesalahan saat mengirim data ke server.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-md w-full mx-4 p-4 border border-gray-200 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">
            Tambah User Baru
          </DialogTitle>
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
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="pustakawan">Pustakawan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button
              type="button"
              onClick={onClose}
              
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md text-sm"
            >
              Batal
            </Button>
            <Button
              type="submit"
            
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md text-sm"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
