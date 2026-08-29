import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SplitTitle({
  text,
  className,
  mode = "words",
  chromaLast = false,
}: {
  text: string;
  className?: string;
  mode?: "words" | "lines";
  chromaLast?: boolean;
}) {
  const reduce = useReducedMotion();
  const parts =
    mode === "lines"
      ? text
          .split("\n")
          .map((part) => part.trim())
          .filter(Boolean)
      : text.split(" ");
  const stacked = mode === "lines";

  return (
    <h1 className={cn(stacked ? "flex flex-col gap-1" : "flex flex-wrap", className)}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          className={cn(
            stacked ? "block" : "me-[0.28em] inline-block",
            chromaLast && i === parts.length - 1 && "text-chroma",
          )}
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.06 + i * (stacked ? 0.12 : 0.038), duration: 0.62, ease }}
        >
          {part}
        </motion.span>
      ))}
    </h1>
  );
}
