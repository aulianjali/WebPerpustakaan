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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableHomeProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page?: number
  setPage?: (page: number) => void
  perPage?: number
  setPerPage?: (perPage: number) => void
  total?: number
  onRefresh?: () => void | Promise<void>
}

export function DataTableHome<TData, TValue>({
  columns,
  data,
  page = 1,
  setPage,
  perPage = 5,
  setPerPage,
  total = 0,
  onRefresh,
}: DataTableHomeProps<TData, TValue>) {
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

  const getPaginationItems = () => {
    const items: { type: "page" | "ellipsis"; value: number | string }[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: "page", value: i })
      }
    } else {
      items.push({ type: "page", value: 1 })

      let startPage: number, endPage: number

      if (page <= 3) {
        startPage = 2
        endPage = 4
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 3
        endPage = totalPages - 1
      } else {
        startPage = page - 1
        endPage = page + 1
      }

      if (startPage > 2) {
        items.push({ type: "ellipsis", value: "start-ellipsis" })
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push({ type: "page", value: i })
      }

      if (endPage < totalPages - 1) {
        items.push({ type: "ellipsis", value: "end-ellipsis" })
      }

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
              <TableRow
                key={headerGroup.id}
                className="border-b border-[#7B8AA0]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-[#f0f2ff] text-black font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                    <TableCell key={cell.id} className="text-black">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b border-[#7B8AA0]">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-black"
                >
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
          <div className="flex items-center space-x-1">
            {getPaginationItems().map((item, idx) => {
              if (item.type === "ellipsis") {
                return (
                  <div
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-8 items-center justify-center text-sm text-gray-500"
                  >
                    ...
                  </div>
                )
              }

              const pageNum = item.value as number
              return (
                <Button
                  key={`page-${pageNum}`}
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
