"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Datamember, DataPustakawan } from "./columns-user"
import { toast } from "sonner" 

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: Datamember | DataPustakawan) => void
  userData: Datamember | DataPustakawan | null
  userType: "member" | "pustakawan"
}

export function EditUserDialog({ isOpen, onClose, onSubmit, userData, userType }: EditUserDialogProps) {
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
          description: `User "${formData.nama}" telah diupdate.`,
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
            Edit {userType === "member" ? "member" : "Pustakawan"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Ubah data {userType === "member" ? "member" : "pustakawan"}{" "}
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