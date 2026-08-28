import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/lib/i18n";

export function Lab() {
  const { t } = useI18n();

  return (
    <section id="lab" className="relative z-10 px-5 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t.lab.kicker}
          </p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold text-fg sm:text-4xl">
            {t.lab.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">{t.lab.body}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {t.lab.incoming.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="relative overflow-hidden rounded-3xl bg-surface/50 p-6 shadow-hairline">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                  {item.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
