import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function CostoraDemo() {
  const [rice, setRice] = useState(2.4);
  const [butter, setButter] = useState(8.1);
  const portion = rice * 0.18 + butter * 0.04 + 3.4;
  const sell = Math.ceil(portion / 0.28);
  const pct = (portion / sell) * 100;

  return (
    <div className="rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        Live costing
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold text-fg">
        Wild mushroom risotto
      </h3>
      <div className="mt-5 space-y-3">
        <Ingredient
          name="Arborio rice"
          unit="/kg"
          value={rice}
          onChange={setRice}
        />
        <Ingredient
          name="Cultured butter"
          unit="/kg"
          value={butter}
          onChange={setButter}
        />
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-3">
        <Metric label="Portion" value={`$${portion.toFixed(2)}`} />
        <Metric label="Sell" value={`$${sell.toFixed(2)}`} accent />
        <Metric label="Food cost" value={`${pct.toFixed(1)}%`} />
      </dl>
    </div>
  );
}

function Ingredient({
  name,
  unit,
  value,
  onChange,
}: {
  name: string;
  unit: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-void/50 px-4 py-3 shadow-hairline">
      <div>
        <p className="text-sm text-fg">{name}</p>
        <p className="font-mono text-xs tabular-nums text-muted">
          ${value.toFixed(2)}
          {unit}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl bg-elevated text-fg shadow-hairline"
          onClick={() => onChange(Math.max(0.5, Number((value - 0.2).toFixed(2))))}
          aria-label={`Decrease ${name}`}
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl bg-elevated text-fg shadow-hairline"
          onClick={() => onChange(Math.min(20, Number((value + 0.2).toFixed(2))))}
          aria-label={`Increase ${name}`}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

const MENU = [
  { id: "ris", name: "Wild mushroom risotto", price: 24 },
  { id: "brz", name: "Charred sea bream", price: 32 },
  { id: "trt", name: "Citrus tart", price: 14 },
];

export function MenuraDemo() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const total = MENU.reduce((s, i) => s + (cart[i.id] ?? 0) * i.price, 0);
  const items = Object.values(cart).reduce((s, n) => s + n, 0);

  return (
    <div className="mx-auto max-w-sm rounded-[2rem] bg-surface/70 p-5 shadow-hairline">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        Table 14 · QR
      </p>
      <h3 className="mt-2 text-center font-display text-xl font-semibold text-fg">
        Evening menu
      </h3>
      <ul className="mt-5 space-y-2">
        {MENU.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-2xl bg-void/50 px-4 py-3 shadow-hairline"
          >
            <div>
              <p className="text-sm text-fg">{item.name}</p>
              <p className="font-mono text-xs tabular-nums text-muted">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              className="h-11 rounded-full bg-fg px-4 text-sm font-medium text-void"
              onClick={() =>
                setCart((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + 1 }))
              }
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-void px-4 py-3">
        <span className="text-sm text-muted">{items} items</span>
        <span className="font-display text-lg font-semibold tabular-nums text-fg">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

type RoomStatus = "vacant" | "occupied" | "cleaning";

const STATUS_CYCLE: RoomStatus[] = ["vacant", "occupied", "cleaning"];

export function EasyRoomDemo() {
  const [rooms, setRooms] = useState<RoomStatus[]>(
    Array.from({ length: 12 }, (_, i) =>
      i % 5 === 0 ? "cleaning" : i % 3 === 0 ? "occupied" : "vacant",
    ),
  );

  const cycle = (i: number) => {
    setRooms((r) =>
      r.map((s, idx) =>
        idx === i
          ? STATUS_CYCLE[(STATUS_CYCLE.indexOf(s) + 1) % STATUS_CYCLE.length]
          : s,
      ),
    );
  };

  return (
    <div className="rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        Room matrix
      </p>
      <p className="mt-1 text-sm text-muted">Tap a room to advance status.</p>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {rooms.map((status, i) => (
          <button
            key={i}
            type="button"
            onClick={() => cycle(i)}
            className={cn(
              "flex min-h-20 flex-col items-start justify-between rounded-2xl p-3 text-left shadow-hairline",
              status === "vacant" && "bg-ok/10",
              status === "occupied" && "bg-accent/10",
              status === "cleaning" && "bg-warn/10",
            )}
          >
            <span className="font-mono text-xs text-muted">
              {String(100 + i)}
            </span>
            <span className="text-sm capitalize text-fg">{status}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const VENDORS = [
  { name: "Delta Produce", due: 18420, status: "Open" },
  { name: "Northline Dairy", due: 6210, status: "Matched" },
  { name: "Harbor Fish Co.", due: 940, status: "Flagged" },
  { name: "Atlas Linen", due: 3100, status: "Open" },
];

export function LedgerDemo() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      VENDORS.filter((v) => v.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  const total = rows.reduce((s, r) => s + r.due, 0);

  return (
    <div className="rounded-3xl bg-surface/70 p-5 shadow-hairline sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Vendor ledger
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-fg">
            ${total.toLocaleString()}
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter vendor"
          className="h-11 w-40 rounded-xl bg-void px-3 text-sm text-fg shadow-hairline placeholder:text-subtle focus-visible:outline-none sm:w-52"
        />
      </div>
      <ul className="mt-5 divide-y divide-fg/8">
        {rows.map((v) => (
          <li key={v.name} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-fg">{v.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {v.status}
              </p>
            </div>
            <p className="tabular-nums text-sm text-fg">
              ${v.due.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl bg-void/50 px-3 py-2.5">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-0.5 text-sm font-medium tabular-nums",
          accent ? "text-accent" : "text-fg",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
