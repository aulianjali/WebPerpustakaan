"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import PerPageSelect from "./select";

interface Props {
  page: number;
  setPage: (page: number) => void;
  total: number;
  perPage: number;
  setPerPage: (perPage: number) => void;
}

export default function PaginationControls({
  page,
  setPage,
  total,
  perPage,
  setPerPage,
}: Props) {
  const totalPages = Math.ceil(total / perPage);

  const generatePages = useMemo(() => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 4) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="flex justify-between items-center mt-4 flex-wrap gap-4 text-sm">
      {/* Kiri: info data */}
      <div className="text-muted-foreground">
        Menampilkan {from}-{to} data dari {total} data
      </div>

      {/* Kanan: pagination + select */}
      <div className="flex items-center gap-4">
        <Pagination>
          <PaginationContent>
            {generatePages.map((p, i) =>
              p === "..." ? (
                <PaginationItem key={i}>
                  <span className="px-2">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={i}>
                  <Button
                    variant={p === page ? "default" : "outline"}
                    className="px-3 py-1 h-auto text-sm"
                    onClick={() => setPage(Number(p))}
                  >
                    {p}
                  </Button>
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>

        {/* Jumlah per page */}
        <PerPageSelect perPage={perPage} setPerPage={setPerPage} setPage={setPage} />
      </div>
    </div>
  );
}
