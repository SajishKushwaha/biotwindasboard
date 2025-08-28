import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Legend, ComposedChart, Bar, PieChart, Pie, Cell } from "recharts";
import Filters, { Range } from "@/components/dashboard/Filters";
import { lifestyleSeries, activityGoals } from "@/data/lifestyle";

export default function LifestyleTrends({ range, onRangeChange }: { range: Range; onRangeChange: (r: Range) => void }) {
  const data = useMemo(() => lifestyleSeries[range], [range]);
  const ring = [
    { name: "Move", value: Math.min(activityGoals.move.current, activityGoals.move.goal) },
    { name: "Exercise", value: activityGoals.exercise.current },
    { name: "Stand", value: activityGoals.stand.current },
  ];
  const colors = ["hsl(var(--aqua))", "#10b981", "hsl(var(--violet))"];

  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">Lifestyle Trends</div>
        <Filters value={range} onChange={onRangeChange} />
      </div>
      <div className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Legend />
              <Bar dataKey="caloriesIn" name="Calories In" fill="#a78bfa77" />
              <Bar dataKey="caloriesOut" name="Calories Out" fill="#22d3ee77" />
              <Line type="monotone" dataKey="steps" name="Steps" stroke="#10b981" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={ring} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={2}>
                {ring.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
