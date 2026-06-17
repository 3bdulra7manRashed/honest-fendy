import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "معرض الصور",
  description: "معرض صور حديث لابتكارات ومواد وأنظمة مياه ومشروعات وأبحاث هونست فندي."
};

export default async function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let imagePaths: string[] = [];

  try {
    const files = await fs.readdir(galleryDir);
    imagePaths = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort()
      .map((file) => `/gallery/${file}`);
  } catch (error) {
    console.error("Failed to read gallery directory:", error);
  }

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
      </section>

      {imagePaths.length > 0 ? (
        <GalleryGrid imagePaths={imagePaths} />
      ) : (
        <div className="section-shell py-24 text-center text-[#D6D6D6]/50 font-bold">
          لا توجد صور متوفرة في معرض الصور حالياً.
        </div>
      )}
    </>
  );
}
