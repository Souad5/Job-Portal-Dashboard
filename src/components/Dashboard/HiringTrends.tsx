"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useEffect, useState } from "react";

// Sample data
const data = [
  { name: "January", Hire: 400, Application: 4000 },
  { name: "February", Hire: 300, Application: 13098 },
  { name: "March", Hire: 200, Application: 9800 },
  { name: "April", Hire: 278, Application: 3908 },
  { name: "May", Hire: 1890, Application: 4800 },
  { name: "June", Hire: 290, Application: 3800 },
  { name: "July", Hire: 349, Application: 4300 },
];

export default function HiringBarChart() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-52 sm:h-full w-full">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 40, right: 20, left: 20, bottom: 10 }}
          barGap={8}
          barCategoryGap="20%"
        >
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#E5E7EB"}
          />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{
              fontSize: 12,
              fill: isDark ? "#D1D5DB" : "#374151",
            }}
          />

          {/* SINGLE Y AXIS */}
          <YAxis
            axisLine={false}
            tickCount={5}
            domain={[0, "dataMax"]}
            tick={{
              fontSize: 12,
              fill: isDark ? "#D1D5DB" : "#374151",
            }}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{
              fill: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            }}
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
              borderRadius: "8px",
            }}
            labelStyle={{
              color: isDark ? "#E5E7EB" : "#111827",
              fontWeight: 500,
            }}
            itemStyle={{
              color: isDark ? "#E5E7EB" : "#111827",
            }}
          />

          <Legend />

          {/* Bars - SAME SCALE */}
          <Bar
            dataKey="Application"
            name="Applications"
            fill="#6366F1"
            radius={[6, 6, 0, 0]}
            barSize={36}
          />

          <Bar
            dataKey="Hire"
            name="Hires"
            fill="#10B981"
            radius={[6, 6, 0, 0]}
            barSize={36}
          />

          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
