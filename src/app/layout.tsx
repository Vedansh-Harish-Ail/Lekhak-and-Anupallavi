import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lekhak-and-anupallavi.vercel.app"),
  title: "VK Solutions",
  description: "Bespoke digital wedding invitation by VK Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${plusJakartaSans.variable} ${inter.variable} antialiased`}
    >
      <body className="font-body min-h-full flex flex-col tracking-wide">
        {children}

        {/* ✅ Google Analytics (OFFICIAL WAY) */}
        <GoogleAnalytics gaId="G-4F0T7KGBH2" />

        {/* Vercel Analytics */}
        <Analytics />
        <h1 style={{ color: "red", position: "fixed", top: 0 }}>
          TEST DEPLOY
        </h1>
      </body>
    </html>
  );
}