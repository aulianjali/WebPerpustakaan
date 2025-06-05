"use client"

import type React from "react"

import { MagnifyingGlass } from "phosphor-react"
import { Input } from "@/components/ui/input"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div className="relative w-72 ">
      <input
        {...props}
        className="pl-10 focus-visible:ring-1 focus-visible:ring-offset-0" 
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <MagnifyingGlass size={20} weight="bold" color="#0E4D97" />
      </span>
    </div>
  )
}
