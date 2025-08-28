import { Flame, Footprints, Gauge } from "lucide-react";

function Stat({ title, value, sub, color }: { title: string; value: string; sub?: string; color: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-xl font-semibold mt-1" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

import { lifestyle } from "@/data/static";

export default function LifestylePanel() {
  const net = lifestyle.caloriesIn - lifestyle.caloriesOut;
  const netLabel = `${net > 0 ? "+" : ""}${net} kcal`;
  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat title="Calories" value={`${lifestyle.caloriesIn.toLocaleString()} in / ${lifestyle.caloriesOut.toLocaleString()} out`} sub={`Net ${netLabel}`} color="hsl(var(--aqua))" />
      <Stat title="Steps" value={lifestyle.steps.toLocaleString()} sub="Goal 10k" color="#10b981" />
      <Stat title="Recovery" value={`${lifestyle.recovery}`} sub={`HRV ${lifestyle.hrv} ms`} color="hsl(var(--violet))" />
    </div>
  );
}
