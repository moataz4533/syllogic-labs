import { type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { products, type ProductId } from "@/lib/products";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

function onSpot(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}

export function ProductBento() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  return (
    <section id="suite" className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">The suite</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-fg sm:text-4xl">Engineered modules</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Each product is a complete system on its own. Fuse any pair — or the whole set — when the operation is ready. No rewrite. No hardware swap.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.id} onMouseMove={onSpot} className="spot-card relative flex flex-col overflow-hidden rounded-3xl bg-surface/70 p-6 shadow-hairline transition-[box-shadow] duration-200 ease-out hover:shadow-hairline-hover sm:p-8">
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-void/70 text-accent shadow-hairline">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-void/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted shadow-hairline">{p.badge}</span>
                </div>
                <h3 className="relative z-10 mt-6 font-display text-2xl font-semibold text-fg">{p.name}</h3>
                <p className="relative z-10 mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{p.tag}</p>
                <p className="relative z-10 mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="relative z-10 mt-6 space-y-2">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-fg/90">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />{f}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-fg/8 pt-5">
                  <span className="font-mono text-xs text-subtle">{p.domain}</span>
                  <div className="flex items-center gap-3">
                    <button type="button" className="text-xs text-muted transition-[color] duration-150 hover:text-fg" onClick={() => openDiscovery(p.id as ProductId)}>Talk to us</button>
                    <Link to="/modules/$id" params={{ id: p.id }} className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-fg", "transition-[color] duration-150 hover:text-accent")}>
                      Explore<ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
