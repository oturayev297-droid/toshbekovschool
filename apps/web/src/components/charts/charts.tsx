"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false };
const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 12,
    color: "var(--popover-foreground)",
  },
};

/** Tushum / chiqim (mln so'm) */
export function RevenueChart({
  data,
}: {
  data: { month: string; tushum: number; chiqim: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gTushum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} mln so'm`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="tushum"
          name="Tushum"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="url(#gTushum)"
        />
        <Area
          type="monotone"
          dataKey="chiqim"
          name="Chiqim"
          stroke="var(--chart-2)"
          strokeWidth={2}
          strokeDasharray="5 4"
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Haftalik davomat (%) */
export function AttendanceChart({ data }: { data: { day: string; foiz: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" {...axis} />
        <YAxis domain={[80, 100]} {...axis} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="foiz" name="Davomat" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** O'quvchi test natijalari — fanlar bo'yicha */
export function ScoreChart({
  data,
  keys,
}: {
  data: Record<string, string | number>[];
  keys: string[];
}) {
  const colors = ["var(--chart-1)", "var(--chart-2)"];
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="week" {...axis} />
        <YAxis domain={[40, 100]} {...axis} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} ball`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        {keys.map((k, i) => (
          <Line
            key={k}
            type="monotone"
            dataKey={k}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
