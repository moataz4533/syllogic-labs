import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

export function BespokeEngine() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t } = useI18n();
  const briefs = t.bespoke.briefs;
  const [active, setActive] = useState<string>(briefs[0].id);
  const brief = briefs.find((b) => b.id === active) ?? briefs[0];

  return (
    <section id="bespoke" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t.bespoke.kicker}
          </p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold text-fg sm:text-4xl">
            {t.bespoke.title}
          </h2>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-3xl bg-surface/80 shadow-hairline">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-2 p-4 sm:p-5">
              {briefs.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActive(b.id)}
                  className={cn(
                    "rounded-2xl px-4 py-3.5 text-start transition-[background-color,box-shadow] duration-150",
                    active === b.id
                      ? "bg-void shadow-hairline-hover"
                      : "bg-transparent hover:bg-void/40",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-fg">{b.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      {b.fit}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="p-5 sm:p-7">
              <h3 className="font-display text-2xl font-semibold text-fg">{brief.label}</h3>
              <p className="mt-2 text-sm text-muted">{brief.note}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {brief.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-void px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg shadow-hairline"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Button className="mt-6" onClick={() => openDiscovery("bespoke")}>
                {t.bespoke.cta}
              </Button>
            </div>
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {t.bespoke.steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-surface/60 px-4 py-4 shadow-hairline">
              <p className="font-mono text-[11px] text-accent">{s.n}</p>
              <p className="mt-1 font-display text-base font-semibold text-fg">{s.t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
