import { createFileRoute } from "@tanstack/react-router";
import { BespokeEngine } from "@/components/sections/BespokeEngine";
import { FrictionlessCTA } from "@/components/sections/FrictionlessCTA";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { ProductBento } from "@/components/sections/ProductBento";
import { SynergySwitch } from "@/components/sections/SynergySwitch";
import { SystemsMarquee } from "@/components/sections/SystemsMarquee";
import { TechStack } from "@/components/sections/TechStack";
import { Thesis } from "@/components/sections/Thesis";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <Hero />
      <SystemsMarquee />
      <Thesis />
      <ProductBento />
      <SynergySwitch />
      <TechStack />
      <Lab />
      <BespokeEngine />
      <FrictionlessCTA />
    </SiteShell>
  );
}
