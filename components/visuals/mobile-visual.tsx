const screens = [
  { title: "Store", accent: "bg-brand-blue", shift: "translate-y-8 rotate-[-7deg]" },
  { title: "Service", accent: "bg-brand-sky", shift: "translate-y-0 rotate-[2deg] z-10" },
  { title: "Admin", accent: "bg-brand-pink", shift: "translate-y-12 rotate-[8deg]" }
];

export function MobileVisual() {
  return (
    <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden">
      <div className="absolute h-72 w-72 rounded-full bg-brand-blue/18 blur-3xl" />
      <div className="flex items-center justify-center gap-[-2rem]">
        {screens.map((screen) => (
          <div
            key={screen.title}
            className={`relative mx-[-18px] h-[360px] w-[178px] rounded-[34px] border border-border/70 bg-background/82 p-3 shadow-panel backdrop-blur-2xl ${screen.shift}`}
          >
            <div className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-foreground/16" />
            <div className="h-full overflow-hidden rounded-[26px] border border-border/50 bg-foreground/[0.035] p-4">
              <div className={`h-8 w-8 rounded-2xl ${screen.accent}`} />
              <div className="mt-5 h-4 w-20 rounded-full bg-foreground/20" />
              <div className="mt-3 h-3 w-28 rounded-full bg-foreground/10" />
              <div className="mt-7 grid grid-cols-2 gap-2">
                <div className="h-20 rounded-2xl bg-white/8" />
                <div className="h-20 rounded-2xl bg-brand-blue/12" />
              </div>
              <div className="mt-3 h-28 rounded-3xl bg-[radial-gradient(circle_at_50%_25%,rgba(75,201,241,.28),transparent_38%),rgba(255,255,255,.06)]" />
              <div className="mt-4 h-10 rounded-full bg-brand-blue/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
