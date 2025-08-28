import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

const items = [
  { level: "urgent", icon: AlertTriangle, text: "Glucose spikes detected post-lunch. Consider lower GI carbs.", color: "#f43f5e" },
  { level: "medium", icon: Info, text: "Sleep efficiency dropped 6% vs avg. Avoid screens 1h before bed.", color: "#f59e0b" },
  { level: "good", icon: CheckCircle2, text: "HRV improving over 2 weeks. Keep up moderate-intensity workouts.", color: "#10b981" },
];

export default function AlertsPanel() {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-sm text-muted-foreground mb-3">Alerts & Insights</div>
      <div className="space-y-2">
        {items.map(({ level, icon: Icon, text, color }, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg p-3 border border-white/10 bg-white/5">
            <Icon className="mt-0.5" style={{ color }} />
            <div className="text-sm">
              <div className="font-medium capitalize" style={{ color }}>{level}</div>
              <div className="text-foreground/90">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
