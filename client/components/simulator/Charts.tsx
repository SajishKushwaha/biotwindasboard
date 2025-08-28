import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Legend, AreaChart, Area } from "recharts";
import { Range } from "@/components/dashboard/Filters";
import { timeSeries, riskForecast } from "@/data/static";

function apply(points: { name: string; hr: number; glucose: number; sleep: number }[], mod: number) {
  return points.map((p) => ({
    ...p,
    hr: Math.round(p.hr - mod * 0.15),
    glucose: Math.round(p.glucose - mod * 0.25),
    sleep: Number(Math.min(9, p.sleep + mod * 0.008).toFixed(2)),
  }));
}

export default function SimCharts({ range, modifier }: { range: Range; modifier: number }) {
  const base = useMemo(() => timeSeries[range], [range]);
  const series = useMemo(() => apply(base, modifier), [base, modifier]);
  const risk = useMemo(() => riskForecast.map((r, i) => ({ ...r, risk: Math.max(2, Math.round(r.risk - modifier * 0.2)) })), [modifier]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="glass rounded-xl p-4 border border-white/10 lg:col-span-2">
        <div className="text-sm text-muted-foreground mb-2">Projected HR, Glucose, Sleep</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Legend />
              <Line type="monotone" dataKey="hr" stroke="hsl(var(--aqua))" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="glucose" stroke="hsl(var(--violet))" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="sleep" stroke="#10b981" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-xl p-4 border border-white/10">
        <div className="text-sm text-muted-foreground mb-2">Disease Risk Forecast</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={risk} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskSim" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--aqua))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--aqua))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Area type="monotone" dataKey="risk" stroke="hsl(var(--aqua))" fillOpacity={1} fill="url(#riskSim)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
