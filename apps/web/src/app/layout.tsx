import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "ToshbekovSchool",
  description: "Maktab boshqaruv tizimi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body className="font-sans">{children}</body>
    </html>
  );
}
