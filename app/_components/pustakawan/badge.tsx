import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BadgePustakawanProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function BadgePustakawanProps({ label, className, ...props }: BadgePustakawanProps) {
  return (
    <Badge className={cn(className)} {...props}>
      {label}
    </Badge>
  );
}
export { Badge };

