import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-elevated" />
      <rect width="31" height="31" x="0.5" y="0.5" rx="7.5" className="fill-none stroke-fg/10" />
      <circle cx="10" cy="11" r="2.4" className="fill-accent" />
      <circle cx="22" cy="11" r="2.4" className="fill-accent" />
      <circle cx="16" cy="22" r="2.4" className="fill-accent" />
      <path
        d="M12.1 12.6 14.7 19.4M19.9 12.6 17.3 19.4M12.6 11h6.8"
        className="stroke-accent"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className, compact }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 rounded-lg text-fg no-underline", className)}
      aria-label="Syllogic Labs home"
    >
      <LogoMark />
      <span className={cn("leading-none", compact && "sr-only sm:not-sr-only")}>
        <span className="block font-display text-[15px] font-semibold tracking-tight">Syllogic</span>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Labs</span>
      </span>
    </Link>
  );
}
