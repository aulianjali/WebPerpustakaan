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

interface EditBukuDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (bukuData: DataBuku) => void
  bukuData: DataBuku | null
}

export function EditBukuDialog({ isOpen, onClose, onSubmit, bukuData }: EditBukuDialogProps) {
  const [formData, setFormData] = useState({
    no: 0,
    idBuku: "",
    stok: "",
    judulBuku: "",
    penulis: "",
    penerbit: "",
    tahunTerbit: "",
    sinopsis: "",
    imageCover: "",
  })

  const [previewImage, setPreviewImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (bukuData) {
      setFormData({
        no: bukuData.no,
        idBuku: bukuData.idBuku,
        stok: bukuData.stok.toString(),
        judulBuku: bukuData.judulBuku,
        penulis: bukuData.penulis,
        penerbit: bukuData.penerbit,
        tahunTerbit: bukuData.tahunTerbit,
        sinopsis: bukuData.sinopsis,
        imageCover: bukuData.imageCover,
      })
      setPreviewImage(bukuData.imageCover)
      setSelectedFile(null)
    }
  }, [bukuData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let finalImageCover = formData.imageCover
    if (selectedFile) {
      finalImageCover = `/uploads/covers/${selectedFile.name}`
    }

    onSubmit({
      ...formData,
      stok: Number.parseInt(formData.stok) || 0,
      imageCover: finalImageCover,
    })

    toast.success("Data buku berhasil diperbarui!", {
      description: `Buku dengan ID "${formData.idBuku}" telah diupdate.`,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Harap pilih file gambar yang valid (JPG, PNG, etc.)")
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
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewImage(formData.imageCover)
    const fileInput = document.getElementById("imageCover") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 border border-gray-200 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">Edit Buku</DialogTitle>
          <DialogDescription className="text-xs text-gray-600">
            Ubah data buku <span className="font-medium text-[#0E4D97]">{bukuData?.judulBuku}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="idBuku" className="text-xs font-medium text-[#0E4D97]">ID Buku</Label>
              <Input
                id="idBuku"
                value={formData.idBuku}
                onChange={(e) => handleInputChange("idBuku", e.target.value)}
                className="h-8 text-sm border-[#0E4D97]"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stok" className="text-xs font-medium text-[#0E4D97]">Stok</Label>
              <Input
                id="stok"
                type="number"
                value={formData.stok}
                onChange={(e) => handleInputChange("stok", e.target.value)}
                className="h-8 text-sm border-[#0E4D97]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="judulBuku" className="text-xs font-medium text-[#0E4D97]">Judul Buku</Label>
            <Input
              id="judulBuku"
              value={formData.judulBuku}
              onChange={(e) => handleInputChange("judulBuku", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="penulis" className="text-xs font-medium text-[#0E4D97]">Penulis</Label>
            <Input
              id="penulis"
              value={formData.penulis}
              onChange={(e) => handleInputChange("penulis", e.target.value)}
              className="h-8 text-sm border-[#0E4D97]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="penerbit" className="text-xs font-medium text-[#0E4D97]">Penerbit</Label>
              <Input
                id="penerbit"
                value={formData.penerbit}
                onChange={(e) => handleInputChange("penerbit", e.target.value)}
                className="h-8 text-sm border-[#0E4D97]"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tahunTerbit" className="text-xs font-medium text-[#0E4D97]">Tahun Terbit</Label>
              <Input
                id="tahunTerbit"
                value={formData.tahunTerbit}
                onChange={(e) => handleInputChange("tahunTerbit", e.target.value)}
                className="h-8 text-sm border-[#0E4D97]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="imageCover" className="text-xs font-medium text-[#0E4D97]">Cover Buku</Label>
            <div className="relative">
              <input id="imageCover" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("imageCover")?.click()}
                className="w-full h-8 text-xs border-[#0E4D97] text-[#0E4D97] hover:bg-[#0E4D97] hover:text-white"
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
                  className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {previewImage && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[#0E4D97]">
                Preview Cover {selectedFile && <span className="text-green-600">(Baru)</span>}
              </Label>
              <div className="relative w-20 h-28 mx-auto">
                <Image
                  src={previewImage || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="object-cover rounded border border-gray-300"
                  onError={() => setPreviewImage("/placeholder.svg")}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="sinopsis" className="text-xs font-medium text-[#0E4D97]">Sinopsis</Label>
            <Textarea
              id="sinopsis"
              value={formData.sinopsis}
              onChange={(e) => handleInputChange("sinopsis", e.target.value)}
              className="min-h-[60px] text-sm border-[#0E4D97]"
              required
            />
          </div>

          <div className="flex gap-2 justify-center mt-6 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md text-sm"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md text-sm"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
