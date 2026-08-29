import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitTitle } from "@/components/motion/reveal";
import { DataStream } from "@/components/sections/DataStream";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

export function Hero() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t, locale } = useI18n();
  const stackedTitle = locale === "ar" || t.hero.title.includes("\n");

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden">
      <div className="hero-veil absolute inset-0" />
      <div className="grid-fade pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t.hero.kicker}
          </p>
          <div key={locale} className="mt-4">
            <SplitTitle
              text={t.hero.title}
              mode={stackedTitle ? "lines" : "words"}
              chromaLast
              className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.12] tracking-[-0.04em] text-fg sm:text-6xl lg:text-7xl"
            />
          </div>
          <p
            className={cn(
              "mt-5 text-base text-muted sm:text-lg",
              locale === "ar" ? "max-w-xl leading-[1.75]" : "max-w-md",
            )}
          >
            {t.hero.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#systems" className="inline-flex">
              <Button size="lg" variant="accent" className="w-full sm:w-auto">
                {t.hero.cta}
                <ArrowUpRight className="size-4" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => openDiscovery("suite")}
            >
              {t.hero.ctaAlt}
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {t.hero.stats.map((item) => (
              <li
                key={item.k}
                className={cn(
                  "rounded-full bg-surface/80 px-3.5 py-2 font-mono text-[11px] text-fg shadow-hairline",
                  locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.14em]",
                )}
              >
                <span className="text-accent">{item.v}</span>
                <span className="ms-2 text-muted">{item.k}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <DataStream />
          </div>
        </div>
      </div>
    </section>
  );
}
