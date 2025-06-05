"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserCheck } from "lucide-react"
import type { DataAnggota, DataPustakawan } from "./columns-user"

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: DataAnggota | DataPustakawan) => void
  userData: DataAnggota | DataPustakawan | null
  userType: "anggota" | "pustakawan"
}

export function EditUserDialog({ isOpen, onClose, onSubmit, userData, userType }: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    no: 0,
    idPerpus: "",
    nama: "",
    gmail: "",
    nomorTelepon: "",
    alamat: "",
  })

  // Update form data ketika userData berubah
  useEffect(() => {
    if (userData) {
      setFormData({
        no: userData.no,
        idPerpus: userData.idPerpus,
        nama: userData.nama,
        gmail: userData.gmail,
        nomorTelepon: userData.nomorTelepon,
        alamat: userData.alamat,
      })
    }
  }, [userData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
        <DialogHeader className="text-center space-y-3">
          {/* Edit Icon */}
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 border-2 border-orange-200">
              <UserCheck className="h-5 w-5 text-orange-600" />
            </div>
          </div>

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
              placeholder={`Masukkan ID ${userType === "anggota" ? "anggota" : "pustakawan"}`}
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
            <Label htmlFor="nomorTelepon" className="text-xs font-medium text-[#0E4D97]">
              Nomor Telepon
            </Label>
            <Input
              id="nomorTelepon"
              placeholder="Masukkan nomor telepon"
              value={formData.nomorTelepon}
              onChange={(e) => handleInputChange("nomorTelepon", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="alamat" className="text-xs font-medium text-[#0E4D97]">
              Alamat
            </Label>
            <Textarea
              id="alamat"
              placeholder="Masukkan alamat lengkap"
              value={formData.alamat}
              onChange={(e) => handleInputChange("alamat", e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] min-h-[60px] text-sm"
              required
            />
          </div>

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="bg-gray-500 hover:bg-gray-600 text-white hover:text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="bg-orange-500 hover:bg-orange-600 text-white hover:text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
