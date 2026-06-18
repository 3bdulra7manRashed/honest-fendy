"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="التنقل الرئيسي"
        className={cn(
          "section-shell flex h-[72px] items-center justify-between rounded-full border px-4 transition-all duration-300 md:px-6",
          scrolled
            ? "border-white/10 bg-[#0B0F14]/78 shadow-panel backdrop-blur-2xl"
            : "border-white/5 bg-[#0B0F14]/18 backdrop-blur-sm"
        )}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="العودة إلى الرئيسية">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-[0_0_28px_rgba(23,195,178,.2)]">
            <Image
              src="/logo/brand-mark.png"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="48px"
            />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-extrabold tracking-[0.08em] text-white">هونست فندي</span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.08em] text-[#17C3B2]">
              مؤسسة الابتكار
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="subtle-link text-sm font-semibold text-white/68 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/innovations"
          className="hidden rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-5 py-3 text-sm font-bold text-[#F4DE9B] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/16 md:inline-flex"
        >
          استكشف الأعمال
        </Link>

        <button
          type="button"
          aria-label="فتح أو إغلاق القائمة"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-white/85 backdrop-blur-xl transition hover:border-[#17C3B2]/70 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={cn(
          "section-shell mt-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0F14]/92 shadow-panel backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <div className="grid gap-1 p-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-bold text-white/76 transition hover:bg-[#17C3B2]/10 hover:text-[#17C3B2]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
