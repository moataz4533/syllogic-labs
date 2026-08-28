import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { products } from "@/lib/products";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-fg/8 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The intelligent operating system for modern hospitality and
            enterprise.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Suite</p>
            <ul className="mt-3 space-y-2">
              {products.map((p) => (
                <li key={p.id}>
                  <Link to="/modules/$id" params={{ id: p.id }} className="text-sm text-muted transition-[color] duration-150 hover:text-fg">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Studio</p>
            <ul className="mt-3 space-y-2">
              <li><a href="/#bespoke" className="text-sm text-muted hover:text-fg">Bespoke</a></li>
              <li><a href="/#synergy" className="text-sm text-muted hover:text-fg">Synergy</a></li>
              <li><a href="/#contact" className="text-sm text-muted hover:text-fg">Discovery</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Contact</p>
            <ul className="mt-3 space-y-2">
              <li><a href="mailto:hello@syllogiclabs.com" className="text-sm text-muted hover:text-fg">hello@syllogiclabs.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-fg/8 pt-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-[11px] text-subtle">© {new Date().getFullYear()} Syllogic Labs. All rights reserved.</p>
        <p className="font-mono text-[11px] text-subtle">Cairo · Remote</p>
      </div>
    </footer>
  );
}
