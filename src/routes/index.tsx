import { createFileRoute } from "@tanstack/react-router";
import { BespokeEngine } from "@/components/sections/BespokeEngine";
import { FrictionlessCTA } from "@/components/sections/FrictionlessCTA";
import { Hero } from "@/components/sections/Hero";
import { ProductBento } from "@/components/sections/ProductBento";
import { SynergySwitch } from "@/components/sections/SynergySwitch";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <Hero />
      <SynergySwitch />
      <ProductBento />
      <BespokeEngine />
      <FrictionlessCTA />
    </SiteShell>
  );
}
