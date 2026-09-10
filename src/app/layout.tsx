import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, IBM_Plex_Mono, Rajdhani } from "next/font/google";
import { brand } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Rogue RP | Serious FiveM Roleplay",
    description: brand.description,
    path: "/",
  }),
  metadataBase: new URL(getSiteUrl()),
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${rajdhani.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-rogue-void text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
