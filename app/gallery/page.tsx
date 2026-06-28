import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid, type GalleryItem } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "معرض المشروعات والتقنيات",
  description: "أرشيف بصري لمشروعات المسابح وتنسيق المواقع وتقنيات الأسطح الهجينة والكربون المتقدم لدى هونست فندي."
};

const galleryRoot = path.join(process.cwd(), "public", "gallery");

const poolConstructionTitles: Record<string, string> = {
  "IMG-20260612-WA0003.jpg": "تشكيل الأحواض والهيكل الإنشائي للمشروع",
  "IMG-20260615-WA0015.jpg": "تجهيز قنوات الصرف المحيطي بدقة",
  "IMG-20260615-WA0018.jpg": "تنسيق وحدات الإضاءة والصرف قبل التركيب",
  "IMG-20260615-WA0019.jpg": "معالجة جسم المسبح وتجهيز الأسطح الداخلية",
  "IMG-20260615-WA0020.jpg": "ضبط التمديدات والإضاءة داخل الحوض",
  "IMG-20260615-WA0021.jpg": "استكمال العزل وتسوية أرضية المسبح",
  "WhatsApp Image 2026-06-27 at 6.42.53 PM.jpeg": "تأسيس المسبح العضوي قبل أعمال الكسوة"
};

const poolFinishedTitles: Record<string, string> = {
  "IMG-20260513-WA0005.jpg": "نظام اللاجون الفاخر متعدد الطبقات",
  "IMG-20260513-WA0007.jpg": "تفاصيل سطح الكوارتز الخزفي للمسابح",
  "IMG-20260612-WA0002.jpg": "مسبح سكني بتكامل معماري وتنسيق خارجي",
  "IMG-20260612-WA0004.jpg": "مسبح سكني بحواف حجرية هادئة",
  "IMG-20260612-WA0005.jpg": "مسبح منتجع مندمج مع المشهد الساحلي",
  "IMG-20260615-WA0010.jpg": "التكوين الهندسي لنظام اللاجون الفاخر",
  "IMG-20260615-WA0017.jpg": "تصور تطبيقي لسطح الكوارتز الخزفي",
  "IMG-20260615-WA0028.jpg": "صفاء المياه ودقة الحواف المعمارية",
  "IMG-20260615-WA0030.jpg": "مسبح عضوي ضمن حديقة سكنية",
  "IMG-20260615-WA0032.jpg": "تجديد السطح الداخلي وطبقة الحماية",
  "IMG-20260615-WA0034.jpg": "كسوة موزاييك متكاملة مع درجات داخلية",
  "IMG-20260615-WA0035.jpg": "تشطيب داخلي سلس لتكوين عضوي",
  "IMG-20260615-WA0039.jpg": "سلالم دائرية بتشطيب موزاييك دقيق",
  "IMG-20260615-WA0040.jpg": "تفاصيل المقعد المائي والكسوة الزجاجية",
  "IMG-20260615-WA0042.jpg": "دقة تشطيب الحواف داخل منطقة الجلوس",
  "IMG-20260615-WA0043.jpg": "إضاءة ليلية تمنح المسبح حضورًا بصريًا",
  "IMG-20260615-WA0050.jpg": "توثيق الخبرة التنفيذية في مشروعات المسابح",
  "IMG-20260615-WA0051.jpg": "اكتمال الكسوة والتجهيزات المحيطية",
  "IMG-20260615-WA0052.jpg": "تناسق الموزاييك مع العمارة الحديثة",
  "IMG-20260615-WA0055.jpg": "توزيع الدرجات والفتحات داخل الحوض",
  "IMG-20260615-WA0056.jpg": "المشهد النهائي للحوض قبل التشغيل",
  "IMG-20260615-WA0073.jpg": "سجل مشروعات المسابح والبحيرات الصناعية",
  "WhatsApp Image 2026-06-27 at 6.42.17 PM.jpeg": "مسبح عضوي بكسوة خضراء عميقة",
  "WhatsApp Image 2026-06-27 at 6.42.39 PM.jpeg": "مسبح منتجع منسجم مع الطبيعة الصخرية"
};

const landscapeTitles: Record<string, string> = {
  "IMG-20260612-WA0000.jpg": "ممرات هندسية وسط مسطح أخضر ساحلي",
  "IMG-20260615-WA0031.jpg": "حديقة سكنية بممر حجري وتوزيع نباتي",
  "IMG-20260615-WA0036.jpg": "جلسة خارجية متكاملة مع البرجولة",
  "IMG-20260615-WA0038.jpg": "ركن ضيافة تحيط به الزراعة الكثيفة"
};

const surfaceTitles: Record<string, string> = {
  "IMG-20260513-WA0010.jpg": "اختبار مقاومة الصدمات والمواد الكيميائية",
  "IMG-20260513-WA0016.jpg": "منظومة FENDY Hybrid Surface™ المتكاملة",
  "IMG-20260513-WA0019.jpg": "تطبيق معماري لسطح فندي الهجين",
  "IMG-20260513-WA0027.jpg": "عينة سطح هندسي متقدم عالي النقاء",
  "IMG-20260615-WA0013.jpg": "كربون منشط مُنتج من نوى الزيتون"
};

const archivalVisuals = new Set([
  "IMG-20260513-WA0005.jpg",
  "IMG-20260513-WA0007.jpg",
  "IMG-20260513-WA0016.jpg",
  "IMG-20260615-WA0010.jpg",
  "IMG-20260615-WA0017.jpg",
  "IMG-20260615-WA0050.jpg",
  "IMG-20260615-WA0073.jpg"
]);

function publicImagePath(...segments: string[]) {
  return `/gallery/${segments.map(encodeURIComponent).join("/")}`;
}

async function readImages(directory: string) {
  try {
    return (await fs.readdir(directory)).filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)).sort();
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const constructionFiles = await readImages(path.join(galleryRoot, "pool", "مرحلة البناء"));
  const finishedFiles = await readImages(path.join(galleryRoot, "pool", "بعد التشطيب"));
  const landscapeFiles = await readImages(path.join(galleryRoot, "landscape"));
  const surfaceFiles = await readImages(path.join(galleryRoot, "hybird syrface & carbon"));

  const items: GalleryItem[] = [
    ...constructionFiles.map((file, index) => ({
      id: `pool-construction-${file}`,
      src: publicImagePath("pool", "مرحلة البناء", file),
      title: poolConstructionTitles[file] ?? `مرحلة تنفيذ المسبح — توثيق ${index + 1}`,
      collection: "pool" as const,
      collectionLabel: "المسابح من الإنشاء إلى التسليم",
      stage: "construction" as const,
      stageLabel: "مرحلة الإنشاء",
      featured: false,
      imageMode: "cover" as const
    })),
    ...finishedFiles.map((file, index) => ({
      id: `pool-finished-${file}`,
      src: publicImagePath("pool", "بعد التشطيب", file),
      title: poolFinishedTitles[file] ?? `مشروع مسبح مكتمل — توثيق ${index + 1}`,
      collection: "pool" as const,
      collectionLabel: "المسابح من الإنشاء إلى التسليم",
      stage: "finished" as const,
      stageLabel: "بعد التنفيذ",
      featured: file === "WhatsApp Image 2026-06-27 at 6.42.39 PM.jpeg",
      imageMode: archivalVisuals.has(file) ? ("contain" as const) : ("cover" as const)
    })),
    ...landscapeFiles.map((file, index) => ({
      id: `landscape-${file}`,
      src: publicImagePath("landscape", file),
      title: landscapeTitles[file] ?? `تنسيق مساحة خارجية — مشروع ${index + 1}`,
      collection: "landscape" as const,
      collectionLabel: "تنسيق المواقع والمساحات الخارجية",
      stageLabel: "مشروع مكتمل",
      featured: file === "IMG-20260615-WA0036.jpg",
      imageMode: "cover" as const
    })),
    ...surfaceFiles.map((file, index) => ({
      id: `surface-${file}`,
      src: publicImagePath("hybird syrface & carbon", file),
      title: surfaceTitles[file] ?? `بحث وتطوير المواد — نموذج ${index + 1}`,
      collection: "surface-carbon" as const,
      collectionLabel: "تقنيات الأسطح الهجينة والكربون المتقدم",
      stageLabel: "بحث وتطوير",
      featured: file === "IMG-20260513-WA0010.jpg",
      imageMode: file === "IMG-20260615-WA0013.jpg" ? ("cover" as const) : ("contain" as const)
    }))
  ];

  return (
    <>
      <section className="section-shell pt-36">
        <FadeIn>
          <SectionHeading
            eyebrow="معرض المشروعات والتقنيات"
            title="من مراحل التنفيذ الدقيقة إلى النتيجة التي تتحدث عن نفسها."
            description="أرشيف بصري منظم يوثق خبرتنا في إنشاء وتشطيب المسابح، وتنسيق المواقع والمساحات الخارجية، وتطوير الأسطح الهجينة ومواد الكربون المتقدم."
          />
        </FadeIn>
      </section>

      {items.length > 0 ? (
        <GalleryGrid items={items} />
      ) : (
        <div className="section-shell py-24 text-center font-bold text-[#D6D6D6]/50">
          لا توجد صور متوفرة في معرض المشروعات حاليًا.
        </div>
      )}
    </>
  );
}
