"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardAnggotaProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function CardAnggota({ title, children, className }: CardAnggotaProps) {
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

