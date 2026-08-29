import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import {
  CostoraDemo,
  EasyRoomDemo,
  LedgerDemo,
  MenuraDemo,
} from "@/components/modules/ModuleDemos";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";
import { interpolate, useI18n } from "@/lib/i18n";
import { getProduct, products } from "@/lib/products";
import { useUi } from "@/lib/ui-store";

export const Route = createFileRoute("/modules/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ModulePage,
  notFoundComponent: ModuleMissing,
});

function ModulePage() {
  const { product } = Route.useLoaderData();
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t } = useI18n();
  const copy = t.products[product.id];

  return (
    <SiteShell>
      <article className="relative z-10 pb-20">
        <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8">
          <Link
            to="/"
            hash="systems"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-fg/80 hover:text-fg"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t.module.back}
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {copy.tag}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-fg sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">{copy.relation}</p>
        </div>

        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
            <Reveal>
              <p className="max-w-lg text-base leading-relaxed text-muted">
                {copy.description}
              </p>
              <ul className="mt-6 space-y-2">
                {copy.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-3 gap-3">
                {copy.outcomes.map((o) => (
                  <div
                    key={o.label}
                    className="rounded-2xl bg-surface/70 px-3 py-3 shadow-hairline"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                      {o.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-fg">{o.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => openDiscovery(product.id)}>
                  {interpolate(t.module.talk, { name: product.name })}
                </Button>
                {product.href ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                  >
                    <Button variant="ghost">
                      {t.module.openLive}
                      <ExternalLink className="size-4" />
                    </Button>
                  </a>
                ) : null}
              </div>
            </Reveal>
            <Demo id={product.id} />
          </div>

          <Reveal className="mt-14 rounded-3xl bg-surface/80 p-6 shadow-hairline sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {t.module.fieldNotes}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              {copy.brief}
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {products
              .filter((p) => p.id !== product.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/modules/$id"
                  params={{ id: p.id }}
                  className="rounded-2xl bg-surface/70 p-4 shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    {t.products[p.id].tag}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-fg">
                    {p.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}

function Demo({ id }: { id: string }) {
  if (id === "costora") return <CostoraDemo />;
  if (id === "menura") return <MenuraDemo />;
  if (id === "easyroom") return <EasyRoomDemo />;
  return <LedgerDemo />;
}

function ModuleMissing() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <div className="relative z-10 px-5 py-40 text-center">
        <h1 className="font-display text-3xl font-semibold text-fg">
          {t.module.unknown}
        </h1>
        <p className="mt-3 text-muted">{t.module.unknownBody}</p>
        <Link to="/" className="mt-6 inline-block text-accent">
          {t.module.backHome}
        </Link>
      </div>
    </SiteShell>
  );
}
