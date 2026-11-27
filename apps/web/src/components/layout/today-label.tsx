"use client";

import { useEffect, useState } from "react";
import { formatUzDate } from "@/lib/date";

/**
 * Joriy sana brauzerda hisoblanadi — sahifa build vaqtida statik yig'ilsa ham
 * sana eskirib qolmaydi. Server HTML'ida ham bugungi sana chiqadi, brauzer uni yangilaydi.
 */
export function TodayLabel({ suffix }: { suffix?: string }) {
  const [label, setLabel] = useState(() => formatUzDate(new Date()));

  useEffect(() => {
    setLabel(formatUzDate(new Date()));
    // Yarim tunda yangilansin
    const id = setInterval(() => setLabel(formatUzDate(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {label}
      {suffix}
    </span>
  );
}
