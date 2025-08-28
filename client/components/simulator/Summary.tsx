import { summary as base } from "@/data/static";

function Delta({ label, from, to, unit }: { label: string; from: number; to: number; unit: string }) {
  const diff = Number((to - from).toFixed(2));
  const good = label === "Glucose" || label === "Risk (5y)" || label === "Heart Rate" ? diff <= 0 : diff >= 0;
  const color = good ? "text-emerald-400" : "text-rose-400";
  const arrow = diff === 0 ? "→" : good ? "↓" : "↑";
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold mt-1">{to} {unit} <span className={`ml-2 text-sm ${color}`}>{arrow} {Math.abs(diff)}{unit}</span></div>
      <div className="text-xs text-muted-foreground">Baseline {from}{unit}</div>
    </div>
  );
}

export default function Summary({ hr, glucose, sleep, risk5y }: { hr: number; glucose: number; sleep: number; risk5y: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Delta label="Heart Rate" from={base.heartRate} to={hr} unit="" />
      <Delta label="Glucose" from={base.glucose} to={glucose} unit=" mg/dL" />
      <Delta label="Sleep" from={base.sleepHours} to={sleep} unit=" h" />
      <Delta label="Risk (5y)" from={13} to={risk5y} unit="%" />
    </div>
  );
}
