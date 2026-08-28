import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function SystemsMarquee() {
  const { t } = useI18n();
  const row = [...products, ...products, ...products];

  return (
    <div className="relative z-10 overflow-hidden border-y border-fg/8 py-3">
      <div className="marquee-track flex w-max gap-3 px-3">
        {row.map((p, i) => (
          <a
            key={`${p.id}-${i}`}
            href={`#suite`}
            className="flex items-center gap-3 rounded-2xl bg-surface/60 pr-4 shadow-hairline"
          >
            <img
              src={p.image}
              alt=""
              className="h-12 w-20 rounded-xl object-cover"
            />
            <span className="font-display text-sm font-medium text-fg">{p.name}</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-subtle sm:inline">
              {t.products[p.id].tag}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
