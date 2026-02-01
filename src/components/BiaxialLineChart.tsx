import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// #region Sample data
const data = [
  {
    name: "Jan",
    Hire: 4000,
    Application: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    Hire: 3000,
    Application: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    Hire: 2000,
    Application: 9800,
    amt: 2290,
  },
  {
    name: "April",
    Hire: 2780,
    Application: 3908,
    amt: 2000,
  },
  {
    name: "May",
    Hire: 1890,
    Application: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    Hire: 2390,
    Application: 3800,
    amt: 2500,
  },
  {
    name: "July",
    Hire: 3490,
    Application: 4300,
    amt: 2100,
  },
];

// #endregion
export default function Example() {
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "90%",
        maxHeight: "30vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 15,
        right: 15,
        left: 15,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" width="auto" />
      <YAxis yAxisId="right" orientation="right" width="auto" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="Application"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey="Hire" stroke="#82ca9d" />
      <RechartsDevtools />
    </LineChart>
  );
}
