"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardPustakawanProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function CardAnggota({ title, children, className }: CardPustakawanProps) {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
export { Card }

