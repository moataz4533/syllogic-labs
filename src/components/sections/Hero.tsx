import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/ui-store";

const fade = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const reduce = useReducedMotion();
  const openDiscovery = useUi((s) => s.openDiscovery);
  return (
    <section className="relative z-10 flex min-h-[100dvh] flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        initial={reduce ? false : "hidden"}
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.p variants={fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Syllogic Labs
        </motion.p>
        <motion.h1 variants={fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-5 max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] text-fg sm:text-6xl lg:text-[4.5rem]">
          The operating system for kitchens, rooms, and the cash between them.
        </motion.h1>
        <motion.p variants={fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Four engineered modules for modern hospitality and enterprise.
          Run them standalone — or fuse Costora, Menura, EasyRoom, and Ledger
          into a single operating fabric.
        </motion.p>
        <motion.div variants={fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#suite" className="inline-flex">
            <Button size="lg" className="w-full sm:w-auto">Explore the suite<ArrowUpRight className="size-4" /></Button>
          </a>
          <Button size="lg" variant="ghost" className="w-full sm:w-auto" onClick={() => openDiscovery("suite")}>
            Book a discovery call
          </Button>
        </motion.div>
        <motion.dl variants={fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-16 grid grid-cols-2 gap-6 border-t border-fg/8 pt-8 sm:grid-cols-4">
          {[{ k: "Modules", v: "04" }, { k: "Sync latency", v: "12 ms" }, { k: "Hardware", v: "Zero" }, { k: "Pricing", v: "Scoped" }].map((item) => (
            <div key={item.k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{item.k}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-fg">{item.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
      <a href="#synergy" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:flex">
        Watch them fuse<ArrowDownRight className="size-3.5" />
      </a>
    </section>
  );
}
