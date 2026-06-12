import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { galleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "معرض الصور",
  description: "معرض صور حديث لابتكارات ومواد وأنظمة مياه ومشروعات وأبحاث هونست فندي."
};

const categories = ["الابتكارات", "المواد", "أنظمة المياه", "المشروعات", "البحث", "العمارة"];

export default function GalleryPage() {
  return (
    <>
      <section className="section-shell pt-36">
        <FadeIn>
          <SectionHeading
            eyebrow="معرض الصور"
            title="أرشيف بصري حديث للابتكار والمواد وأنظمة المياه والمشروعات والبحث."
            description="تعرض الصور المختارة المؤسسة ككيان هندسي ومعرفي راقٍ، يضع المسؤولية البيئية والابتكار العلمي في مركز التجربة البصرية."
          />
        </FadeIn>
        <FadeIn className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#D6D6D6]/76">
              {category}
            </span>
          ))}
        </FadeIn>
      </section>

      <section className="wide-shell py-16 md:py-24">
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => {
            const source = index === 6 ? "/honest-fendy/library.png" : index > 6 ? "/honest-fendy/hero.png" : "/honest-fendy/innovations-sheet.png";
            const heightClass = index % 3 === 0 ? "h-[420px]" : index % 3 === 1 ? "h-[320px]" : "h-[520px]";

            return (
              <FadeIn key={`${item.title}-${index}`} delay={index * 0.035} className="mb-4 break-inside-avoid">
                <div className={`image-sheen relative ${heightClass} overflow-hidden rounded-lg border border-white/10`}>
                  <Image
                    src={source}
                    alt={item.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: item.position }}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute bottom-5 right-5 z-10 max-w-[80%]">
                    <p className="text-xs font-bold tracking-[0.08em] text-[#17C3B2]">{item.category}</p>
                    <h2 className="mt-2 text-2xl font-black text-white">{item.title}</h2>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
