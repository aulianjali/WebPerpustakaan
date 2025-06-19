"use client";

import React from "react";
import {
  Table as ShadTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  width?: string;
  align?: "left" | "center" | "right";
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  noDataMessage?: string;
};

export default function Table<T>({
  data,
  columns,
  caption,
  noDataMessage = "Data tidak ditemukan",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded border border-[#7B8AA0]">
      <ShadTable className="min-w-full text-sm text-[#0E4D97] border-collapse">
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow className="bg-[#E0E7FF]">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`px-6 py-3 border border-[#7B8AA0] text-sm font-semibold ${col.className ?? ""}`}
                style={{
                  width: col.width,
                  textAlign: col.align ?? "left",
                  color: "#0F345E",
                }}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-4 border border-[#7B8AA0]"
              >
                {noDataMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300 cursor-default"
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={`px-6 py-3 border border-[#7B8AA0] ${col.className ?? ""}`}
                    style={{ textAlign: col.align ?? "left" }}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
}
