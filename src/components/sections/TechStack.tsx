import type { PointerEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/lib/i18n";
import { stack } from "@/lib/stack";

function onSpot(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}

export function TechStack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t.stack.kicker}
          </p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold text-fg sm:text-4xl">
            {t.stack.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">{t.stack.body}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {stack.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <article
                className="spot-card relative h-full overflow-hidden rounded-3xl bg-surface/70 p-5 shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover sm:p-6"
                onPointerMove={onSpot}
              >
                <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {t.stack.groups[group.id]}
                </p>
                <ul className="relative mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-void px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg shadow-hairline"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
