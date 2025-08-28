import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Legend, ComposedChart, Bar, Area } from "recharts";
import Filters, { Range } from "@/components/dashboard/Filters";
import { glucoseSeries, lipidsYearly } from "@/data/labs";

export default function LabsTrends({ range, onRangeChange }: { range: Range; onRangeChange: (r: Range) => void }) {
  const glucose = useMemo(() => glucoseSeries[range], [range]);
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">Labs Trends</div>
        <Filters value={range} onChange={onRangeChange} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={glucose} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Legend />
              <Line type="monotone" dataKey="glucose" name="Glucose" stroke="hsl(var(--aqua))" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={lipidsYearly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Legend />
              <Area type="monotone" dataKey="tg" name="Triglycerides" stroke="#22d3ee" fill="#22d3ee33" />
              <Line type="monotone" dataKey="ldl" name="LDL" stroke="hsl(var(--violet))" strokeWidth={2} />
              <Bar dataKey="hdl" name="HDL" fill="#10b981" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
