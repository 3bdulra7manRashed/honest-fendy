export function WebVisual() {
  return (
    <div className="relative min-h-[420px]">
      <div className="absolute inset-x-4 top-8 rounded-[28px] border border-border/70 bg-background/72 p-3 shadow-panel backdrop-blur-2xl md:inset-x-8">
        <div className="flex items-center justify-between border-b border-border/60 px-3 pb-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-pink" />
            <span className="h-3 w-3 rounded-full bg-brand-sky" />
            <span className="h-3 w-3 rounded-full bg-brand-blue" />
          </div>
          <div className="h-7 w-44 rounded-full bg-foreground/8" />
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_.75fr]">
          <div className="space-y-4">
            <div className="h-8 w-32 rounded-full bg-brand-blue/18" />
            <div className="h-16 rounded-3xl bg-gradient-to-l from-brand-blue/28 via-brand-purple/18 to-transparent" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-24 rounded-3xl border border-border/60 bg-white/8" />
              <div className="h-24 rounded-3xl border border-border/60 bg-brand-sky/10" />
              <div className="h-24 rounded-3xl border border-border/60 bg-white/8" />
            </div>
          </div>
          <div className="rounded-[24px] border border-border/60 bg-foreground/[0.035] p-4">
            <div className="mb-4 h-36 rounded-[20px] bg-[radial-gradient(circle_at_65%_35%,rgba(75,201,241,.32),transparent_32%),linear-gradient(135deg,rgba(68,96,239,.2),rgba(63,55,202,.08))]" />
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-foreground/18" />
              <div className="h-3 w-2/3 rounded-full bg-foreground/10" />
              <div className="h-10 w-28 rounded-full bg-brand-blue" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-2 w-56 rounded-[24px] border border-border/70 bg-background/82 p-4 shadow-glow backdrop-blur-2xl">
        <div className="h-4 w-20 rounded-full bg-brand-pink/36" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-20 rounded-2xl bg-brand-blue/14" />
          <div className="h-20 rounded-2xl bg-brand-sky/12" />
        </div>
      </div>
    </div>
  );
}
