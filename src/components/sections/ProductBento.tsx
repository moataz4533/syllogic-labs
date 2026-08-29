import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/reveal";
import { products, type ProductId } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProductBento() {
  const { t } = useI18n();

  return (
    <section id="systems" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {t.systems.kicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-fg sm:text-4xl">
                {t.systems.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">{t.systems.body}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {products.map((p, i) => {
            const copy = t.products[p.id];
            const featured = i === 0;
            return (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  to="/modules/$id"
                  params={{ id: p.id }}
                  className={cn(
                    "group flex h-full flex-col rounded-3xl bg-surface/70 p-5 shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover sm:p-6",
                    featured && "md:col-span-2 md:flex-row md:items-center md:gap-10 md:p-7",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        {copy.tag}
                      </p>
                      <span className="rounded-full bg-void px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent shadow-hairline">
                        {p.live ? copy.badge : copy.tag}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-fg sm:text-3xl">
                      {p.name}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted">{copy.relation}</p>
                  </div>
                  <div className={cn("mt-5 w-full", featured && "md:mt-0 md:max-w-sm")}>
                    <ProductPreview id={p.id} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductPreview({ id }: { id: ProductId }) {
  if (id === "costora") {
    return (
      <div className="grid grid-cols-3 gap-2">
        <Metric k="rice" v="$2.40" />
        <Metric k="portion" v="$4.58" />
        <Metric k="sell" v="$17" accent />
      </div>
    );
  }
  if (id === "menura") {
    return (
      <ul className="space-y-2">
        {[
          ["Risotto", "$24"],
          ["Sea bream", "$32"],
          ["Citrus tart", "$14"],
        ].map(([name, price]) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-xl bg-void/50 px-3 py-2 font-mono text-[11px] shadow-hairline"
          >
            <span className="text-fg">{name}</span>
            <span className="text-accent">{price}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (id === "easyroom") {
    return (
      <div className="grid grid-cols-7 gap-1.5">
        {["ok", "ok", "accent", "ok", "warn", "accent", "ok"].map((tone, i) => (
          <span
            key={i}
            className={cn(
              "h-10 rounded-lg shadow-hairline",
              tone === "ok" && "bg-ok/25",
              tone === "accent" && "bg-accent/25",
              tone === "warn" && "bg-warn/25",
            )}
          />
        ))}
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {[
        ["Delta Produce", "$18,420"],
        ["Northline Dairy", "$6,210"],
        ["Harbor Fish", "$940"],
      ].map(([name, due]) => (
        <li
          key={name}
          className="flex items-center justify-between rounded-xl bg-void/50 px-3 py-2 text-[11px] shadow-hairline"
        >
          <span className="text-muted">{name}</span>
          <span className="font-mono tabular-nums text-fg">{due}</span>
        </li>
      ))}
    </ul>
  );
}

function Metric({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-xl bg-void/50 px-3 py-2.5 shadow-hairline">
      <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{k}</p>
      <p className={cn("mt-1 font-display text-lg tabular-nums", accent ? "text-accent" : "text-fg")}>
        {v}
      </p>
    </div>
  );
}
