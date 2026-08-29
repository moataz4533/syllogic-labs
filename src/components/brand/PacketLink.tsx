import { Link2, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";

export function PacketLink({
  live,
  axis,
  label,
  payload,
  className,
}: {
  live: boolean;
  axis: "x" | "y";
  label: string;
  payload?: string;
  className?: string;
}) {
  const caption = payload !== undefined ? payload : label;

  return (
    <div
      className={cn(
        "packet-link relative z-10 flex items-center justify-center",
        axis === "x" ? "h-12 w-full min-w-12" : "h-16 w-12 lg:h-auto lg:min-h-40",
        className,
      )}
      aria-label={label}
    >
      <div
        className={cn("packet-track", axis === "x" ? "is-x" : "is-y", live ? "is-live" : "is-open")}
        aria-hidden="true"
      >
        {live ? (
          <>
            <span className="packet-dot delay-0" />
            <span className="packet-dot delay-1" />
          </>
        ) : null}
      </div>
      <div
        className={cn(
          "relative z-10 inline-flex max-w-[9rem] items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] shadow-hairline",
          live ? "bg-void text-accent" : "bg-elevated text-subtle",
        )}
      >
        {live ? <Link2 className="size-3.5 shrink-0" /> : <Link2Off className="size-3.5 shrink-0" />}
        {caption ? <span className="truncate">{caption}</span> : null}
      </div>
    </div>
  );
}
