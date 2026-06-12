import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { innovations } from "@/lib/data";

export const metadata: Metadata = {
  title: "الابتكارات والتقنيات",
  description: "محفظة ابتكارات هونست فندي في المياه والبيئة والمواد المتقدمة."
};

export default function InnovationsPage() {
  return (
    <>
      <section className="section-shell pt-36">
        <FadeIn>
          <SectionHeading
            eyebrow="الابتكارات والتقنيات"
            title="اختراعات تطبيقية للمياه والبيئة والمواد المتقدمة والأنظمة المستدامة."
            description="كل ابتكار يُعرض كمنصة بحثية ذات مصداقية علمية، وحضور بصري مميز، واتجاه واضح نحو فائدة بيئية طويلة الأمد."
          />
        </FadeIn>
      </section>

      <section className="section-shell grid gap-7 py-16 md:py-24">
        {innovations.map((innovation, index) => (
          <FadeIn
            key={innovation.title}
            delay={index * 0.04}
            className="premium-panel grid overflow-hidden rounded-lg lg:grid-cols-[.9fr_1.1fr]"
          >
            <div className="image-sheen relative min-h-80">
              <Image
                src="/honest-fendy/innovations-sheet.png"
                alt={`عرض بصري لتقنية ${innovation.title}`}
                fill
                className="object-cover"
                style={{ objectPosition: innovation.position }}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
            <div className="p-7 md:p-9">
              <p className="text-xs font-black tracking-[0.08em] text-[#D4AF37]">ابتكار رقم ٠{index + 1}</p>
              <h2 className="mt-4 text-4xl font-black text-white">{innovation.title}</h2>
              <p className="mt-5 text-lg leading-9 text-[#D6D6D6]/76">{innovation.overview}</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-extrabold tracking-[0.08em] text-[#17C3B2]">التطبيقات</h3>
                  <div className="mt-4 grid gap-3">
                    {innovation.applications.map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm text-[#D6D6D6]/76">
                        <CheckCircle2 size={16} className="shrink-0 text-[#17C3B2]" /> {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-[0.08em] text-[#17C3B2]">الفوائد</h3>
                  <div className="mt-4 grid gap-3">
                    {innovation.benefits.map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm text-[#D6D6D6]/76">
                        <CheckCircle2 size={16} className="shrink-0 text-[#D4AF37]" /> {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  );
}
