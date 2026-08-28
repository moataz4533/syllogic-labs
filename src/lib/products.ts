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
  href: string | null;
  live: boolean;
  icon: LucideIcon;
  image: string;
};

export const products: Product[] = [
  {
    id: "costora",
    name: "Costora",
    domain: "costora.co",
    href: "https://costora.co",
    live: true,
    icon: Layers,
    image: "/media/costora.jpg",
  },
  {
    id: "menura",
    name: "Menura",
    domain: "menura.app",
    href: "https://menura-alpha.vercel.app",
    live: true,
    icon: Utensils,
    image: "/media/menura.jpg",
  },
  {
    id: "easyroom",
    name: "EasyRoom",
    domain: "easyroom.app",
    href: "https://easyroom-gray.vercel.app",
    live: true,
    icon: Building2,
    image: "/media/easyroom.jpg",
  },
  {
    id: "ledger",
    name: "Syllogic Ledger",
    domain: "Internal module",
    href: null,
    live: false,
    icon: Receipt,
    image: "/media/ledger.jpg",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const navHrefs = [
  { href: "/#suite", key: "suite" },
  { href: "/#synergy", key: "synergy" },
  { href: "/#bespoke", key: "bespoke" },
  { href: "/#contact", key: "contact" },
] as const;
