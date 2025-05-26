'use client';

import { MagnifyingGlass } from "phosphor-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div className="relative w-72">
      <Input
        {...props}
        className="pl-10" // cuma tambahkan padding kiri biar icon gak nutup teks
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <MagnifyingGlass size={20} weight="bold" color="#0E4D97" />
      </span>
    </div>
  );
}
