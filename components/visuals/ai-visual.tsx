const nodes = [
  "تحليل",
  "فهم",
  "أتمتة",
  "اقتراح",
  "تحسين"
];

export function AiVisual() {
  return (
    <div className="relative grid min-h-[430px] place-items-center overflow-hidden rounded-[34px]">
      <div className="absolute inset-0 bg-soft-grid bg-[length:42px_42px] opacity-40" />
      <div className="absolute h-80 w-80 rounded-full border border-brand-blue/20 bg-brand-blue/10 blur-sm" />
      <div className="absolute h-56 w-56 rounded-full border border-brand-sky/25" />
      <div className="relative grid h-44 w-44 place-items-center rounded-full border border-border/70 bg-background/80 shadow-glow backdrop-blur-2xl">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-blue text-lg font-black text-white shadow-glow">
          AI
        </div>
      </div>
      {nodes.map((node, index) => {
        const positions = [
          "right-[8%] top-[18%]",
          "left-[10%] top-[22%]",
          "right-[14%] bottom-[18%]",
          "left-[16%] bottom-[16%]",
          "left-1/2 top-[6%] -translate-x-1/2"
        ];
        return (
          <div
            key={node}
            className={`absolute ${positions[index]} rounded-2xl border border-border/70 bg-background/72 px-5 py-3 text-sm font-bold text-foreground/82 shadow-panel backdrop-blur-2xl`}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
}
