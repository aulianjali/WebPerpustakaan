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

// Tombol Pinjam dengan Alert
export function PinjamAlert({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <BaseAlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-[#0E4D97] hover:bg-[#0A3A6F] text-white text-sm px-5 py-1 rounded-md shadow"
          onClick={() => setOpen(true)}
        >
          Pinjam
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] w-[250px] h-[190px] p-4 border border-gray-300 shadow-md flex flex-col justify-center items-center text-center">
        <AlertDialogHeader className="mb-3">
          <AlertDialogTitle className="text-[#0E4D97] font-bold text-base leading-snug">
            Apakah kamu yakin<br />untuk meminjam?
          </AlertDialogTitle>
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

// Tombol Batal dengan Alert
export function BatalAlert({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <BaseAlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-600 text-red-600 font-light hover:bg-red-50 hover:border hover:text-red-700"
          onClick={() => setOpen(true)}
        >
          Batal
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FEFCF3] w-[250px] h-[190px] p-4 border border-gray-300 shadow-md flex flex-col justify-center items-center text-center">
        <AlertDialogHeader className="mb-3">
          <AlertDialogTitle className="text-[#0E4D97] font-bold text-base leading-snug">
            Apakah kamu yakin<br />untuk membatalkan?
          </AlertDialogTitle>
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
