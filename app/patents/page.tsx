import type { Metadata } from "next";
import Image from "next/image";
import { FileBadge2 } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { innovations, patents } from "@/lib/data";

export const metadata: Metadata = {
  title: "براءات الاختراع",
  description: "عرض احترافي لبراءات الاختراع المسجلة لدى هونست فندي."
};

export default function PatentsPage() {
  return (
    <>
      <section className="section-shell pt-36">
        <FadeIn>
          <SectionHeading
            eyebrow="براءات الاختراع"
            title="مجموعة من الابتكارات المسجلة التي تمثل حصيلة سنوات من البحث والتطوير والابتكار الهندسي."
            description="تعكس البراءات منهجًا منضبطًا في حماية المعرفة وتطوير حلول عملية عبر المياه والمواد وتقنيات الأسطح والأنظمة المستدامة."
          />
        </FadeIn>
      </section>

      <section className="section-shell grid gap-5 py-16 md:grid-cols-2 md:py-24">
        {patents.map((patent, index) => (
          <FadeIn key={patent.title} delay={index * 0.05} className="premium-panel overflow-hidden rounded-lg">
            <div className="image-sheen relative h-64">
              <Image
                src="/honest-fendy/innovations-sheet.png"
                alt={`صورة مرتبطة ببراءة ${patent.title}`}
                fill
                className="object-cover"
                style={{ objectPosition: innovations[index]?.position ?? "center" }}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-3">
                <FileBadge2 className="text-[#D4AF37]" size={24} />
                <p className="text-xs font-black tracking-[0.08em] text-[#17C3B2]">براءة رقم ٠{index + 1}</p>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight text-white">{patent.title}</h2>
              <p className="mt-4 text-base leading-8 text-[#D6D6D6]/72">{patent.description}</p>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold text-[#D4AF37]">{patent.registration}</p>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  );
}
