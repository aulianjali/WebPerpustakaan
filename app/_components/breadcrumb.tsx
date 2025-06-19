"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

// Mapping path ke label yang user-friendly untuk semua role
const pathLabels: Record<string, string> = {
  // Admin paths
  "/admin": "Home",
  "/admin/users": "Manajemen User",
  "/admin/buku": "Manajemen Buku",
  "/admin/peminjaman": "Manajemen Peminjaman",

  // member paths
  "/member": "Home",
  "/member/konfirmasi": "Konfirmasi",
  "/member/riwayat": "Riwayat",

  // Pustakawan paths
  "/pustakawan": "Home",
  "/pustakawan/buku": "Manajemen Buku",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  // Split path dan filter empty strings
  const pathSegments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items
  const breadcrumbItems = []
  let currentPath = ""

  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`
    const label = pathLabels[currentPath] || pathSegments[i]

    breadcrumbItems.push({
      path: currentPath,
      label: label,
      isLast: i === pathSegments.length - 1,
    })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1">
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="text-[#0E4D97] font-medium">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path} className="text-gray-600 hover:text-[#0E4D97]">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator className="mx-1" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
