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
    name: "",
    email: "",
  })

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
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

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log("RESPON UPDATE:", response.data)

      toast.success("Data user berhasil diperbarui!", {
        description: `User "${formData.name}" telah diupdate.`,
      })

      onSubmit({
        ...userData,
        name: formData.name,
        email: formData.email,
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
            <span className="font-medium text-[#0E4D97]">{formData.name}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs font-medium text-[#0E4D97]">
              Nama Lengkap
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-medium text-[#0E4D97]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
              placeholder="Masukkan alamat email"
              required
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
