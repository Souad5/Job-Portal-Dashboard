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
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />

        <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} />

        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12 }}
          axisLine={false}
        />

        <Tooltip />
        <Legend />

        <Bar
          yAxisId="left"
          dataKey="Application"
          name="Applications"
          fill="#6366F1" // indigo
          radius={[6, 6, 0, 0]}
          barSize={40}
        />

        <Bar
          yAxisId="right"
          dataKey="Hire"
          name="Hires"
          fill="#10B981" // emerald
          radius={[6, 6, 0, 0]}
          barSize={40}
        />

        <RechartsDevtools />
      </BarChart>
    </ResponsiveContainer>
  );
}
