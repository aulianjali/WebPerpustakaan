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
        h-30 flex flex-col border border-[#B3B5D1]
        transition-all duration-300 py-0 items-center justify-center
        
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}

    >
      <div className="flex gap-2">
        {iconSrc && (
          <div className=""> {/* <<-- Jarak icon ke title */}
            <Image
              src={iconSrc}
              alt={title}
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
        )}
        <div className="flex flex-col"> 
          <div className={`text-base font-semibold mb-1 ${textColor}`}>{title}</div>
          <div className={`font-bold `}>{value}</div>
        </div>
      </div>
    </Card>
  );
}
