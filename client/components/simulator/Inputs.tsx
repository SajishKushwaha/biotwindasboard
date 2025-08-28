import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";

export type SimInputs = {
  quitSmoking: boolean;
  exerciseDays: number; // 0-7
  dietQuality: number; // 0-100
  sleepTarget: number; // 5-9 hours
  alcoholUnits: number; // 0-14 per week
};

export function defaultInputs(): SimInputs {
  return { quitSmoking: true, exerciseDays: 3, dietQuality: 70, sleepTarget: 7.5, alcoholUnits: 2 };
}

export function computeModifier(i: SimInputs) {
  // Simple heuristic modifier
  return (i.quitSmoking ? 12 : 0) + i.exerciseDays * 2 + i.dietQuality * 0.1 + (i.sleepTarget - 7) * 4 - i.alcoholUnits * 0.8;
}

export default function Inputs({ value, onChange }: { value: SimInputs; onChange: (v: SimInputs) => void }) {
  useEffect(() => { /* trigger parent on mount via value */ }, []);
  return (
    <div className="glass rounded-xl p-4 border border-white/10 space-y-4">
      <div className="text-sm text-muted-foreground">What-if Controls</div>
      <div className="space-y-3">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Quit smoking</span>
          <Switch checked={value.quitSmoking} onCheckedChange={(v) => onChange({ ...value, quitSmoking: v })} />
        </label>
        <div>
          <div className="flex items-center justify-between text-sm mb-2"><span>Exercise days / week</span><span>{value.exerciseDays}</span></div>
          <Slider min={0} max={7} step={1} value={[value.exerciseDays]} onValueChange={([v]) => onChange({ ...value, exerciseDays: v })} />
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-2"><span>Diet quality</span><span>{value.dietQuality}</span></div>
          <Slider min={0} max={100} step={1} value={[value.dietQuality]} onValueChange={([v]) => onChange({ ...value, dietQuality: v })} />
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-2"><span>Sleep target (hrs)</span><span>{value.sleepTarget.toFixed(1)}</span></div>
          <Slider min={5} max={9} step={0.1} value={[value.sleepTarget]} onValueChange={([v]) => onChange({ ...value, sleepTarget: v })} />
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-2"><span>Alcohol units / week</span><span>{value.alcoholUnits}</span></div>
          <Slider min={0} max={14} step={1} value={[value.alcoholUnits]} onValueChange={([v]) => onChange({ ...value, alcoholUnits: v })} />
        </div>
      </div>
    </div>
  );
}
