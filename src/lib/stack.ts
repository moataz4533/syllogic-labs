export type StackGroup = {
  id: "intelligence" | "data" | "surface" | "delivery";
  items: string[];
};

export const stack: StackGroup[] = [
  {
    id: "intelligence",
    items: [
      "Vercel AI SDK",
      "Tesseract OCR",
      "Live costing models",
      "Postgres constraints",
    ],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Supabase", "Row Level Security", "Zod"],
  },
  {
    id: "surface",
    items: ["TypeScript", "React", "Next.js", "Vite", "PWA", "Tailwind CSS"],
  },
  {
    id: "delivery",
    items: ["Vercel", "Sentry", "Playwright", "Vitest", "WhatsApp", "QR"],
  },
];

export const stackFlat = stack.flatMap((g) => g.items);
