import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080B10]">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.9fr]">
        <div>
          <Link href="/" className="relative block aspect-[808/520] w-52 overflow-hidden rounded-lg" aria-label="هونست فندي">
            <Image
              src="/logo/brand-lockup.png"
              alt="Honest Fendi — Saudi Engineering Intelligence"
              fill
              className="object-cover"
              sizes="208px"
            />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#D6D6D6]/72">
            مؤسسة بحثية وابتكارية تطوّر حلول المياه والبيئة والمواد المتقدمة، وتدعم الاستدامة وبراءات
            الاختراع وبناء المعرفة للأجيال القادمة.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">الصفحات</h2>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-[#D6D6D6]/64 transition hover:text-[#17C3B2]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">مجالات التركيز</h2>
          <div className="mt-5 grid gap-3 text-sm text-[#D6D6D6]/64">
            <span>حلول المياه</span>
            <span>الابتكار البيئي</span>
            <span>المواد المتقدمة</span>
            <span>براءات الاختراع والبحث</span>
          </div>
        </div>
      </div>
      <div className="section-shell flex justify-center border-t border-white/10 py-6 text-xs text-[#D6D6D6]/52 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} هونست فندي. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
