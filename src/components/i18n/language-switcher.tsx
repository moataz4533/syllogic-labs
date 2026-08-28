import { LOCALES, LOCALE_META, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.lang.label}
      className={cn(
        "flex items-center rounded-full bg-void/40 p-0.5 shadow-hairline",
        compact ? "gap-0" : "gap-0.5",
      )}
    >
      {LOCALES.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          aria-pressed={locale === id}
          className={cn(
            "min-h-9 min-w-9 rounded-full px-2 font-mono text-[10px] uppercase tracking-wider transition-[background-color,color] duration-150",
            locale === id
              ? "bg-fg text-void"
              : "text-muted hover:text-fg",
          )}
        >
          {LOCALE_META[id].native}
        </button>
      ))}
    </div>
  );
}
