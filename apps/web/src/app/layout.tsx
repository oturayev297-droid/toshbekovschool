import type { ReactNode } from "react";

export const metadata = {
  title: "ToshbekovSchool",
  description: "Maktab boshqaruv tizimi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
