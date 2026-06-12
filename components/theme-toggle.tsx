"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      aria-label="تبديل نمط العرض"
      title="تبديل نمط العرض"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-white/8 text-foreground/85 backdrop-blur-xl transition hover:border-brand-blue/70 hover:text-brand-blue hover:shadow-glow"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
