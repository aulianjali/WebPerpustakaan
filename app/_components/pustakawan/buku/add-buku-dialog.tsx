"use client"

import type React from "react"
import type { DataBuku } from "./columns-buku"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import axios from "axios"
import Cookies from "js-cookie"

interface AddBukuDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (bukuData: Omit<DataBuku, "no">) => void
}

export function AddBukuDialog({ isOpen, onClose, onSubmit }: AddBukuDialogProps) {
  const [formData, setFormData] = useState({
    stok: "",
    judulBuku: "",
    penulis: "",
    penerbit: "",
    tahunTerbit: "",
    kategori: "",
    sinopsis: "",
    imageCover: "",
  })

  const [previewImage, setPreviewImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar yang valid.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 5MB.")
      return
    }

    setSelectedFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewImage("")
    const fileInput = document.getElementById("imageCover") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = Cookies.get("token")
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login ulang.")
      return
    }

    const form = new FormData()
    form.append("judul", formData.judulBuku || "")
    form.append("penulis", formData.penulis || "")
    form.append("penerbit", formData.penerbit || "")
    form.append("tahun_terbit", formData.tahunTerbit || "")
    form.append("sinopsis", formData.sinopsis || "")
    form.append("kategori", formData.kategori || "")
    form.append("stock", formData.stok || "0")
    if (selectedFile) {
      form.append("image", selectedFile)
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Buku berhasil ditambahkan!", {
        description: response.data.message || "Buku berhasil disimpan ke database.",
      })

      onSubmit({
        stok: parseInt(formData.stok),
        judulBuku: formData.judulBuku,
        penulis: formData.penulis,
        penerbit: formData.penerbit,
        tahunTerbit: formData.tahunTerbit,
        kategori: formData.kategori,
        sinopsis: formData.sinopsis,
        imageCover: selectedFile ? URL.createObjectURL(selectedFile) : "/placeholder.svg",
        idBuku: " ",
      })

      onClose()
      setFormData({
        stok: "",
        judulBuku: "",
        penulis: "",
        penerbit: "",
        tahunTerbit: "",
        kategori: "",
        sinopsis: "",
        imageCover: "",
      })
      setSelectedFile(null)
      setPreviewImage("")
    } catch (error: any) {
      console.error("Gagal menambahkan buku:", error)
      if (error.response?.status === 422) {
        toast.error("Validasi gagal", {
          description: JSON.stringify(error.response.data.errors),
        })
      } else {
        toast.error("Gagal menambahkan buku. Silakan coba lagi.")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base">
            Tambah Buku
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Lengkapi form untuk menambahkan buku baru.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          {[
            ["Judul Buku", "judulBuku"],
            ["Penulis", "penulis"],
            ["Penerbit", "penerbit"],
            ["Tahun Terbit", "tahunTerbit"],
            ["Kategori", "kategori"],
            ["Stok", "stok"],
          ].map(([label, field]) => {
            console.log('Rendering field:', label, field);
            return (
              <div className="space-y-1" key={field}>
                <Label htmlFor={field} className="text-xs font-medium text-[#0E4D97]">
                  {label}
                </Label>
                <Input
                  id={field}
                  type={field === "stok" ? "number" : "text"}
                  value={(formData as any)[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  required
                  className="h-8 text-sm border-[#0E4D97]"
                />
              </div>
            )
          })}

          <div className="space-y-1">
            <Label htmlFor="sinopsis" className="text-xs font-medium text-[#0E4D97]">
              Sinopsis
            </Label>
            <Textarea
              id="sinopsis"
              value={formData.sinopsis}
              onChange={(e) => handleInputChange("sinopsis", e.target.value)}
              className="min-h-[60px] text-sm border-[#0E4D97]"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="imageCover" className="text-xs font-medium text-[#0E4D97]">
              Cover Buku
            </Label>
            <input
              id="imageCover"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("imageCover")?.click()}
              className="w-full h-8 text-xs border-[#0E4D97] text-[#0E4D97]"
            >
              <Upload className="h-3 w-3 mr-2" />
              {selectedFile ? "Ganti Cover" : "Pilih Cover"}
            </Button>

            {selectedFile && (
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded text-xs">
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3 text-blue-600" />
                  <span className="text-blue-700 truncate max-w-[120px]">
                    {selectedFile.name}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="h-5 w-5 p-0 text-red-500"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {previewImage && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[#0E4D97]">Preview Cover</Label>
              <div className="relative w-20 h-28 mx-auto">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-cover border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">
              Batal
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white">
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}