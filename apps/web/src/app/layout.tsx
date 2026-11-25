import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// Favicon: src/app/icon.png va apple-icon.png (logo.png nusxasi) — Next avtomatik ulaydi.
export const metadata: Metadata = {
  title: { default: "ToshbekovSchool", template: "%s · ToshbekovSchool" },
  description: "Maktab boshqaruv platformasi",
};

export const viewport: Viewport = {
  themeColor: "#03265c",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" className={manrope.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
