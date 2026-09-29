import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Shell } from "@/components/Chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The MeiLog type system: Switzer for headlines and numbers (self-hosted from Fontshare), Geist for copy,
// UI and the small "+ LABEL" eyebrows.
const display = localFont({
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400" },
    { path: "./fonts/Switzer-500.woff2", weight: "500" },
    { path: "./fonts/Switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-display", display: "swap",
});
const ui = Geist({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ui", display: "swap" });

export const metadata: Metadata = {
  title: { default: "SiBCAS | Modular Buildings & Site Accommodation for Hire or Sale", template: "%s | SiBCAS" },
  description: "At SiBCAS, we have been manufacturing and supplying Modular Buildings and Site Accommodation for over 50 years.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/brand/cropped-favicon-192x192.jpg" },
};

export const viewport: Viewport = { themeColor: "#f2f2f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${ui.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <noscript><style>{"[data-rise],[data-clip],.hero [data-line]{visibility:visible!important;opacity:1!important;transform:none!important}"}</style></noscript>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
