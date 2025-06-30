"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SelectChartFilterProps {
  value: string
  onChange: (value: string) => void
}

export function SelectChartFilter({ value, onChange }: SelectChartFilterProps) {
  return (
    <div className="w-full md:w-auto md:ml-auto">
      <Select value={value} onValueChange={onChange} >
        <SelectTrigger className="w-full max-w-[100px] border border-[#B3B5D1] text-[#0E4D97] focus-visible:ring-1 focus-visible:ring-offset-0">
          <SelectValue placeholder="Pilih Tahun" />
        </SelectTrigger>
        <SelectContent>
  
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
