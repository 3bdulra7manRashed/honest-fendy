import type { Metadata } from "next";
import Image from "next/image";
import { Award, Compass, Lightbulb, Microscope, PenTool, Target } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { founderAchievements, founderMilestones } from "@/lib/data";

export const metadata: Metadata = {
  title: "المؤسس",
  description: "صفحة الدكتور خالد عبد النعيم فندي، مؤسس هونست فندي وصاحب الرؤية الابتكارية."
};

const profileSections = [
  {
    title: "السيرة",
    icon: PenTool,
    text: "الدكتور خالد عبد النعيم فندي هو المؤسس والقوة الفكرية وراء هونست فندي، صاحب رؤية ابتكارية ممتدة لأكثر من ثلاثة عقود في مجالات البيئة والمياه والمواد المتقدمة والتنمية المستدامة."
  },
  {
    title: "الفلسفة",
    icon: Compass,
    text: "تنطلق فلسفته من أن الهندسة مسؤولية معرفية وإنسانية: حماية للمياه، وتقليل للهدر، وتوثيق للمعرفة، وتطوير لتقنيات تبقى نافعة بعد زمن طويل."
  },
  {
    title: "الخبرة",
    icon: Microscope,
    text: "تمتد الخبرة عبر الهندسة البيئية، وأنظمة المياه، والمواد المتقدمة، وبراءات الاختراع، والتأليف، والملاحظة الميدانية، والنمذجة، والتطوير طويل المدى."
  },
  {
    title: "الرسالة",
    icon: Target,
    text: "تحويل الاختراع إلى قيمة عامة من خلال علم موثوق، وملكية فكرية محمية، ومواد مستدامة، وحلول بيئية قابلة للتطبيق."
  }
];

export default function FounderPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36">
        <div className="section-shell grid min-h-[72vh] items-center gap-12 pb-20 lg:grid-cols-[.92fr_1.08fr]">
          <FadeIn>
            <span className="mb-6 inline-flex items-center rounded-full border border-[#17C3B2]/20 bg-[#17C3B2]/10 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-[#17C3B2]">
              المؤسس
            </span>
            <h1 className="brand-gradient-text text-balance text-5xl font-black leading-[1.16] md:text-7xl">
              الدكتور خالد عبد النعيم فندي
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-10 text-[#D6D6D6]/78">
              صاحب رؤية ابتكارية ممتدة لأكثر من ثلاثة عقود في مجالات البيئة والمياه والمواد المتقدمة والتنمية
              المستدامة، وبناء المعرفة من خلال البحث والتأليف وبراءات الاختراع.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="image-sheen relative h-[520px] overflow-hidden rounded-lg border border-white/10">
            <Image src="/honest-fendy/library.png" alt="أرشيف بحثي للمؤسس" fill className="object-cover" priority sizes="50vw" />
            <div className="absolute bottom-8 right-8 z-10 max-w-sm">
              <p className="text-sm font-bold tracking-[0.08em] text-[#D4AF37]">مسيرة تتجاوز ثلاثين عامًا</p>
              <p className="mt-3 text-2xl font-black text-white">مبتكر · مؤلف · مفكر بيئي</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell grid gap-5 py-16 md:grid-cols-2 md:py-24">
        {profileSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <FadeIn key={section.title} delay={index * 0.05} className="premium-panel rounded-lg p-7">
              <Icon className="text-[#17C3B2]" size={30} />
              <h2 className="mt-6 text-2xl font-black text-white">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-[#D6D6D6]/72">{section.text}</p>
            </FadeIn>
          );
        })}
      </section>

      <section className="bg-[#121820] py-16 md:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <FadeIn>
            <SectionHeading
              eyebrow="الرحلة"
              title="مسار طويل من التعلم التطبيقي والمعرفة المحمية والهدف البيئي."
            />
          </FadeIn>
          <div className="grid gap-4">
            {founderMilestones.map((milestone, index) => (
              <FadeIn key={milestone} delay={index * 0.05} className="rounded-lg border border-white/10 bg-[#0B0F14]/52 p-6">
                <p className="text-xs font-black tracking-[0.08em] text-[#D4AF37]">٠{index + 1}</p>
                <p className="mt-3 text-lg leading-8 text-white/82">{milestone}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <FadeIn>
          <SectionHeading eyebrow="الإنجازات" title="ملف مؤسس قائم على القيادة الفكرية والابتكار الهندسي." />
        </FadeIn>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {founderAchievements.map((achievement, index) => (
            <FadeIn key={achievement} delay={index * 0.04} className="premium-panel rounded-lg p-5">
              <Award className="text-[#D4AF37]" size={24} />
              <h3 className="mt-5 text-base font-black leading-7 text-white">{achievement}</h3>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 rounded-lg border border-[#17C3B2]/28 bg-[#17C3B2]/8 p-8">
          <Lightbulb className="text-[#17C3B2]" size={34} />
          <h2 className="mt-6 text-3xl font-black text-white">المهمة</h2>
          <p className="mt-4 max-w-4xl text-lg leading-9 text-[#D6D6D6]/78">
            بناء منظومة من الابتكارات والكتب والبراءات والتقنيات البيئية التي تخدم أمن المياه، والمواد
            المستدامة، والاقتصاد الدائري، ومستقبل الأجيال القادمة.
          </p>
        </FadeIn>
      </section>
    </>
  );
}
