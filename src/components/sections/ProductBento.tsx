import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { products } from "@/lib/products";
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
                    "group relative block overflow-hidden rounded-3xl shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover",
                    featured ? "md:col-span-2" : "",
                  )}
                >
                  <img
                    src={p.image}
                    alt=""
                    className={cn(
                      "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                      featured ? "h-[22rem] sm:h-[28rem]" : "h-[17rem] sm:h-[20rem]",
                    )}
                    loading={featured ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
                  <div className="absolute end-4 top-4">
                    <span className="rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent shadow-hairline backdrop-blur-md">
                      {p.live ? copy.badge : copy.tag}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        {copy.tag}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
                        {p.name}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-fg/75 line-clamp-2">
                        {copy.relation}
                      </p>
                    </div>
                    <span className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-fg text-void sm:inline-flex">
                      <ArrowUpRight className="size-4" />
                    </span>
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
