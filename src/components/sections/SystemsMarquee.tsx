import { products } from "@/lib/products";
import { stackFlat } from "@/lib/stack";

export function SystemsMarquee() {
  const row = [...products.map((p) => p.name), ...stackFlat];
  const loop = [...row, ...row];

  return (
    <div className="relative z-10 overflow-hidden border-y border-fg/8 py-4">
      <div className="marquee-track flex w-max gap-8 px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-accent/50">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
