import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Data
const data = [
  { name: "Pending Review", value: 45, color: "hsl(221, 83%, 53%)" },
  { name: "In Progress", value: 32, color: "hsl(38, 92%, 50%)" },
  { name: "Interview", value: 18, color: "hsl(280, 67%, 55%)" },
  { name: "Hired", value: 12, color: "hsl(142, 76%, 36%)" },
  { name: "Rejected", value: 8, color: "hsl(215, 16%, 47%)" },
];

// Total calculation
const totalApplications = data.reduce((sum, item) => sum + item.value, 0);

export function ApplicationChart() {
  return (
    <div className="p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl dark:bg-slate-800">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Application Status
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Pie */}
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

            {/* Center Total */}
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-900 dark:fill-slate-100 text-2xl font-semibold"
            >
              {totalApplications}
            </text>

            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-500 dark:fill-slate-400 text-xs"
            >
              Total Applications
            </text>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value) =>
                value !== undefined ? [`${value} applications`] : [""]
              }
            />

            {/* Legend */}
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
