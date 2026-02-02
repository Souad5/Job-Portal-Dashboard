import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Pending Review", value: 45, color: "hsl(221, 83%, 53%)" },
  { name: "In Progress", value: 32, color: "hsl(38, 92%, 50%)" },
  { name: "Interview", value: 18, color: "hsl(280, 67%, 55%)" },
  { name: "Hired", value: 12, color: "hsl(142, 76%, 36%)" },
  { name: "Rejected", value: 8, color: "hsl(215, 16%, 47%)" },
];

export function ApplicationChart() {
  return (
    <div className="bg-card p-6 shadow-sm bg-white rounded-xl">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Application Status
      </h3>
      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((d, index) => (
                <Cell key={`cell-${index}`} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) =>
                value !== undefined ? [`${value} applications`, ""] : ["", ""]
              }
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
