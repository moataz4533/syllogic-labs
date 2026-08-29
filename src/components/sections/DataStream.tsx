import { PacketLink } from "@/components/brand/PacketLink";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function DataStream() {
  const { t, locale } = useI18n();
  const plane = t.hero.plane;

  return (
    <aside
      className="w-full rounded-3xl bg-surface/80 p-4 shadow-hairline sm:p-5"
      aria-label={plane.kicker}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={cn(
            "font-mono text-[10px] text-accent",
            locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.2em]",
          )}
        >
          {plane.kicker}
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-void px-2.5 py-1 font-mono text-[10px] text-ok shadow-hairline">
          <span className="pulse-dot size-1.5 rounded-full bg-ok" />
          {plane.live}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center md:hidden">
        <Node name="Costora" hint={plane.hopFrom} />
        <PacketLink live axis="x" label={plane.hop} payload={plane.hop} />
        <Node name="Menura" hint={plane.hopTo} />
        <Node name="EasyRoom" hint={plane.open} muted />
        <PacketLink live={false} axis="x" label={plane.open} />
        <Node name="Ledger" hint={plane.open} muted />
      </div>

      <div className="mt-4 hidden items-center md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Node name="Costora" hint={plane.hopFrom} />
        <PacketLink live axis="x" label={plane.hop} payload={plane.hop} />
        <Node name="Menura" hint={plane.hopTo} />
        <PacketLink live={false} axis="x" label={plane.open} />
        <Node name="EasyRoom" hint={plane.open} muted />
        <PacketLink live={false} axis="x" label={plane.open} />
        <Node name="Ledger" hint={plane.open} muted />
      </div>
    </aside>
  );
}

function Node({
  name,
  hint,
  muted = false,
}: {
  name: string;
  hint: string;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-void/55 px-3 py-3 shadow-hairline",
        muted && "opacity-75",
      )}
    >
      <p className="font-display text-sm font-semibold text-fg">{name}</p>
      <p className="mt-0.5 font-mono text-[10px] text-subtle">{hint}</p>
    </div>
  );
}
