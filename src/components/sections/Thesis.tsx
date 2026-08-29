import { Brain, Coins, Layers3 } from "lucide-react";
import type { PointerEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/lib/i18n";

const icons = [Brain, Coins, Layers3] as const;

function onSpot(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}

export function Thesis() {
  const { t } = useI18n();

  return (
    <section id="approach" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <div className="relative min-h-[22rem] overflow-hidden rounded-3xl shadow-hairline sm:min-h-[28rem]">
              <img
                src="/media/thesis.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {t.approach.kicker}
                </p>
                <h2 className="mt-2 max-w-lg font-display text-3xl font-semibold text-fg sm:text-4xl">
                  {t.approach.title}
                </h2>
                <p className="mt-3 max-w-md text-sm text-fg/75 sm:text-base">
                  {t.approach.body}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3">
            {t.approach.pillars.map((p, i) => {
              const Icon = icons[i] ?? Brain;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <article
                    className="spot-card relative h-full overflow-hidden rounded-3xl bg-surface/70 p-5 shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover sm:p-6"
                    onPointerMove={onSpot}
                  >
                    <div className="relative flex size-10 items-center justify-center rounded-xl bg-void text-accent shadow-hairline">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="relative mt-4 font-display text-lg font-semibold text-fg">
                      {p.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
