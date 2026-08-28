import { type ReactNode, useEffect } from "react";
import { ParticleCanvas } from "@/components/canvas/ParticleCanvas";
import { DiscoveryDialog } from "@/components/discovery/DiscoveryDialog";
import { AmbientGlow } from "@/components/sections/AmbientGlow";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ScrollProgress } from "@/components/sections/ScrollProgress";
import { LocaleProvider, useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui-store";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <SiteShellInner>{children}</SiteShellInner>
    </LocaleProvider>
  );
}

function SiteShellInner({ children }: { children: ReactNode }) {
  const openDiscovery = useUi((s) => s.openDiscovery);
  const { t } = useI18n();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("discovery") === "1") openDiscovery("suite");
  }, [openDiscovery]);

  return (
    <div className="relative min-h-dvh bg-void text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-void"
      >
        {t.nav.skip}
      </a>
      <ScrollProgress />
      <ParticleCanvas />
      <AmbientGlow />
      <Navbar />
      <div id="main">{children}</div>
      <Footer />
      <DiscoveryDialog />
    </div>
  );
}
