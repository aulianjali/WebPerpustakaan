"use client"

import { BreadcrumbItem } from "@/components/ui/breadcrumb"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface BreadcrumbItem {
  label: string
  href?: string
  dropdown?: Array<{
    label: string
    href: string
  }>
}

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function AdminBreadcrumb({ items, className = "" }: AdminBreadcrumbProps) {
  return (
    <Breadcrumb className={`flex items-center gap-2 text-sm text-gray-600 mb-4 ${className}`}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === items.length - 1 ? (
              <BreadcrumbPage className="text-[#0E4D97] font-medium">{item.label}</BreadcrumbPage>
            ) : item.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-[#0E4D97] cursor-pointer flex items-center">
                  {item.label}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <DropdownMenuItem key={dropdownIndex} asChild>
                      <Link href={dropdownItem.href}>{dropdownItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={item.href || "#"} className="hover:text-[#0E4D97] cursor-pointer">
                  {item.label}
                </Link>
              </BreadcrumbLink>
            )}

            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
