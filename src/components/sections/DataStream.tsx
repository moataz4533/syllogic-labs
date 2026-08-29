import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SPARK =
  "M0 26 C 18 26 28 8 46 14 C 64 20 74 6 92 11 C 110 16 122 26 140 12 C 158 0 176 20 200 9";

export function DataStream() {
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  const events = t.hero.stream.events;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setOffset((n) => (n + 1) % events.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [events.length, reduce]);

  const visible = Array.from({ length: Math.min(3, events.length) }, (_, i) => {
    const item = events[(offset + i) % events.length];
    return { ...item, i };
  });

  return (
    <aside
      className="stream-panel w-full overflow-hidden rounded-3xl p-4 sm:p-5"
      aria-label={t.hero.stream.title}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className={cn(
              "font-mono text-[10px] text-accent",
              locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.2em]",
            )}
          >
            {t.hero.stream.kicker}
          </p>
          <p className="mt-1 font-mono text-xs text-fg">{t.hero.stream.title}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-void/70 px-2.5 py-1 font-mono text-[10px] text-ok shadow-hairline">
          <span className="pulse-dot size-1.5 rounded-full bg-ok" />
          {t.hero.stream.status}
        </span>
      </div>

      <svg
        viewBox="0 0 200 36"
        className="mt-4 h-10 w-full text-accent"
        aria-hidden="true"
      >
        <path
          d={SPARK}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="stream-spark"
        />
      </svg>

      <div className="stream-matrix mt-3" aria-hidden="true">
        {Array.from({ length: 54 }, (_, i) => (
          <span
            key={i}
            className="stream-cell"
            style={{ animationDelay: `${(i % 14) * 0.11}s`, animationDuration: `${1.8 + (i % 5) * 0.25}s` }}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {visible.map((row) => (
          <li
            key={`${row.ch}-${row.i}-${offset}`}
            className="flex items-baseline gap-3 font-mono text-[11px] leading-relaxed"
          >
            <span className="shrink-0 text-accent">{row.ch}</span>
            <span className="min-w-0 truncate text-muted">{row.msg}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
