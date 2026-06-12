import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { books } from "@/lib/data";

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

      <section className="section-shell grid gap-5 py-16 md:grid-cols-2 lg:grid-cols-3 md:py-24">
        {books.map((book, index) => (
          <FadeIn key={book.title} delay={index * 0.05} className="premium-panel rounded-lg p-5">
            <div className="relative h-80 overflow-hidden rounded-lg border border-white/10 bg-[#0B0F14]">
              <Image src="/honest-fendy/library.png" alt="" fill className="object-cover opacity-45" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14]/82 via-[#121820]/54 to-[#17C3B2]/16" />
              <div className="absolute right-0 top-0 h-full w-2 bg-[#D4AF37]" />
              <div className="absolute inset-x-6 bottom-6">
                <BookOpen className="mb-6 text-[#17C3B2]" size={28} />
                <p className="text-xs font-bold tracking-[0.08em] text-[#D4AF37]">{book.category}</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-white">{book.title}</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#D6D6D6]/70">{book.description}</p>
          </FadeIn>
        ))}
      </section>
    </>
  );
}
