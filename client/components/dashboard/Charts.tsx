import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Range } from "./Filters";
import { timeSeries, riskForecast, organs as organDist } from "@/data/static";

function applySimModifier(points: { name: string; hr: number; glucose: number; sleep: number }[], mod: number) {
  return points.map((p) => ({
    ...p,
    hr: Math.round(p.hr + mod * 0.1),
    glucose: Math.round(p.glucose - mod * 0.15),
    sleep: Number(Math.max(5.5, Math.min(9, p.sleep + mod * 0.005))).toFixed ? Number(Math.max(5.5, Math.min(9, p.sleep + mod * 0.005)).toFixed(2)) : p.sleep,
  }));
}

export default function Charts({ range, simModifier }: { range: Range; simModifier: number }) {
  const base = useMemo(() => timeSeries[range], [range]);
  const series = useMemo(() => applySimModifier(base, simModifier), [base, simModifier]);
  const risk = useMemo(() => riskForecast.map((r, i) => ({ ...r, risk: Math.max(4, Math.round(r.risk - simModifier * 0.1)) })), [simModifier]);
  const organs = organDist;
  const colors = ["hsl(var(--aqua))", "hsl(var(--violet))", "#22d3ee", "#a78bfa"]; 

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="glass rounded-xl p-4 border border-white/10 lg:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">HR, Glucose, Sleep</div>
        </div>
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
                <linearGradient id="risk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--violet))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--violet))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", color: "hsl(var(--popover-foreground))" }} />
              <Area type="monotone" dataKey="risk" stroke="hsl(var(--violet))" fillOpacity={1} fill="url(#risk)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-xl p-4 border border-white/10 lg:col-span-1">
        <div className="text-sm text-muted-foreground mb-2">Organ Health Distribution</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={organs} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={4}>
                {organs.map((_, i) => (
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
