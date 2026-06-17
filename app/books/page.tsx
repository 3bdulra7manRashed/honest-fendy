import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { books } from "@/lib/books-data";
import { BooksGallery } from "@/components/books-gallery";

export const metadata: Metadata = {
  title: "الكتب والمؤلفات",
  description: "المكتبة الرقمية لهونست فندي وما تتضمنه من مؤلفات وأبحاث ومحاور معرفية."
};

export default function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36">
        <div className="section-shell grid gap-12 pb-10 lg:grid-cols-[.85fr_1.15fr]">
          <FadeIn>
            <SectionHeading
              eyebrow="الكتب والمؤلفات"
              title="مكتبة معرفية تجمع البحث والاستدامة وبراءات الاختراع والقيادة الفكرية."
              description="مجموعة من المؤلفات والأبحاث التي تعكس الرؤية الفكرية والمعرفية للمؤسسة ومؤسسها، وتحفظ مسار التجربة والابتكار للأجيال القادمة."
            />
          </FadeIn>
          <FadeIn delay={0.1} className="image-sheen relative h-80 overflow-hidden rounded-lg border border-white/10">
            <Image src="/honest-fendy/library.png" alt="المكتبة الرقمية لهونست فندي" fill className="object-cover" priority sizes="50vw" />
          </FadeIn>
        </div>
      </section>

      <BooksGallery books={books} />
    </>
  );
}
