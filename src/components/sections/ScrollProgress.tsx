import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function ScrollProgress() {
  const { dir } = useI18n();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-accent"
      style={{
        scaleX,
        transformOrigin: dir === "rtl" ? "100% 50%" : "0% 50%",
      }}
    />
  );
}
