import { Code2, GitMerge, Layers3, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

const pillars = [
  { icon: Layers3, title: "Product extensions", body: "New modules that sit on the same fabric as Costora, Menura, EasyRoom, and Ledger — not a parallel stack." },
  { icon: Code2, title: "Greenfield systems", body: "From-scratch operating software when the suite does not cover the work. Same design language. Same delivery bar." },
  { icon: GitMerge, title: "Integration fabric", body: "POS, payments, accounting, and property systems wired so tickets, rooms, and cash share one picture." },
];

const briefs = [
  { id: "fb-group", label: "Multi-outlet F&B", fit: "Growth", stack: ["Costora", "Menura", "Ledger"], note: "Shared recipes, outlet-level menus, one vendor ledger." },
  { id: "boutique", label: "Boutique hotel", fit: "Pilot", stack: ["EasyRoom", "Menura", "Ledger"], note: "Rooms, F&B, and folios without a chain PMS." },
  { id: "estate", label: "Multi-property estate", fit: "Estate", stack: ["EasyRoom", "Costora", "Menura", "Ledger", "Bespoke"], note: "Central cost, local menus, group cash position." },
] as const;

const steps = [
  { n: "01", t: "Discovery", d: "Map the operation, not a feature list." },
  { n: "02", t: "Architecture", d: "Decide what is suite, what is custom." },
  { n: "03", t: "Build in slices", d: "Ship a working module, then the next." },
  { n: "04", t: "Operate", d: "Handover, training, and a named owner." },
];

export function BespokeEngine() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const [active, setActive] = useState<(typeof briefs)[number]["id"]>("fb-group");
  const brief = briefs.find((b) => b.id === active) ?? briefs[0];
  return (
    <section id="bespoke" className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Bespoke engine</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-fg sm:text-4xl">
          When the suite is not the whole answer, we still build the system.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Syllogic Labs is a product house and a software studio. The same people who ship Costora will design the piece your operation is missing.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className="rounded-3xl bg-surface/70 p-6 shadow-hairline">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-void/70 text-accent shadow-hairline">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Scope a brief</p>
            <div className="mt-4 flex flex-col gap-2">
              {briefs.map((b) => (
                <button key={b.id} type="button" onClick={() => setActive(b.id)} className={cn("rounded-2xl px-4 py-3.5 text-left transition-[background-color,box-shadow] duration-150", active === b.id ? "bg-void shadow-hairline-hover" : "bg-void/40 shadow-hairline hover:shadow-hairline-hover")}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-fg">{b.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{b.fit}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Recommended fabric</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-fg">{brief.label}</h3>
            <p className="mt-2 text-sm text-muted">{brief.note}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {brief.stack.map((item) => (
                <span key={item} className="rounded-full bg-void px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg shadow-hairline">{item}</span>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-muted">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
              Pricing is scoped to modules and volume. No public rate card — we map it on a discovery call.
            </p>
            <Button className="mt-6" onClick={() => openDiscovery("bespoke")}>Scope this with us</Button>
          </div>
        </div>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-surface/50 px-5 py-4 shadow-hairline">
              <p className="font-mono text-[11px] text-accent">{s.n}</p>
              <p className="mt-1 font-display text-base font-semibold text-fg">{s.t}</p>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
