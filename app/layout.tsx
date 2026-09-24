import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { Shell } from "@/components/Chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// Instrument Sans stands in for Dubois' Rand and carries the UI. Archivo at its widest cut echoes the
// extended SiBCAS wordmark and is reserved for the hero and a few headline moments.
const ui = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ui", display: "swap" });
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "SiBCAS | Modular Buildings & Site Accommodation for Hire or Sale", template: "%s | SiBCAS" },
  description: "At SiBCAS, we have been manufacturing and supplying Modular Buildings and Site Accommodation for over 50 years.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/brand/cropped-favicon-192x192.jpg" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${ui.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <noscript><style>{"[data-rise],[data-clip],.hero [data-line]{visibility:visible!important;opacity:1!important}"}</style></noscript>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
