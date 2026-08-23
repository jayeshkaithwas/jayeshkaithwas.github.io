import type { Metadata } from "next";
import { Martian_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";

import { SITE } from "@/content/site";

import "./globals.css";

/**
 * Clash Display and Switzer are from Fontshare (Indian Type Foundry), free for
 * commercial use and self-hosted here — see src/fonts/FONTSHARE-LICENSE.txt.
 * Both are variable, so the whole weight range costs one file each.
 *
 * The five design versions share this set rather than each loading its own:
 * four extra families would cost more than the entire JS budget. They differ by
 * how the faces are deployed — role, weight, scale, casing — plus layout,
 * palette and motion, which is where a design's identity actually lives.
 */
const clash = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
  preload: true,
});

const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
  preload: true,
});

/** One weight only — `.label` never sets a weight, so 600 shipped unused. */
const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Editorial serif for the Quiet and Studio versions. Not preloaded — the
 *  default version never renders it, so it should not cost anything there. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.shortTitle}` },
  description: SITE.description,
  authors: [{ name: "Jayesh Kaithwas", url: SITE.url }],
  creator: "Jayesh Kaithwas",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.shortTitle,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Font variables go on <html>, not <body>: globals.css declares --font-display
    // on :root referencing them, and a custom property resolves using the value at
    // the element where it is declared.
    <html
      lang="en"
      className={`${clash.variable} ${switzer.variable} ${martian.variable} ${newsreader.variable}`}
    >
      <head>
        {/* Resolve the theme before first paint, so a dark-mode visitor never
            sees a flash of the paper palette. Stored choice wins; with none,
            follow the system. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');" +
              "if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}" +
              "document.documentElement.dataset.theme=t;}catch(e){}})()",
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:border-2 focus:border-current focus:bg-white focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
