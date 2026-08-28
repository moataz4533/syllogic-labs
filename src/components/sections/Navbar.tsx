import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { navHrefs } from "@/lib/products";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const labels = {
    approach: t.nav.approach,
    systems: t.nav.systems,
    stack: t.nav.stack,
    contact: t.nav.contact,
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 transition-[background-color,box-shadow,backdrop-filter] duration-200 sm:h-16 sm:px-4",
          scrolled || open ? "glass" : "bg-transparent",
        )}
      >
        <Logo compact />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navHrefs.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-[color] duration-150 hover:text-fg"
            >
              {labels[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>
          <div className="me-1 hidden items-center gap-2 sm:flex">
            <span className="pulse-dot size-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] tracking-wide text-muted">
              {t.nav.live}
            </span>
          </div>
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => openDiscovery("suite")}
          >
            {t.nav.book}
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto glass mt-2 rounded-2xl p-3 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navHrefs.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3.5 text-base text-fg"
                onClick={() => setOpen(false)}
              >
                {labels[link.key]}
              </a>
            ))}
            <Link
              to="/"
              hash="systems"
              className="rounded-xl px-4 py-3.5 text-base text-fg"
              onClick={() => setOpen(false)}
            >
              {t.nav.modules}
            </Link>
            <div className="px-2 py-3">
              <LanguageSwitcher />
            </div>
            <Button
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false);
                openDiscovery("suite");
              }}
            >
              {t.nav.book}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
