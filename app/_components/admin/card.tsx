import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  iconSrc?: string;
  className?: string;
  textColor?: string;
  ringColor?: string; // warna ring saat hover
  glowColor?: string; // efek glow saat hover
}

export function StatCard({
  title,
  value,
  iconSrc,
  className = "",
  textColor = "",
  ringColor = "ring-blue-300",
  glowColor = "0 0 12px rgba(59,130,246,0.6)",
}: StatCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className={`
        h-56 flex flex-col items-center text-center border border-[#B3B5D1]
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02] hover:ring-3 ${ringColor} ${className}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        boxShadow: hover ? undefined : "0 0 5px 0 #868896",
        filter: hover ? `drop-shadow(${glowColor})` : "none",
      }}
    >
      <div className="flex flex-col items-center pt-4">
        {iconSrc && (
          <div className="mb-5"> {/* <<-- Jarak icon ke title */}
            <Image
              src={iconSrc}
              alt={title}
              width={72}
              height={72}
              className="mx-auto"
            />
          </div>
        )}
        <div className="text-base font-semibold mb-1">{title}</div>
        <div className={`text-4xl font-bold ${textColor}`}>{value}</div>
      </div>
    </Card>
  );
}
