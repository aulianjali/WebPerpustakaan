import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BadgeAnggotaProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function BadgeAnggota({ label, className, ...props }: BadgeAnggotaProps) {
  return (
    <Badge className={cn(className)} {...props}>
      {label}
    </Badge>
  );
}
export { Badge };

