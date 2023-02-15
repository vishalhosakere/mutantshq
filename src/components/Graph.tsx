import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface IAreaGraphItem {
  label: string;
  value: number;
}
export interface IAreaGraph {
  data: IAreaGraphItem[];
  maxYAxis: number;
}

export default function AreaGraph({ data, maxYAxis }: IAreaGraph) {
  return (
    <ResponsiveContainer>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelClassName="text-accent"
          wrapperClassName="rounded-lg bg-black"
          contentStyle={{ backgroundColor: "black" }}
        />
        <XAxis dataKey="label" />
        <YAxis
          type="number"
          domain={[0, maxYAxis + 200]}
          allowDataOverflow={true}
          tickCount={10}
          tickFormatter={(val) => parseInt(val).toString()}
        />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
