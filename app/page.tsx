import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Atom, Droplets, Leaf, Recycle, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { galleryItems, innovations, stats } from "@/lib/data";
import { books } from "@/lib/books-data";

const visionItems = [
  { title: "حلول المياه", icon: Droplets },
  { title: "الأثر البيئي", icon: Leaf },
  { title: "الاقتصاد الدائري", icon: Recycle },
  { title: "المواد المستدامة", icon: Atom },
  { title: "الأجيال القادمة", icon: Sparkles }
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/honest-fendy/hero.png"
          alt="بيئة بحثية فاخرة تجمع بين المياه والمواد المتقدمة"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(11,15,20,.94)_0%,rgba(11,15,20,.78)_40%,rgba(11,15,20,.24)_74%),linear-gradient(180deg,rgba(11,15,20,.22)_0%,#0B0F14_100%)]" />
        <div className="section-shell relative flex min-h-screen items-center pt-28">
          <FadeIn className="max-w-4xl pb-20">
            <p className="mb-7 text-xs font-extrabold tracking-[0.12em] text-[#17C3B2]">
              الابتكار · الاستدامة · المواد المتقدمة
            </p>
            <h1 className="brand-gradient-text text-balance text-5xl font-black leading-[1.18] sm:text-6xl lg:text-7xl">
              ثلاثون عامًا من الابتكار في حلول البيئة والمياه والمواد المتقدمة
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#D6D6D6] md:text-xl">
              نطوّر حلولًا مستدامة من خلال البحث العلمي والاختراع والتقنيات المتقدمة لخدمة الإنسان والبيئة.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/innovations">استكشف الابتكارات</ButtonLink>
              <ButtonLink href="/patents" variant="glass">عرض براءات الاختراع</ButtonLink>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn
              key={stat.label}
              delay={index * 0.06}
              className="premium-panel rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-[#17C3B2]/45"
            >
              <p className="text-4xl font-black text-white md:text-5xl">{stat.value}</p>
              <h2 className="mt-5 text-sm font-extrabold tracking-[0.08em] text-[#17C3B2]">{stat.label}</h2>
              <p className="mt-4 text-sm leading-7 text-[#D6D6D6]/66">{stat.detail}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
        <FadeIn>
          <SectionHeading
            eyebrow="من نحن"
            title="مؤسسة ابتكار هندسي تقود المعرفة نحو حلول أكثر استدامة."
            description="مؤسسة رائدة في مجال الابتكار والتطوير الهندسي، متخصصة في ابتكار حلول متقدمة للمياه والبيئة والمواد المستقبلية، مع سجل حافل من الإنجازات وبراءات الاختراع والمشروعات المعرفية."
          />
        </FadeIn>
        <FadeIn delay={0.1} className="premium-panel rounded-lg p-7">
          <p className="text-xl leading-10 text-white/86">
            تمثل هونست فندي خبرة ممتدة في البحث والتجربة والتوثيق، وتعمل على تحويل المعرفة العلمية إلى حلول
            عملية مسؤولة تخدم المياه والبيئة والمواد المتقدمة وتبني قيمة طويلة الأمد.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["عمق بحثي", "ارتباط بالتطبيق", "انضباط في الملكية الفكرية", "قيادة معرفية"].map((item) => (
              <div key={item} className="border-r border-[#17C3B2]/50 pr-4 text-sm font-bold text-[#D6D6D6]">
                {item}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="section-shell py-16 md:py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="أبرز الابتكارات"
            title="ذكاء المواد في خدمة المياه والبيئة وطول العمر التشغيلي."
            description="مجموعة مركزة من المفاهيم والتقنيات المحمية معرفيًا في مجالات الترشيح، والمركبات الخضراء، والسبائك، والري، وحماية الأسطح."
          />
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {innovations.map((innovation, index) => (
            <FadeIn
              key={innovation.title}
              delay={index * 0.05}
              className="premium-panel group overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-[#17C3B2]/45"
            >
              <div className="image-sheen relative h-56">
                <Image
                  src={innovation.image}
                  alt={`صورة ابتكار ${innovation.title}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-white">{innovation.title}</h3>
                <p className="mt-4 min-h-20 text-sm leading-7 text-[#D6D6D6]/70">{innovation.summary}</p>
                <Link
                  href="/innovations"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#17C3B2] transition group-hover:text-[#D4AF37]"
                >
                  معرفة المزيد <ArrowLeft size={16} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#121820] py-16 md:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[1fr_.9fr]">
          <FadeIn>
            <SectionHeading
              eyebrow="رؤية الاستدامة"
              title="هندسة تتعامل مع أمن المياه ومسؤولية المواد كمسار واحد للمستقبل."
              description="تربط هونست فندي بين الاختراع والقيمة البيئية القابلة للقياس: مياه أنظف، هدر أقل، مواد أكثر متانة، تفكير دائري، ومسؤولية تجاه الأجيال التي سترث قرارات اليوم."
            />
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {visionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.05} className="rounded-lg border border-white/10 bg-[#0B0F14]/56 p-5">
                  <Icon className="text-[#17C3B2]" size={26} />
                  <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="المكتبة والكتب"
            title="مجموعة من المؤلفات والأبحاث التي تعكس الرؤية الفكرية والمعرفية للمؤسسة ومؤسسها."
          />
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {books.slice(0, 3).map((book, index) => (
            <FadeIn key={book.title} delay={index * 0.06} className="premium-panel rounded-lg p-5">
              <div className="relative h-72 overflow-hidden rounded-lg border border-white/10 bg-[#0B0F14]">
                <Image src="/honest-fendy/library.png" alt="" fill className="object-cover opacity-55" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14]/74 via-[#0B0F14]/40 to-[#17C3B2]/18" />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-xs font-bold tracking-[0.08em] text-[#D4AF37]">{book.category}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-white">{book.title}</h3>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#D6D6D6]/70">{book.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="wide-shell py-16 md:py-24">
        <div className="section-shell">
          <FadeIn>
            <SectionHeading
              eyebrow="معرض الصور"
              title="أرشيف بصري للمواد والأبحاث وأنظمة المياه والبيئات المستقبلية."
            />
          </FadeIn>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {galleryItems.slice(0, 6).map((item, index) => (
            <FadeIn
              key={`${item.title}-${index}`}
              delay={index * 0.04}
              className={`image-sheen relative h-72 overflow-hidden rounded-lg border border-white/10 ${
                index === 0 || index === 5 ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={index > 3 ? "/honest-fendy/hero.png" : "/honest-fendy/innovations-sheet.png"}
                alt={item.title}
                fill
                className="object-cover"
                style={{ objectPosition: item.position }}
                sizes="(min-width: 768px) 25vw, 100vw"
              />
              <div className="absolute bottom-5 right-5 z-10">
                <p className="text-xs font-bold tracking-[0.08em] text-[#17C3B2]">{item.category}</p>
                <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
