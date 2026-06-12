import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandAtmosphere({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute left-[-10%] top-[4%] h-[34rem] w-[34rem] rounded-full bg-brand-blue/16 blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-brand-pink/10 blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-brand-sky/10 blur-3xl" />
      <Image
        src="/brand/mark.svg"
        alt=""
        width={720}
        height={890}
        priority
        className="absolute left-[-6%] top-20 h-auto w-[42rem] rotate-[-13deg] opacity-[0.045] blur-[0.5px] dark:opacity-[0.085]"
      />
      <Image
        src="/brand/mark.svg"
        alt=""
        width={380}
        height={470}
        className="absolute bottom-10 right-[12%] h-auto w-[18rem] rotate-[18deg] opacity-[0.045] blur-[1px] dark:opacity-[0.075]"
      />
    </div>
  );
}
