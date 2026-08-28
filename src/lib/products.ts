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
  couples?: ProductId;
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
    couples: "menura",
  },
  {
    id: "menura",
    name: "Menura",
    domain: "menura.app",
    href: "https://menura-alpha.vercel.app",
    live: true,
    icon: Utensils,
    image: "/media/menura.jpg",
    couples: "costora",
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
  { href: "/#approach", key: "approach" },
  { href: "/#systems", key: "systems" },
  { href: "/#stack", key: "stack" },
  { href: "/#contact", key: "contact" },
] as const;

export const navLinks = navHrefs;
