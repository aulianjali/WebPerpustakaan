import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BadgememberProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function Badgemember({ label, className, ...props }: BadgememberProps) {
  return (
    <Badge className={cn(className)} {...props}>
      {label}
    </Badge>
  );
}
export { Badge };

