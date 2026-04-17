import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL('http://localhost:3000'),
  title: "The Digital Heirloom",
  description: "Bespoke digital wedding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${plusJakartaSans.variable} ${inter.variable} antialiased`}
    >
      <body className="font-body min-h-full flex flex-col tracking-wide">{children}</body>
    </html>
  );
}
