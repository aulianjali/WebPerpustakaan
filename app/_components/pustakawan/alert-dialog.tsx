"use client";

import { useState } from "react";
import {
  AlertDialog as BaseAlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

// konfimasi alert
export function ConfirmAlert({ onConfirm, message = "Apakah kamu yakin?" }: { onConfirm: () => void; message?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <BaseAlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-800 text-white text-sm px-5 py-1 rounded-md shadow"
          onClick={() => setOpen(true)}
        >
          Konfirmasi
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] w-[250px] h-[190px] p-4 border border-gray-300 shadow-md flex flex-col justify-center items-center text-center">
        <AlertDialogHeader className="mb-3">
          <AlertDialogTitle className="text-[#0E4D97] font-bold text-base leading-snug" dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, "<br />") }} />
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Tidak
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
            variant="ghost"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Iya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
}
