import { ecgPoints } from "@/data/vitals";

export default function ECGPanel() {
  const width = 400;
  const height = 120;
  const points = ecgPoints
    .map((y, i) => `${(i / (ecgPoints.length - 1)) * width},${height / 2 - y}`)
    .join(" ");
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-sm text-muted-foreground mb-2">ECG (lead I)</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <polyline points={points} fill="none" stroke="hsl(var(--aqua))" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" from="0,800" to="800,0" dur="2.5s" repeatCount="indefinite" />
        </polyline>
      </svg>
    </div>
  );
}
