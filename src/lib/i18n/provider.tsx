import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ar } from "./ar";
import { en, type Messages } from "./en";
import { es } from "./es";
import { extra } from "./extra";
import { fr } from "./fr";
import { it } from "./it";
import {
  detectLocale,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "./locales";

function withExtra(base: Messages): Messages {
  const row = base as Messages & { approach?: unknown; systems?: unknown; lab?: unknown };
  if (row.approach && row.systems && row.lab) return base;
  return {
    ...base,
    ...extra,
    nav: { ...base.nav, ...extra.nav },
    hero: extra.hero,
    footer: { ...base.footer, ...extra.footer },
  } as Messages;
}

const catalog: Record<Locale, Messages> = {
  en: withExtra(en),
  ar: withExtra(ar),
  es: withExtra(es),
  fr: withExtra(fr),
  it: withExtra(it),
};

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const fallback: I18nContextValue = {
  locale: "en",
  dir: "ltr",
  t: catalog.en,
  setLocale: () => {},
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const dir = LOCALE_META[locale].dir;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: LOCALE_META[locale].dir,
      t: catalog[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext) ?? fallback;
}
