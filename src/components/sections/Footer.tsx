import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-fg/8 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{t.footer.blurb}</p>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              {t.footer.systems ?? t.footer.suite}
            </p>
            <ul className="mt-3 space-y-2">
              {products.map((p) => (
                <li key={p.id}>
                  <Link to="/modules/$id" params={{ id: p.id }} className="text-sm text-muted hover:text-fg">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t.footer.studio}</p>
            <ul className="mt-3 space-y-2">
              <li><a href="/#approach" className="text-sm text-muted hover:text-fg">{t.nav.approach ?? t.nav.bespoke}</a></li>
              <li><a href="/#stack" className="text-sm text-muted hover:text-fg">{t.nav.stack ?? t.nav.synergy}</a></li>
              <li><a href="/#contact" className="text-sm text-muted hover:text-fg">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t.footer.contact}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="mailto:hello@syllogiclabs.com" className="text-sm text-muted hover:text-fg">hello@syllogiclabs.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-fg/8 pt-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-[11px] text-subtle">© {new Date().getFullYear()} Syllogic Labs. {t.footer.rights}</p>
        <p className="font-mono text-[11px] text-subtle">{t.footer.city}</p>
      </div>
    </footer>
  );
}
