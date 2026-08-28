import {
  Building2,
  Layers,
  Receipt,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type ProductId = "costora" | "menura" | "easyroom" | "ledger";

export type Product = {
  id: ProductId;
  name: string;
  domain: string;
  tag: string;
  badge: string;
  summary: string;
  description: string;
  features: string[];
  outcomes: { label: string; value: string }[];
  icon: LucideIcon;
};

export const products: Product[] = [
  {
    id: "costora",
    name: "Costora",
    domain: "costora.co",
    tag: "Cost & Recipe Engineering",
    badge: "Standalone / Synced",
    summary:
      "Automated recipe costing, live inventory deduction, and waste control for kitchens that run on margin.",
    description:
      "Costora is the engineering layer under the menu. It prices every recipe from the ingredient matrix, deducts stock as tickets fire, and flags dishes the moment a supplier move would break the target food-cost.",
    features: [
      "Dynamic recipe costing from a live ingredient matrix",
      "Inventory deduction tied to tickets, not guesswork",
      "Waste and variance tracking by station",
      "Margin guards that block unprofitable specials",
    ],
    outcomes: [
      { label: "Food-cost variance", value: "\u221212%" },
      { label: "Recipe rebuild time", value: "Minutes" },
      { label: "Waste visibility", value: "Per station" },
    ],
    icon: Layers,
  },
  {
    id: "menura",
    name: "Menura",
    domain: "menura.app",
    tag: "Digital Guest Experience",
    badge: "Standalone / Synced",
    summary:
      "A QR menu and self-ordering engine built for speed, retention, and a higher average ticket \u2014 no extra hardware.",
    description:
      "Menura puts the current menu in the guest\u2019s hand. Items, modifiers, and 86s update instantly. When it is synced with Costora, every price on the floor is the costed price \u2014 not last week\u2019s print run.",
    features: [
      "Instant QR ordering with modifier logic",
      "Live 86s and menu edits without a reprint",
      "Upsell paths tuned to ticket average",
      "Zero dedicated hardware at the table",
    ],
    outcomes: [
      { label: "Time to first order", value: "< 40s" },
      { label: "Ticket lift", value: "+8\u201314%" },
      { label: "Hardware", value: "None" },
    ],
    icon: Utensils,
  },
  {
    id: "easyroom",
    name: "EasyRoom",
    domain: "easyroom.app",
    tag: "Boutique Property PMS",
    badge: "Dedicated Standalone PMS",
    summary:
      "Room dispatch, occupancy, and checkout for boutique hotels and hostels that still know every key.",
    description:
      "EasyRoom is a property system sized for independent operators. Check-in is one action, the room matrix is visual, and housekeeping sees the same board as the desk \u2014 without the weight of a chain PMS.",
    features: [
      "One-click check-in and check-out",
      "Visual room matrix with live status",
      "Housekeeping queues that update in real time",
      "Guest folios without a back-office maze",
    ],
    outcomes: [
      { label: "Desk time per arrival", value: "< 90s" },
      { label: "Housekeeping lag", value: "Live" },
      { label: "Fit", value: "Boutique & hostel" },
    ],
    icon: Building2,
  },
  {
    id: "ledger",
    name: "Syllogic Ledger",
    domain: "Internal module",
    tag: "Autonomous Accounting Hub",
    badge: "Enterprise Standalone",
    summary:
      "Vendor lifecycle, purchase matching, and cashflow intelligence for commercial operations.",
    description:
      "Ledger sits under purchasing. It holds vendor balances, matches orders to invoices, and surfaces cash position without a separate finance stack. When the suite is fused, kitchen spend and room revenue land in the same picture.",
    features: [
      "Vendor ledger with running balances",
      "Purchase-order to invoice matching",
      "Automated reconciliation on close",
      "Cashflow view across properties",
    ],
    outcomes: [
      { label: "Close cycle", value: "Days, not weeks" },
      { label: "Unmatched POs", value: "Flagged" },
      { label: "Scope", value: "Multi-entity" },
    ],
    icon: Receipt,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const navLinks = [
  { href: "/#synergy", label: "Synergy" },
  { href: "/#suite", label: "The suite" },
  { href: "/#bespoke", label: "Bespoke" },
  { href: "/#contact", label: "Contact" },
] as const;
