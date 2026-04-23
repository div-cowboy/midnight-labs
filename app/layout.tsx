import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trymidnightai.com"),
  title: {
    default: "Midnight AI — Built by operators. Installed in your company.",
    template: "%s — Midnight AI",
  },
  description:
    "The Midnight Protocol turns mid-market companies into AI-native ones — designed and run by engineers who've shipped at NASA, Vercel, Shopify, WordPress, and Nielsen. Not a deck. Not a framework. An installation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-black text-neutral-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
