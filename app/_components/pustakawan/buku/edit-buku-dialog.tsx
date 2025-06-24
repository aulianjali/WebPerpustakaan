"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import type { DataBuku } from "./columns-buku"
import { toast } from "sonner"
import axios from "axios"
import Cookies from "js-cookie"

interface EditBukuDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (bukuData: DataBuku) => void
  bukuData: DataBuku | null
}

export function EditBukuDialog({ isOpen, onClose, onSubmit, bukuData }: EditBukuDialogProps) {
  const [formData, setFormData] = useState({
    no: 0,
    id: 0,
    judul: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    kategori: "",
    stock: 0,
    stock_awal: 0,
    sinopsis: "",
    image: "",
  })

  const [previewImage, setPreviewImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (bukuData) {
      setFormData({
        no: bukuData.no,
        id: bukuData.id,
        judul: bukuData.judul,
        penulis: bukuData.penulis,
        penerbit: bukuData.penerbit,
        tahun_terbit: bukuData.tahun_terbit,
        kategori: bukuData.kategori,
        stock: bukuData.stock,
        stock_awal: bukuData.stock_awal,
        sinopsis: bukuData.sinopsis,
        image: bukuData.image,
      })
      setPreviewImage(bukuData.image)
      setSelectedFile(null)
    }
  }, [bukuData])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "stock_awal" ? Number(value) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
        alert("File tidak valid. Maksimal 5MB dan harus berupa gambar.")
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
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewImage(formData.image)
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
    form.append("judul", formData.judul || "")
    form.append("penulis", formData.penulis || "")
    form.append("penerbit", formData.penerbit || "")
    form.append("tahun_terbit", formData.tahun_terbit || "")
    form.append("kategori", formData.kategori || "")
    form.append("deskripsi", formData.sinopsis || "")
    form.append("stock_awal", String(formData.stock_awal))
    if (selectedFile) {
      form.append("image", selectedFile)
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${formData.id}?_method=PUT`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      toast.success("Buku berhasil diperbarui", {
        description: `Buku dengan judul "${formData.judul}" telah diupdate.`,
      })

      onSubmit({
        ...formData,
        image: selectedFile ? URL.createObjectURL(selectedFile) : formData.image,
      })

      onClose()
    } catch (error: any) {
      console.error("Gagal update:", error)
      if (error.response?.status === 422) {
        toast.error("Validasi gagal", {
          description: JSON.stringify(error.response.data.errors),
        })
      } else {
        toast.error("Gagal memperbarui buku. Silakan coba lagi.")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base">Edit Buku</DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Ubah data buku <span className="font-medium text-[#0E4D97]">{formData.judul}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          {[
            { label: "Judul Buku", id: "judul", field: "judul" },
            { label: "Penulis", id: "penulis", field: "penulis" },
            { label: "Penerbit", id: "penerbit", field: "penerbit" },
            { label: "Tahun Terbit", id: "tahun_terbit", field: "tahun_terbit" },
            { label: "Kategori", id: "kategori", field: "kategori" },
          ].map(({ label, id, field }) => (
            <div className="space-y-1" key={id}>
              <Label htmlFor={id} className="text-xs font-medium text-[#0E4D97]">{label}</Label>
              <Input
                id={id}
                value={(formData as any)[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="h-8 text-sm border-[#0E4D97]"
              />
            </div>
          ))}

          <div className="space-y-1">
            <Label htmlFor="stock" className="text-xs font-medium text-[#0E4D97]">
              Stok Sekarang (info)
            </Label>
            <Input
              id="stock"
              value={formData.stock}
              readOnly
              className="h-8 text-sm border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="stock_awal" className="text-xs font-medium text-[#0E4D97]">
              Stok Awal
            </Label>
            <Input
              id="stock_awal"
              type="number"
              min="0"
              value={formData.stock_awal}
              onChange={(e) => handleInputChange("stock_awal", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="sinopsis" className="text-xs font-medium text-[#0E4D97]">Sinopsis</Label>
            <Textarea
              id="sinopsis"
              value={formData.sinopsis}
              onChange={(e) => handleInputChange("sinopsis", e.target.value)}
              className="min-h-[60px] text-sm border-[#0E4D97]"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-[#0E4D97]">Cover Buku</Label>
            <div className="relative">
              <input id="imageCover" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("imageCover")?.click()}
                className="w-full h-8 text-xs border-[#0E4D97] text-[#0E4D97]"
              >
                <Upload className="h-3 w-3 mr-2" />
                {selectedFile ? "Ganti Cover" : "Pilih Cover Baru"}
              </Button>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded text-xs">
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3 text-blue-600" />
                  <span className="text-blue-700 truncate max-w-[120px]">{selectedFile.name}</span>
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
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover rounded border border-gray-300"
                  onError={() => setPreviewImage("/placeholder.svg")}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">Batal</Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
