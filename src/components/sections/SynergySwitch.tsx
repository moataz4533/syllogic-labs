import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { PacketLink } from "@/components/brand/PacketLink";
import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/lib/i18n";
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
  const synced = mode === "synced";
  const payload = synced ? money(suggested) : t.synergy.stale;

  return (
    <section id="synergy" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {t.synergy.kicker}
              </p>
              <h2 className="mt-2 max-w-lg font-display text-3xl font-semibold text-fg sm:text-4xl">
                {t.synergy.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted">{t.synergy.body}</p>
            </div>
            <ModeToggle
              mode={mode}
              onChange={setMode}
              standalone={t.synergy.standalone}
              synced={t.synergy.synced}
            />
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Panel kicker="Costora" title={t.synergy.dish}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  {t.synergy.ingredient}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-fg">
                  {money(rice)}
                  <span className="ms-1 text-sm font-medium text-muted">
                    {t.synergy.perKg}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <IconBtn
                  label="Decrease"
                  onClick={() => setRice((v) => Math.max(1.2, Number((v - 0.2).toFixed(2))))}
                >
                  <Minus className="size-4" />
                </IconBtn>
                <IconBtn
                  label="Increase"
                  onClick={() => setRice((v) => Math.min(6, Number((v + 0.2).toFixed(2))))}
                >
                  <Plus className="size-4" />
                </IconBtn>
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted">
              {t.synergy.portionCost} {money(portion)}
            </p>
          </Panel>

          <PacketLink
            live={synced}
            axis="y"
            label={synced ? t.synergy.synced : t.synergy.standalone}
            payload={payload}
          />

          <Panel kicker="Menura" title={t.synergy.guestMenu}>
            <div className="flex items-end justify-between gap-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={menuraPrice}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-display text-3xl font-semibold tabular-nums text-fg"
                >
                  {money(menuraPrice)}
                </motion.p>
              </AnimatePresence>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
                  synced ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn",
                )}
              >
                {synced ? t.synergy.live : t.synergy.stale}
              </span>
            </div>
            <p
              className={cn(
                "mt-4 font-mono text-[11px]",
                foodCostPct <= 32 ? "text-ok" : "text-warn",
              )}
            >
              {t.synergy.foodCost} {foodCostPct.toFixed(1)}%
            </p>
          </Panel>
        </div>

        <div className="mt-3 flex flex-col rounded-3xl bg-surface/80 px-4 py-2 shadow-hairline lg:flex-row lg:items-center lg:px-5">
          <Hop k={t.synergy.ingredient} v={money(rice)} />
          <PacketLink
            live={synced}
            axis="x"
            label={t.synergy.portionCost}
            payload=""
            className="hidden lg:flex lg:max-w-20 lg:min-h-12"
          />
          <PacketLink
            live={synced}
            axis="y"
            label={t.synergy.portionCost}
            className="h-10 lg:hidden"
          />
          <Hop k={t.synergy.portionCost} v={money(portion)} />
          <PacketLink
            live={synced}
            axis="x"
            label={t.synergy.guestMenu}
            payload={payload}
            className="hidden lg:flex lg:max-w-36 lg:min-h-12"
          />
          <PacketLink
            live={synced}
            axis="y"
            label={t.synergy.guestMenu}
            payload={payload}
            className="h-10 lg:hidden"
          />
          <Hop k={t.synergy.guestMenu} v={money(menuraPrice)} warn={!synced} />
        </div>
      </div>
    </section>
  );
}

function Hop({ k, v, warn = false }: { k: string; v: string; warn?: boolean }) {
  return (
    <div className="min-w-0 flex-1 px-2 py-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{k}</p>
      <p
        className={cn(
          "mt-1 font-display text-xl font-semibold tabular-nums",
          warn ? "text-warn" : "text-fg",
        )}
      >
        {v}
      </p>
    </div>
  );
}

function Panel({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-surface/80 p-5 shadow-hairline sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
        {kicker}
      </p>
      <p className="mt-1 font-display text-lg font-semibold text-fg">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
  standalone,
  synced,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  standalone: string;
  synced: string;
}) {
  const labels = { standalone, synced };
  return (
    <div className="relative inline-flex rounded-full bg-elevated p-1 shadow-hairline" role="tablist">
      {(["standalone", "synced"] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="tab"
          aria-selected={mode === m}
          onClick={() => onChange(m)}
          className={cn(
            "relative z-10 min-h-11 rounded-full px-5 text-sm",
            mode === m ? "text-void" : "text-muted hover:text-fg",
          )}
        >
          {mode === m ? (
            <motion.span
              layoutId="mode-pill"
              className="absolute inset-0 rounded-full bg-fg"
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            />
          ) : null}
          <span className="relative z-10">{labels[m]}</span>
        </button>
      ))}
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-xl bg-elevated text-fg shadow-hairline"
    >
      {children}
    </button>
  );
}
