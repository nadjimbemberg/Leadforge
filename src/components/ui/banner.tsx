import * as React from "react"

import { cn } from "@/lib/utils"

const VARIANTS = {
  error: "border-destructive/25 bg-destructive/[0.06] text-destructive",
  success: "border-secondary/30 bg-secondary/[0.07] text-secondary",
  warning: "border-primary/25 bg-primary/[0.06] text-primary",
} as const

function Banner({
  variant = "error",
  className,
  ...props
}: React.ComponentProps<"div"> & { variant?: keyof typeof VARIANTS }) {
  return (
    <div
      data-slot="banner"
      className={cn(
        "rounded-md border px-4 py-2.5 text-[13px] leading-relaxed",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
}

export { Banner }
