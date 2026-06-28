"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FlaskConical,
  Images,
  Layers3,
  Maximize2,
  Trees,
  Waves,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  collection: "pool" | "landscape" | "surface-carbon";
  collectionLabel: string;
  stage?: "construction" | "finished";
  stageLabel: string;
  featured: boolean;
  imageMode: "cover" | "contain";
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const collections = [
  {
    id: "pool",
    shortTitle: "المسابح",
    title: "المسابح من الإنشاء إلى التسليم",
    description: "توثيق متسلسل لأعمال التأسيس والعزل والتجهيز والكسوة، وصولًا إلى المسابح السكنية ومشروعات المنتجعات.",
    icon: Waves,
    accent: "#17C3B2"
  },
  {
    id: "landscape",
    shortTitle: "تنسيق المواقع",
    title: "تنسيق المواقع والمساحات الخارجية",
    description: "حدائق وممرات وجلسات خارجية تجمع بين الوظيفة، راحة الاستخدام، وتكامل المشهد مع العمارة.",
    icon: Trees,
    accent: "#7FD17A"
  },
  {
    id: "surface-carbon",
    shortTitle: "الأسطح والكربون",
    title: "تقنيات الأسطح الهجينة والكربون المتقدم",
    description: "نماذج واختبارات بحثية لأسطح هندسية عالية المقاومة، إلى جانب مواد كربونية مطورة من مصادر حيوية.",
    icon: Layers3,
    accent: "#D4AF37"
  }
] as const;

type CollectionId = "all" | (typeof collections)[number]["id"];
type StageId = "all" | "construction" | "finished";

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCollection, setActiveCollection] = useState<CollectionId>("all");
  const [activeStage, setActiveStage] = useState<StageId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const collectionMatches = activeCollection === "all" || item.collection === activeCollection;
        const stageMatches = activeStage === "all" || item.stage === activeStage;
        return collectionMatches && stageMatches;
      }),
    [activeCollection, activeStage, items]
  );

  const currentItem = lightboxIndex === null ? null : filteredItems[lightboxIndex];

  const selectCollection = (collection: CollectionId) => {
    setActiveCollection(collection);
    setActiveStage("all");
    setLightboxIndex(null);
  };

  const showPrevious = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % filteredItems.length
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filteredItems.length, lightboxIndex]);

  return (
    <>
      <section className="section-shell pt-12 md:pt-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            const count = items.filter((item) => item.collection === collection.id).length;
            const cover = items.find((item) => item.collection === collection.id && item.featured) ??
              items.find((item) => item.collection === collection.id);

            return (
              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => selectCollection(collection.id)}
                className="group relative min-h-[21rem] overflow-hidden rounded-2xl border border-white/10 bg-[#080C11] text-right shadow-[0_24px_70px_rgba(0,0,0,.28)]"
              >
                {cover && (
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-65"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/72 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full border bg-black/40"
                      style={{ color: collection.accent, borderColor: `${collection.accent}55` }}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-black text-white/70">
                      {count} صورة
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{collection.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#D6D6D6]/72">{collection.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black" style={{ color: collection.accent }}>
                    استكشف المجموعة <ArrowLeft size={15} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-14">
        <div className="flex flex-col gap-5 border-y border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.14em] text-[#17C3B2]">تصفّح الأرشيف</p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {activeCollection === "all"
                ? "جميع المشروعات والتقنيات"
                : collections.find((collection) => collection.id === activeCollection)?.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={activeCollection === "all"} onClick={() => selectCollection("all")}>
              الكل ({items.length})
            </FilterButton>
            {collections.map((collection) => (
              <FilterButton
                key={collection.id}
                active={activeCollection === collection.id}
                onClick={() => selectCollection(collection.id)}
              >
                {collection.shortTitle} ({items.filter((item) => item.collection === collection.id).length})
              </FilterButton>
            ))}
          </div>
        </div>

        {activeCollection === "pool" && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="ml-2 text-xs font-bold text-white/45">مرحلة المشروع:</span>
            <StageButton active={activeStage === "all"} onClick={() => setActiveStage("all")}>
              المسار الكامل
            </StageButton>
            <StageButton active={activeStage === "construction"} onClick={() => setActiveStage("construction")}>
              مرحلة الإنشاء ({items.filter((item) => item.stage === "construction").length})
            </StageButton>
            <StageButton active={activeStage === "finished"} onClick={() => setActiveStage("finished")}>
              بعد التنفيذ ({items.filter((item) => item.stage === "finished").length})
            </StageButton>
          </div>
        )}
      </section>

      <section className="wide-shell py-10 md:py-14">
        <div className="mb-5 flex items-center gap-2 text-xs font-bold text-white/45">
          <Images size={15} className="text-[#17C3B2]" />
          عرض {filteredItems.length} صورة
        </div>
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const heightClass = item.imageMode === "contain"
                ? "h-[430px]"
                : index % 4 === 0
                  ? "h-[460px]"
                  : index % 4 === 1
                    ? "h-[340px]"
                    : "h-[390px]";

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    onClick={() => setLightboxIndex(index)}
                    className={`image-sheen group relative block w-full ${heightClass} cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-[#070A0E] text-right`}
                    aria-label={`فتح صورة: ${item.title}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className={`${item.imageMode === "contain" ? "object-contain" : "object-cover"} transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-75 transition group-hover:opacity-90" />
                    <span className="absolute left-5 top-5 z-10 flex h-10 w-10 scale-90 items-center justify-center rounded-full border border-white/10 bg-black/60 text-[#17C3B2] opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                      <Maximize2 size={16} />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-black tracking-[0.08em]">
                        <span className="text-[#17C3B2]">{item.collectionLabel}</span>
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                        <span className="text-[#D4AF37]">{item.stageLabel}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-black leading-8 text-white">{item.title}</h3>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <div className="absolute inset-x-4 top-4 z-50 flex items-start justify-between gap-4">
              <div className="text-right">
                <p className="text-xs font-black text-[#17C3B2]">{currentItem.collectionLabel}</p>
                <h4 className="mt-1 text-sm font-extrabold text-white md:text-base">{currentItem.title}</h4>
                <p className="mt-1 text-[11px] font-bold text-[#D4AF37]">{currentItem.stageLabel}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={currentItem.src}
                  download
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-full bg-white/5 p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  title="تحميل الصورة"
                  aria-label="تحميل الصورة"
                >
                  <Download size={20} />
                </a>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="rounded-full bg-white/5 p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="relative mt-16 flex h-[76vh] w-full max-w-6xl items-center justify-center">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-2 z-50 rounded-full bg-black/55 p-3 text-white/75 transition hover:bg-black/80 hover:text-white md:left-4"
                aria-label="الصورة السابقة"
              >
                <ChevronLeft size={25} />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 z-50 rounded-full bg-black/55 p-3 text-white/75 transition hover:bg-black/80 hover:text-white md:right-4"
                aria-label="الصورة التالية"
              >
                <ChevronRight size={25} />
              </button>
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(event) => event.stopPropagation()}
                className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080B0F] shadow-[0_0_90px_rgba(0,0,0,.85)]"
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </motion.div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/40">
              <FlaskConical size={14} className="text-[#D4AF37]" />
              {lightboxIndex! + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-xs font-black transition ${
        active
          ? "border-[#17C3B2] bg-[#17C3B2] text-[#07100F] shadow-[0_0_20px_rgba(23,195,178,.18)]"
          : "border-white/10 bg-[#0B0F14]/50 text-[#D6D6D6]/70 hover:border-[#17C3B2]/35 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function StageButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3.5 py-2 text-xs font-extrabold transition ${
        active
          ? "border-[#D4AF37]/55 bg-[#D4AF37]/12 text-[#F2D77D]"
          : "border-white/10 text-white/55 hover:border-[#D4AF37]/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
