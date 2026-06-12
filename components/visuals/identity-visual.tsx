import Image from "next/image";

export function IdentityVisual() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-border/70 bg-background/60 p-6 shadow-panel backdrop-blur-2xl">
      <div className="grid h-full gap-4 md:grid-cols-[.8fr_1fr]">
        <div className="rounded-[28px] border border-border/60 bg-foreground/[0.035] p-5">
          <div className="grid h-24 w-24 place-items-center rounded-[26px] bg-brand-blue/16">
            <Image src="/brand/mark.svg" alt="" width={56} height={70} className="h-14 w-14" />
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-4 w-28 rounded-full bg-foreground/18" />
            <div className="h-3 w-44 rounded-full bg-foreground/10" />
            <div className="h-3 w-32 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-8 flex gap-3">
            <span className="h-10 w-10 rounded-full bg-brand-blue" />
            <span className="h-10 w-10 rounded-full bg-brand-sky" />
            <span className="h-10 w-10 rounded-full bg-brand-purple" />
            <span className="h-10 w-10 rounded-full bg-brand-pink" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[28px] border border-border/60 bg-white/8 p-5">
            <div className="h-20 rounded-3xl bg-[linear-gradient(135deg,rgba(68,96,239,.34),rgba(252,49,150,.16))]" />
            <div className="mt-4 h-4 w-36 rounded-full bg-foreground/14" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 rounded-[24px] border border-border/60 bg-brand-sky/10" />
            <div className="h-28 rounded-[24px] border border-border/60 bg-brand-purple/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
