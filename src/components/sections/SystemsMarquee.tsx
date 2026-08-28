import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function SystemsMarquee() {
  const { t } = useI18n();
  const row = products.flatMap((p) => {
    const copy = t.products[p.id];
    return [`${p.name}`, copy.tag, p.domain];
  });
  const loop = [...row, ...row];

  return (
    <div className="relative z-10 overflow-hidden border-y border-fg/8 py-4">
      <div className="marquee-track flex w-max gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
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
