"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page?: number
  setPage?: (page: number) => void
  perPage?: number
  setPerPage?: (perPage: number) => void
  total?: number
}

export function DataTableUsers<TData, TValue>({
  columns,
  data,
  page = 1,
  setPage,
  perPage = 5,
  setPerPage,
  total = 0,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: perPage,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(total / perPage),
  })

  const totalPages = Math.ceil(total / perPage)

  // Generate pagination items with ellipsis (max 3 pages in middle)
  const getPaginationItems = () => {
    const items = []

    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: "page", value: i })
      }
    } else {
      // Always add first page
      items.push({ type: "page", value: 1 })

      // Determine the 3 pages to show in the middle
      let startPage, endPage

      if (page <= 3) {
        // If current page is 1, 2, or 3, show pages 2, 3, 4
        startPage = 2
        endPage = 4
      } else if (page >= totalPages - 2) {
        // If current page is near the end, show last 3 pages before the last page
        startPage = totalPages - 3
        endPage = totalPages - 1
      } else {
        // Show current page and one page before and after
        startPage = page - 1
        endPage = page + 1
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        items.push({ type: "ellipsis", value: "start-ellipsis" })
      }

      // Add the 3 middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push({ type: "page", value: i })
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        items.push({ type: "ellipsis", value: "end-ellipsis" })
      }

      // Always add last page
      items.push({ type: "page", value: totalPages })
    }

    return items
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border border-[#7B8AA0] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[#7B8AA0]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-[#f0f2ff]">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-[#7B8AA0] last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b border-[#7B8AA0]">
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Menampilkan {(page - 1) * perPage + 1}-{Math.min(page * perPage, total)} data dari {total} data
        </div>
        <div className="flex items-center space-x-3">
          {/* Page Numbers with Ellipsis */}
          <div className="flex items-center space-x-1">
            {getPaginationItems().map((item, index) => {
              if (item.type === "ellipsis") {
                return (
                  <div key={item.value} className="flex h-8 w-8 items-center justify-center text-sm text-gray-500">
                    ...
                  </div>
                )
              }

              const pageNum = item.value as number
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    pageNum === page
                      ? "bg-[#0E4D97] text-white hover:bg-[#0E4D97]/90"
                      : "border-[#7B8AA0] text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setPage?.(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          {/* Show Dropdown */}
          <div className="flex items-center">
            <Select
              value={`${perPage}`}
              onValueChange={(value) => {
                setPerPage?.(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[115px] rounded-lg border-[#7B8AA0] text-sm">
                <span className="text-gray-600 mr-1">Show</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
