"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryGridProps {
  imagePaths: string[];
}

const categories = ["الابتكارات", "المواد", "أنظمة المياه", "المشروعات", "البحث", "العمارة"];

const titlesMap: Record<string, string[]> = {
  "الابتكارات": [
    "تطوير النماذج الأولية",
    "منظومة معالجة متكاملة",
    "سبائك هندسية متقدمة",
    "منصة الابتكار البيئي",
    "براءات اختراع مسجلة",
    "نماذج المحاكاة الحيوية"
  ],
  "المواد": [
    "وسائط ترشيح متقدمة",
    "دراسة استقرار الأسطح",
    "مركبات معدنية صديقة للبيئة",
    "هندسة المواد والسبائك",
    "تحليل التآكل والمتانة",
    "طلاءات GoldShield الواقية"
  ],
  "أنظمة المياه": [
    "منظومة ترشيح مائي",
    "توزيع السوائل بدقة",
    "محطات المعالجة البيئية",
    "الري المائي المستدام",
    "ترشيد استهلاك المياه",
    "أنظمة تدوير المياه"
  ],
  "المشروعات": [
    "موقع معالجة المياه الميداني",
    "تطبيقات البنية المستدامة",
    "التكامل الهندسي للمواقع",
    "وحدات الخدمة المجتمعية",
    "مشروعات الحماية البيئية",
    "زيارات التقييم الميداني"
  ],
  "البحث": [
    "ملاحظات وتوثيق هندسي",
    "أبحاث المواد الخضراء",
    "الاقتصاد الدائري للمعرفة",
    "أرشيف براءات الاختراع",
    "المختبر الهندي التجريبي",
    "القيادة المعرفية والبيئية"
  ],
  "العمارة": [
    "المظهر الإنساني للأنظمة",
    "محطات المياه الحضرية",
    "نماذج مائية جمالية",
    "الدمج البيئي والمعماري",
    "التكامل الجمالي للتقنية",
    "تصاميم مستوحاة من الطبيعة"
  ]
};

export function GalleryGrid({ imagePaths }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Generate metadata items for all images
  const items = imagePaths.map((src, index) => {
    const category = categories[index % categories.length];
    const titles = titlesMap[category];
    const baseTitle = titles[(Math.floor(index / categories.length)) % titles.length];
    const repeatCount = Math.floor(index / (categories.length * titles.length)) + 1;
    const title = `${baseTitle} (${repeatCount})`;

    // Determine height class based on index to create a masonry-like effect
    const heightClass = index % 3 === 0 ? "h-[420px]" : index % 3 === 1 ? "h-[320px]" : "h-[500px]";

    return {
      src,
      title,
      category,
      heightClass,
      originalIndex: index
    };
  });

  const filteredItems = activeCategory === "الكل" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    // We store the original index in items so prev/next controls work correctly
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      {/* Category Filters */}
      <div className="section-shell mt-8 flex flex-wrap gap-2 md:gap-3">
        <button
          onClick={() => setActiveCategory("الكل")}
          className={`rounded-full border px-5 py-2.5 text-xs font-black transition duration-300 cursor-pointer ${
            activeCategory === "الكل"
              ? "border-[#17C3B2] bg-[#17C3B2] text-[#07100F] shadow-[0_0_20px_rgba(23,195,178,0.2)]"
              : "border-white/10 bg-[#0B0F14]/40 text-[#D6D6D6]/70 hover:border-[#17C3B2]/30 hover:text-white"
          }`}
        >
          الكل ({items.length})
        </button>
        {categories.map((category) => {
          const count = items.filter(item => item.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2.5 text-xs font-black transition duration-300 cursor-pointer ${
                activeCategory === category
                  ? "border-[#17C3B2] bg-[#17C3B2] text-[#07100F] shadow-[0_0_20px_rgba(23,195,178,0.2)]"
                  : "border-white/10 bg-[#0B0F14]/40 text-[#D6D6D6]/70 hover:border-[#17C3B2]/30 hover:text-white"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Masonry Image Grid */}
      <section className="wide-shell py-12 md:py-16">
        <motion.div 
          layout
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mb-4 break-inside-avoid"
              >
                <div
                  onClick={() => openLightbox(item.originalIndex)}
                  className={`image-sheen group relative ${item.heightClass} overflow-hidden rounded-2xl border border-white/10 cursor-pointer bg-[#070A0E]`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-85"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition duration-300 group-hover:opacity-80" />
                  
                  {/* Zoom indicator on hover */}
                  <div className="absolute top-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 transition duration-300 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    <Maximize2 size={16} className="text-[#17C3B2]" />
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-6 right-6 z-10 max-w-[85%] translate-y-2 group-hover:translate-y-0 transition duration-300">
                    <p className="text-[10px] md:text-xs font-black tracking-widest text-[#17C3B2] uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-xl md:text-2xl font-black text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Top Controls Bar */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-50">
              <div className="text-right">
                <p className="text-xs font-black text-[#17C3B2]">{currentItem.category}</p>
                <h4 className="text-sm md:text-base font-extrabold text-white mt-0.5">{currentItem.title}</h4>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={currentItem.src}
                  download={currentItem.src.split("/").pop()}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full p-2.5 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition duration-200 cursor-pointer"
                  title="تحميل الصورة"
                >
                  <Download size={20} />
                </a>
                <button
                  onClick={closeLightbox}
                  className="rounded-full p-2.5 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition duration-200 cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1 w-full max-w-5xl max-h-[78vh] flex items-center justify-center mt-12">
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-2 md:left-4 z-50 rounded-full p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 transition duration-200 cursor-pointer"
                aria-label="الصورة السابقة"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-2 md:right-4 z-50 rounded-full p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 transition duration-200 cursor-pointer"
                aria-label="الصورة التالية"
              >
                <ChevronRight size={24} />
              </button>

              {/* Interactive Image Frame */}
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F14] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </motion.div>
            </div>
            
            {/* Bottom indicator */}
            <div className="mt-4 text-xs text-white/40 font-bold">
              {lightboxIndex + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
