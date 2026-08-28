export const LOCALES = ["en", "ar", "es", "fr", "it"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { native: string; name: string; dir: "ltr" | "rtl" }
> = {
  en: { native: "EN", name: "English", dir: "ltr" },
  ar: { native: "عر", name: "العربية", dir: "rtl" },
  es: { native: "ES", name: "Español", dir: "ltr" },
  fr: { native: "FR", name: "Français", dir: "ltr" },
  it: { native: "IT", name: "Italiano", dir: "ltr" },
};

export const LOCALE_STORAGE_KEY = "syllogic-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* private mode */
  }
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (isLocale(nav)) return nav;
  return "en";
}

export const LOCALE_BOOT_SCRIPT = `(function(){try{var k="syllogic-locale";var l=localStorage.getItem(k);if(!l){var n=(navigator.language||"en").slice(0,2).toLowerCase();l=["en","ar","es","fr","it"].indexOf(n)>=0?n:"en"}document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}catch(e){}})();`;
