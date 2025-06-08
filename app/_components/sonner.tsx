"use client"

import { Toaster as Sonner } from "sonner"
import type { ComponentProps } from "react"

type ToasterProps = ComponentProps<typeof Sonner>

export const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          backgroundColor: "#FEFCF3",
          color: "#0E4D97",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          fontWeight: "600",
        },
        classNames: {
          icon: "text-green-500",
          description: "text-gray-600",
        },
      }}
      {...props}
    />
  )
}
