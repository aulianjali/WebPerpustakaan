"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  perPage: number;
  setPerPage: (value: number) => void;
  setPage: (value: number) => void;
}

export default function PerPageSelect({
  perPage,
  setPerPage,
  setPage,
}: Props) {
  const handleChange = (value: string) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return (
    <Select onValueChange={handleChange} value={perPage.toString()}>
      <SelectTrigger
        className="w-32 h-8 border border-[#0F345E] rounded-md flex items-center gap-2 px-2 focus:outline-none focus:ring-[#0F345E]"
      >
        {/* Tulisan "Shown" di dalam border, kiri */}
        <span className="text-sm font-medium text-[#0F345E] select-none">Show</span>

        {/* Nilai dropdown di sebelah kanan */}
        <SelectValue className="flex-1" placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {[5, 10, 20, 50].map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}