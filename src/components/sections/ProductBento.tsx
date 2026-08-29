import { Link } from "@tanstack/react-router";
import { PacketLink } from "@/components/brand/PacketLink";
import { Reveal } from "@/components/motion/reveal";
import { getProduct, products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function ProductBento() {
  const { t } = useI18n();
  const [costora, menura, easyroom, ledger] = products;

  return (
    <section id="systems" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {t.systems.kicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-fg sm:text-4xl">
                {t.systems.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">{t.systems.body}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Reveal className="flex h-full">
            <ProductCard id={costora.id} />
          </Reveal>
          <PacketLink live axis="y" label={t.nav.synergy} payload={t.synergy.live} />
          <Reveal className="flex h-full" delay={0.05}>
            <ProductCard id={menura.id} />
          </Reveal>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Reveal className="h-full" delay={0.08}>
            <ProductCard id={easyroom.id} />
          </Reveal>
          <Reveal className="h-full" delay={0.12}>
            <ProductCard id={ledger.id} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ id }: { id: (typeof products)[number]["id"] }) {
  const { t } = useI18n();
  const product = getProduct(id);
  if (!product) return null;
  const copy = t.products[product.id];
  const couple = product.couples ? getProduct(product.couples) : undefined;
  const fact = copy.outcomes[0];

  return (
    <Link
      to="/modules/$id"
      params={{ id: product.id }}
      className="group flex h-full flex-col rounded-3xl bg-surface/70 p-5 shadow-hairline transition-[box-shadow] duration-200 hover:shadow-hairline-hover sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {copy.tag}
        </p>
        <span className="rounded-full bg-void px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent shadow-hairline">
          {couple ? `× ${couple.name}` : copy.badge}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-semibold text-fg sm:text-3xl">
        {product.name}
      </h3>
      <p className="mt-2 max-w-md text-sm text-muted">{copy.relation}</p>
      <p className="mt-auto pt-5 font-mono text-[11px] text-subtle">
        {fact.label}
        <span className="ms-2 text-fg">{fact.value}</span>
      </p>
    </Link>
  );
}
