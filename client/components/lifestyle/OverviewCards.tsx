import { overview } from "@/data/lifestyle";
import { Flame, Footprints, CloudMoon, Gauge } from "lucide-react";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass p-4 rounded-xl border border-white/10 hover:shadow-neon-violet transition-shadow">
      <div className="text-xs text-muted-foreground mb-2">{title}</div>
      {children}
    </div>
  );
}

export default function LifestyleOverviewCards() {
  const net = overview.caloriesIn - overview.caloriesOut;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
      <Card title="Calories">
        <div className="flex items-center gap-3">
          <Flame className="text-aqua" />
          <div>
            <div className="text-xl font-semibold">{overview.caloriesIn.toLocaleString()} in</div>
            <div className="text-sm">{overview.caloriesOut.toLocaleString()} out</div>
            <div className="text-xs text-muted-foreground">Net {net > 0 ? "+" : ""}{net}</div>
          </div>
        </div>
      </Card>
      <Card title="Steps">
        <div className="flex items-center gap-3">
          <Footprints className="text-emerald-400" />
          <div className="text-2xl font-semibold">{overview.steps.toLocaleString()}</div>
        </div>
      </Card>
      <Card title="Sleep">
        <div className="flex items-center gap-3">
          <CloudMoon className="text-violet" />
          <div>
            <div className="text-xl font-semibold">{overview.sleepLast}h</div>
            <div className="text-xs text-muted-foreground">avg {overview.sleepAvg}h</div>
          </div>
        </div>
      </Card>
      <Card title="Recovery">
        <div className="flex items-center gap-3">
          <Gauge className="text-aqua" />
          <div>
            <div className="text-2xl font-semibold">{overview.recovery}</div>
            <div className="text-xs text-muted-foreground">HRV {overview.hrv} ms</div>
          </div>
        </div>
      </Card>
      <Card title="Active Minutes">
        <div className="text-2xl font-semibold">{overview.activeMinutes} min</div>
      </Card>
      <Card title="Workouts (week)">
        <div className="text-2xl font-semibold">{overview.workoutsThisWeek}</div>
      </Card>
    </div>
  );
}
