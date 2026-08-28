import { type ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeftRight, Link2, Link2Off, Minus, Plus } from "lucide-react";
import { interpolate, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Mode = "standalone" | "synced";
const OTHER_COST = 4.15;
const RICE_PER_PORTION = 0.18;
const TARGET_FOOD_COST = 0.28;
const STALE_PRICE = 22;

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function SynergySwitch() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>("synced");
  const [rice, setRice] = useState(2.4);
  const portion = rice * RICE_PER_PORTION + OTHER_COST;
  const suggested = Math.ceil(portion / TARGET_FOOD_COST);
  const menuraPrice = mode === "synced" ? suggested : STALE_PRICE;
  const foodCostPct = (portion / menuraPrice) * 100;
  const inBand = foodCostPct <= 32;
  const log = useMemo(() => {
    if (mode === "standalone") return [...t.synergy.standaloneLog];
    return t.synergy.syncedLog.map((line) =>
      interpolate(line, { price: money(rice), sell: money(suggested) }),
    );
  }, [mode, rice, suggested, t]);
  const bump = (delta: number) => {
    setRice((v) => Math.min(6, Math.max(1.2, Number((v + delta).toFixed(2)))));
  };
  return (
    <section id="synergy" className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t.synergy.kicker}</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-semibold text-fg sm:text-4xl">{t.synergy.title}</h2>
          <ModeToggle mode={mode} onChange={setMode} standalone={t.synergy.standalone} synced={t.synergy.synced} />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{t.synergy.body}</p>
        <div className="relative mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Window kicker="Costora" title={t.synergy.recipe} accent>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted">{t.synergy.recipe}</p>
                <p className="font-display text-lg font-semibold text-fg">{t.synergy.dish}</p>
              </div>
              <span className="rounded-full bg-elevated px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted shadow-hairline">{t.synergy.liveMatrix}</span>
            </div>
            <div className="mt-6 rounded-2xl bg-void/60 p-4 shadow-hairline">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{t.synergy.ingredient}</p>
                  <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-fg">
                    {money(rice)}
                    <span className="ms-1 text-sm font-medium text-muted">{t.synergy.perKg}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="inline-flex size-11 items-center justify-center rounded-xl bg-elevated text-fg shadow-hairline" onClick={() => bump(-0.2)} aria-label="Decrease"><Minus className="size-4" /></button>
                  <button type="button" className="inline-flex size-11 items-center justify-center rounded-xl bg-elevated text-fg shadow-hairline" onClick={() => bump(0.2)} aria-label="Increase"><Plus className="size-4" /></button>
                </div>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <Stat label={t.synergy.portionCost} value={money(portion)} />
              <Stat label={t.synergy.target} value="28%" />
              <Stat label={t.synergy.floorPrice} value={money(suggested)} accent />
              <Stat label={t.synergy.live} value={t.synergy.protected} />
            </dl>
          </Window>
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="flex flex-col items-center gap-3">
              <div className={cn("flex size-12 items-center justify-center rounded-full shadow-hairline", mode === "synced" ? "bg-accent/15 text-accent" : "bg-elevated text-subtle")}>
                {mode === "synced" ? <Link2 className="size-5" /> : <Link2Off className="size-5" />}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{mode === "synced" ? t.synergy.synced : t.synergy.standalone}</span>
            </div>
          </div>
          <Window kicker="Menura" title={t.synergy.guestMenu}>
            <div className="rounded-2xl bg-void/60 p-4 shadow-hairline">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-lg font-semibold text-fg">{t.synergy.dish}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p key={menuraPrice} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-display text-2xl font-semibold tabular-nums text-fg">{money(menuraPrice)}</motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-4">
                <span className={cn("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider", mode === "synced" ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn")}>{mode === "synced" ? t.synergy.live : t.synergy.stale}</span>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <Stat label={t.synergy.foodCost} value={`${foodCostPct.toFixed(1)}%`} accent={inBand} warn={!inBand} />
              <Stat label={t.synergy.floorPrice} value={mode === "synced" ? t.synergy.protected : t.synergy.exposed} />
            </dl>
          </Window>
        </div>
        <ul className="mt-6 space-y-2 rounded-2xl bg-surface/60 p-5 shadow-hairline">
          {log.map((line) => (
            <li key={line} className="flex items-start gap-3 font-mono text-xs text-muted sm:text-sm">
              <ArrowLeftRight className="mt-0.5 size-3.5 shrink-0 text-accent" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ModeToggle({ mode, onChange, standalone, synced }: { mode: Mode; onChange: (m: Mode) => void; standalone: string; synced: string }) {
  const labels = { standalone, synced };
  return (
    <div className="relative inline-flex rounded-full bg-elevated p-1 shadow-hairline" role="tablist">
      {(["standalone", "synced"] as const).map((m) => (
        <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => onChange(m)} className={cn("relative z-10 min-h-11 rounded-full px-5 text-sm", mode === m ? "text-void" : "text-muted hover:text-fg")}>
          {mode === m ? <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", duration: 0.35, bounce: 0 }} /> : null}
          <span className="relative z-10">{labels[m]}</span>
        </button>
      ))}
    </div>
  );
}

function Window({ kicker, title, children, accent }: { kicker: string; title: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-danger/80" />
          <span className="size-2.5 rounded-full bg-warn/80" />
          <span className="size-2.5 rounded-full bg-ok/80" />
        </div>
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em]", accent ? "text-accent" : "text-subtle")}>{kicker}</span>
      </div>
      <h3 className="font-display text-sm font-medium text-muted">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Stat({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div className="rounded-xl bg-void/40 px-3 py-2.5">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">{label}</dt>
      <dd className={cn("mt-0.5 text-sm font-medium tabular-nums", warn ? "text-warn" : accent ? "text-accent" : "text-fg")}>{value}</dd>
    </div>
  );
}
