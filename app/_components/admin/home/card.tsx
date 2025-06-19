"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  className?: string
  textColor?: string
  valueColor?: string
  borderColor?: string
  iconBgColor?: string
  valueSize?: string
  isLarge?: boolean
  // Props untuk detail link
  detailHref?: string
  detailText?: string
  showDetail?: boolean
}

export function StatCard({
  title,
  value,
  icon,
  className = "",
  textColor = "",
  valueColor = "",
  borderColor = "border-gray-200",
  iconBgColor = "bg-gray-100",
  valueSize = "text-2xl",
  isLarge = false,
  detailHref,
  detailText = "Lihat Detail",
  showDetail = false,
}: StatCardProps) {
  const renderDetailLink = () => {
    if (!showDetail || !detailHref) return null

    return (
      <a
        href={detailHref}
        className={`absolute top-4 right-4 text-[10px] transition-colors duration-300 flex items-center gap-1 no-underline hover:no-underline ${
          isLarge ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-700"
        }`}
      >
        Lihat Detail <ChevronRight className="w-2 h-2" />
      </a>
    )
  }

  const cardClasses = `
    ${borderColor} rounded-xl p-6 ${className} relative overflow-hidden group
  `

  if (isLarge) {
    // Layout untuk card besar
    return (
      <Card className={cardClasses}>
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full rounded-full bg-white/20 transform translate-x-8 -translate-y-8"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
          <div className="w-full h-full rounded-full bg-white/20 transform -translate-x-4 translate-y-4"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header dengan icon dan title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200`}
              >
                <div className={textColor}>{icon}</div>
              </div>
              <div>
                <h3 className={`font-medium ${textColor} opacity-90`}>Total</h3>
                <h2 className={`text-xl font-semibold ${textColor}`}>member</h2>
              </div>
            </div>
          </div>

          {/* Value besar di bawah */}
          <div className="mt-6">
            <p className={`${valueSize} font-bold ${valueColor || textColor} leading-none`}>{value}</p>
          </div>
        </div>
        {/* Detail link */}
        {renderDetailLink()}
      </Card>
    )
  }

  // Layout untuk card reguler
  return (
    <Card className={`${borderColor} rounded-lg p-4 ${className} relative`}>
      <div className="flex items-center space-x-4 flex-1">
        {/* Icon on the left */}
        <div
          className={`flex-shrink-0 w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center transition-all duration-200`}
        >
          <div className={textColor}>{icon}</div>
        </div>

        {/* Information on the right */}
        <div className="flex-1">
          <h3 className={`font-medium ${textColor} leading-tight`}>{title}</h3>
          <p className={`text-2xl font-semibold ${valueColor || textColor}`}>{value}</p>
        </div>
      </div>
      {/* Detail link */}
      {renderDetailLink()}
    </Card>
  )
}