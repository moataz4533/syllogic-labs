import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { LocaleProvider } from "@/lib/i18n";
import { LOCALE_BOOT_SCRIPT } from "@/lib/i18n/locales";
import appCss from "../styles.css?url";

const APP_NAME = "Syllogic Labs";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "The intelligent operating system for modern hospitality and enterprise. Costora, Menura, EasyRoom, and Ledger.",
      },
      { name: "theme-color", content: "#030712" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "Intelligent systems for any business. Smart solutions, smart cost.",
      },
      { property: "og:image", content: "https://syllogic-labs.vercel.app/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      {
        name: "twitter:description",
        content:
          "Intelligent systems for any business. Smart solutions, smart cost.",
      },
      { name: "twitter:image", content: "https://syllogic-labs.vercel.app/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  component: () => (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
      </head>
      <body className="bg-void text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <Outlet />
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
