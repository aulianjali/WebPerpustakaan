"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface ImagePreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
}

export function ImagePreviewDialog({ isOpen, onClose, imageUrl }: ImagePreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 border-0 bg-transparent shadow-none">
        <DialogTitle> </DialogTitle>
        <div className="relative">
          <div className="relative w-full h-[600px] bg-white rounded-lg overflow-hidden shadow-lg">
            <Image src={imageUrl || "/placeholder.svg"} alt="Book cover preview" fill className="object-contain" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
