import type { Metadata } from "next";
import Image from "next/image";
import { FileBadge2 } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { patents } from "@/lib/data";

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

        <FadeIn delay={0.1} className="premium-panel image-sheen relative mt-10 aspect-[16/9] overflow-hidden rounded-lg md:mt-14 md:aspect-[2/1]">
          <Image
            src="/patents/images/patents-portfolio-hero.png"
            alt="تصور بصري لمجموعة ابتكارات في تنقية المياه والمواد المتقدمة والسبائك وحماية الأسطح"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1180px) 1180px, calc(100vw - 32px)"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#080B10] via-[#080B10]/45 to-transparent px-6 pb-6 pt-20 md:px-10 md:pb-9">
            <p className="max-w-2xl text-sm font-bold leading-7 text-white/80 md:text-base">
              منظومة متكاملة من الحلول الهندسية التي تجمع بين كفاءة الموارد، والاستدامة، وحماية المعرفة المبتكرة.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="section-shell grid gap-5 py-16 md:grid-cols-2 md:py-20">
        {patents.map((patent, index) => (
          <FadeIn key={patent.title} delay={index * 0.05} className="premium-panel overflow-hidden rounded-lg">
            <div className="image-sheen relative h-64">
              <Image
                src={patent.image}
                alt={`صورة مرتبطة ببراءة ${patent.title}`}
                fill
                className="object-cover"
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
