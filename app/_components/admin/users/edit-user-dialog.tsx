"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Datamember, DataPustakawan } from "./columns-user"
import { toast } from "sonner"
import axios from "axios"
import Cookies from "js-cookie"

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: Datamember | DataPustakawan) => void
  userData: Datamember | DataPustakawan | null
  userType: "member" | "pustakawan"
}

export function EditUserDialog({
  isOpen,
  onClose,
  onSubmit,
  userData,
  userType,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    nama: "",
    gmail: "",
    password: "",
  })

  useEffect(() => {
    if (userData) {
      setFormData({
        nama: userData.nama,
        gmail: userData.gmail,
        password: userData.password || "",
      })
    }
  }, [userData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userData?.id) {
      toast.error("ID user tidak ditemukan.")
      return
    }

    try {
      const token = Cookies.get("token")
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          nama: formData.nama,
          gmail: formData.gmail,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      toast.success("Data user berhasil diperbarui!", {
        description: `User "${formData.nama}" telah diupdate.`,
        duration: 3000,
      })

      onSubmit({
        ...userData,
        nama: formData.nama,
        gmail: formData.gmail,
        password: formData.password,
      })

      onClose()
    } catch (error: any) {
      console.error("Gagal update:", error)
      toast.error("Gagal memperbarui data user.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 border border-gray-200 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">
            Edit {userType === "member" ? "Member" : "Pustakawan"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Ubah data {userType}{" "}
            <span className="font-medium text-[#0E4D97]">{userData?.nama}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <div className="space-y-1">
            <Label htmlFor="nama" className="text-xs font-medium text-[#0E4D97]">
              Nama Lengkap
            </Label>
            <Input
              id="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
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
              className="h-8 text-sm border-[#0E4D97]"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-medium text-[#0E4D97]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password baru (opsional)"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
            />
          </div>

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
