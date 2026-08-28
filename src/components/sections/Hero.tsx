import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitTitle } from "@/components/motion/reveal";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui-store";

export function Hero() {
  const reduce = useReducedMotion();
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t, locale } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 560], [0, reduce ? 0 : 90]);
  const scale = useTransform(scrollY, [0, 560], [1, reduce ? 1 : 1.12]);

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="/media/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero-veil absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {t.hero.kicker}
        </p>
        <div key={locale} className="mt-4">
          <SplitTitle
            text={t.hero.title}
            className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] text-fg sm:text-6xl lg:text-7xl"
          />
        </div>
        <p className="mt-5 max-w-md text-base text-fg/80 sm:text-lg">{t.hero.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#suite" className="inline-flex">
            <Button size="lg" className="w-full sm:w-auto">
              {t.hero.cta}
              <ArrowUpRight className="size-4" />
            </Button>
          </a>
          <Button
            size="lg"
            variant="ghost"
            className="w-full bg-void/35 sm:w-auto"
            onClick={() => openDiscovery("suite")}
          >
            {t.hero.ctaAlt}
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">
          {t.hero.stats.map((item) => (
            <li
              key={item.k}
              className="rounded-full bg-void/55 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg shadow-hairline backdrop-blur-md"
            >
              <span className="text-accent">{item.v}</span>
              <span className="ms-2 text-muted">{item.k}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
