import { habits } from "@/data/lifestyle";

export default function HabitsPanel() {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-sm text-muted-foreground mb-3">Habits Compliance</div>
      <div className="space-y-3">
        {habits.map((h) => (
          <div key={h.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm"><span>{h.name}</span><span>{h.percent}%</span></div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-aqua/80 to-violet/80" style={{ width: `${h.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
