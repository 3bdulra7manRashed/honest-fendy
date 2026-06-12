import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "right" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "right",
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl text-right", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-[#17C3B2]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-[#D6D6D6]/72 md:text-lg">{description}</p> : null}
    </div>
  );
}
