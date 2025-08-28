import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Legend, AreaChart, Area } from "recharts";
import Filters, { Range } from "@/components/dashboard/Filters";
import { vitalsSeries } from "@/data/vitals";

export default function Trends({ range, onRangeChange }: { range: Range; onRangeChange: (r: Range) => void }) {
  const data = useMemo(() => vitalsSeries[range], [range]);
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">Vitals Trends</div>
        <Filters value={range} onChange={onRangeChange} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Legend />
              <Line type="monotone" dataKey="hr" name="Heart Rate" stroke="hsl(var(--aqua))" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="spo2" name="SpO₂" stroke="hsl(var(--violet))" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="bp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--aqua))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--aqua))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Area type="monotone" dataKey="bpSys" name="BP Systolic" stroke="hsl(var(--aqua))" fillOpacity={1} fill="url(#bp)" />
              <Area type="monotone" dataKey="bpDia" name="BP Diastolic" stroke="hsl(var(--violet))" fillOpacity={0.6} fill="url(#bp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
