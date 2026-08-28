import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui-store";

export function FrictionlessCTA() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t } = useI18n();

  return (
    <section id="contact" className="relative z-10 px-5 pb-16 sm:px-8 sm:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] shadow-hairline">
        <img
          src="/media/easyroom.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-void/72" />
        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t.cta.kicker}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-fg sm:text-5xl">
            {t.cta.title}
          </h2>
          <div className="mt-8">
            <Button size="lg" onClick={() => openDiscovery("suite")}>
              {t.cta.book}
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
