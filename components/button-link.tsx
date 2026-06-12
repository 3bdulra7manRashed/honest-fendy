import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "glass" | "gold";
  showIcon?: boolean;
};

export function ButtonLink({ className, variant = "primary", showIcon = true, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition duration-300",
        variant === "primary" &&
          "bg-[#17C3B2] text-[#07100F] shadow-[0_0_42px_rgba(23,195,178,.22)] hover:-translate-y-0.5 hover:bg-[#35E0D0]",
        variant === "glass" &&
          "border border-white/14 bg-white/7 text-white/88 backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#17C3B2]/70 hover:bg-[#17C3B2]/10 hover:text-white",
        variant === "gold" &&
          "border border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#F6E3A8] hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/18",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showIcon ? <ArrowLeft size={17} className="transition group-hover:-translate-x-1" /> : null}
    </Link>
  );
}
