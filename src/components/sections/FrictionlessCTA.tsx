import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/ui-store";

export function FrictionlessCTA() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  return (
    <section id="contact" className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-surface/80 px-6 py-12 shadow-hairline sm:px-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Discovery</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-fg sm:text-5xl">
          Start with a conversation, not a contract.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Enterprise pricing is scoped to the modules you run and the volume
          they carry. Thirty minutes is enough to map a pilot — kitchen,
          rooms, ledger, or a custom build.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => openDiscovery("suite")}>
            Book a discovery call
            <ArrowUpRight className="size-4" />
          </Button>
          <a href="mailto:hello@syllogiclabs.com" className="inline-flex">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto">hello@syllogiclabs.com</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
