"use client"

import type React from "react"
import type { DataBuku } from "./columns-buku"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookPlus, X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface AddBukuDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (bukuData: Omit<DataBuku, "no">) => void
}

export function AddBukuDialog({ isOpen, onClose, onSubmit }: AddBukuDialogProps) {
  const [formData, setFormData] = useState({
    idBuku: "",
    stok: "",
    judulBuku: "",
    penulis: "",
    penerbit: "",
    tahunTerbit: "",
    sinopsis: "",
    imageCover: "",
  })
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulasi: Jika ada file yang dipilih, gunakan URL simulasi
    // Nanti ini akan diganti dengan upload ke database/storage
    let finalImageCover = formData.imageCover
    if (selectedFile) {
      // Simulasi URL setelah upload ke database
      finalImageCover = `/uploads/covers/${selectedFile.name}`
    }

    onSubmit({
      ...formData,
      stok: Number.parseInt(formData.stok) || 0,
      imageCover: finalImageCover,
    })

    toast.success("Data buku berhasil ditambah!", {
      description: `Buku dengan ID "${formData.idBuku}" telah ditambah.`,
      duration: 3000,
    })

    onClose()
    // Reset form
    setFormData({
      idBuku: "",
      stok: "",
      judulBuku: "",
      penulis: "",
      penerbit: "",
      tahunTerbit: "",
      sinopsis: "",
      imageCover: "",
    })
    setSelectedFile(null)
    setPreviewImage("")
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
      // Validasi tipe file
      if (!file.type.startsWith("image/")) {
        alert("Harap pilih file gambar yang valid (JPG, PNG, etc.)")
        return
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 5MB.")
        return
      }

      setSelectedFile(file)

      // Buat preview URL untuk file yang dipilih
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
    setPreviewImage("")
    // Reset file input
    const fileInput = document.getElementById("imageCover") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#FEFCF3] max-w-sm w-full mx-4 p-4 border border-gray-200 shadow-sm rounded-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center">
          
            <DialogTitle className="text-[#0E4D97] font-semibold text-base leading-relaxed">
              Tambah Buku Baru
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-600">
              Lengkapi form di bawah untuk menambah buku baru ke koleksi
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="idBuku" className="text-xs font-medium text-[#0E4D97]">
                  ID Buku
                </Label>
                <Input
                  id="idBuku"
                  placeholder="BK001"
                  value={formData.idBuku}
                  onChange={(e) => handleInputChange("idBuku", e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="stok" className="text-xs font-medium text-[#0E4D97]">
                  Stok
                </Label>
                <Input
                  id="stok"
                  type="number"
                  placeholder="5"
                  value={formData.stok}
                  onChange={(e) => handleInputChange("stok", e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="judulBuku" className="text-xs font-medium text-[#0E4D97]">
                Judul Buku
              </Label>
              <Input
                id="judulBuku"
                placeholder="Masukkan judul buku"
                value={formData.judulBuku}
                onChange={(e) => handleInputChange("judulBuku", e.target.value)}
                className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="penulis" className="text-xs font-medium text-[#0E4D97]">
                Penulis
              </Label>
              <Input
                id="penulis"
                placeholder="Masukkan nama penulis"
                value={formData.penulis}
                onChange={(e) => handleInputChange("penulis", e.target.value)}
                className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="penerbit" className="text-xs font-medium text-[#0E4D97]">
                  Penerbit
                </Label>
                <Input
                  id="penerbit"
                  placeholder="Nama penerbit"
                  value={formData.penerbit}
                  onChange={(e) => handleInputChange("penerbit", e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="tahunTerbit" className="text-xs font-medium text-[#0E4D97]">
                  Tahun Terbit
                </Label>
                <Input
                  id="tahunTerbit"
                  placeholder="2024"
                  value={formData.tahunTerbit}
                  onChange={(e) => handleInputChange("tahunTerbit", e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] h-8 text-sm"
                  required
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-1">
              <Label htmlFor="imageCover" className="text-xs font-medium text-[#0E4D97]">
                Cover Buku
              </Label>

              {/* File Input */}
              <div className="relative">
                <input id="imageCover" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("imageCover")?.click()}
                  className="w-full h-8 text-xs border-[#0E4D97] text-[#0E4D97] hover:bg-[#0E4D97] hover:text-white"
                >
                  <Upload className="h-3 w-3 mr-2" />
                  {selectedFile ? "Ganti Cover" : "Pilih Cover"}
                </Button>
              </div>

              {/* File Info */}
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
                    className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {previewImage && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#0E4D97]">Preview Cover</Label>
                <div className="relative w-20 h-28 mx-auto">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Cover preview"
                    fill
                    className="object-cover rounded cursor-pointer border border-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="sinopsis" className="text-xs font-medium text-[#0E4D97]">
                Sinopsis
              </Label>
              <Textarea
                id="sinopsis"
                placeholder="Masukkan sinopsis buku"
                value={formData.sinopsis}
                onChange={(e) => handleInputChange("sinopsis", e.target.value)}
                className="focus-visible:ring-1 focus-visible:ring-[#0E4D97] focus-visible:ring-offset-0 border-[#0E4D97] focus:border-[#0E4D97] min-h-[60px] text-sm"
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
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Expanded Image Dialog */}
      {isImageExpanded && previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsImageExpanded(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh] p-4">
            <Button
              onClick={() => setIsImageExpanded(false)}
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white text-black hover:bg-gray-100 z-10"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <Image
              src={previewImage || "/placeholder.svg"}
              alt="Cover expanded"
              width={400}
              height={600}
              className="object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  )
}
