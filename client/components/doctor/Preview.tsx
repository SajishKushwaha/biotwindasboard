import { summary } from "@/data/static";
import { overview as labsOverview, recentLabs } from "@/data/labs";
import { overview as life } from "@/data/lifestyle";

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function Preview() {
  // If URL hash contains payload, prefer that snapshot
  let snap: any = null;
  try {
    if (location.hash && location.hash.length > 1) {
      const json = decodeURIComponent(escape(atob(location.hash.slice(1))));
      const parsed = JSON.parse(json);
      if (parsed && parsed.snapshot) snap = parsed.snapshot;
    }
  } catch {}

  const vit = snap?.vitals || summary;
  const labs = snap?.labs || labsOverview;
  const recents = snap?.recentLabs || recentLabs.slice(0,5);
  const ls = snap?.lifestyle || life;

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4 border border-white/10">
        <div className="text-sm text-muted-foreground mb-2">Vitals Summary</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Row label="Health Score" value={`${vit.healthScore}`} />
          <Row label="HR (bpm)" value={`${vit.heartRate}`} />
          <Row label="SpO₂ (%)" value={`${vit.spo2}`} />
          <Row label="Glucose (mg/dL)" value={`${vit.glucose}`} />
        </div>
      </div>
      <div className="glass rounded-xl p-4 border border-white/10">
        <div className="text-sm text-muted-foreground mb-2">Key Labs</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Row label="A1c (%)" value={`${labs.a1c}`} />
          <Row label="LDL (mg/dL)" value={`${labs.ldl}`} />
          <Row label="HDL (mg/dL)" value={`${labs.hdl}`} />
          <Row label="CRP (mg/L)" value={`${labs.crp}`} />
        </div>
        <div className="mt-3 text-sm text-muted-foreground">Recent lab rows:</div>
        <ul className="text-sm list-disc ml-5">
          {recents.map((r: any, i: number) => (
            <li key={i}>{r.test}: {r.value} {r.unit} ({r.ref})</li>
          ))}
        </ul>
      </div>
      <div className="glass rounded-xl p-4 border border-white/10">
        <div className="text-sm text-muted-foreground mb-2">Lifestyle Snapshot</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Row label="Steps" value={ls.steps.toLocaleString()} />
          <Row label="Sleep (h)" value={`${ls.sleepLast} (avg ${ls.sleepAvg})`} />
          <Row label="Recovery" value={`${ls.recovery}`} />
          <Row label="Calories" value={`${ls.caloriesIn} in / ${ls.caloriesOut} out`} />
        </div>
      </div>
    </div>
  );
}
