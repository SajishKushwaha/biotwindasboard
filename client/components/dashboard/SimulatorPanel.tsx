import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export type SimState = {
  quitSmoking: boolean;
  exercise: boolean;
  diet: boolean;
};

export default function SimulatorPanel({ onChange }: { onChange: (modifier: number, state: SimState) => void }) {
  const [state, setState] = useState<SimState>({ quitSmoking: true, exercise: true, diet: false });

  useEffect(() => {
    // compute simple modifier: each positive habit reduces risk and improves metrics
    const modifier = (state.quitSmoking ? 12 : 0) + (state.exercise ? 8 : 0) + (state.diet ? 6 : 0);
    onChange(modifier, state);
  }, [state, onChange]);

  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-sm text-muted-foreground mb-3">What-if Simulator</div>
      <div className="space-y-3">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Quit smoking</span>
          <Switch checked={state.quitSmoking} onCheckedChange={(v) => setState((s) => ({ ...s, quitSmoking: v }))} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Exercise 3x/week</span>
          <Switch checked={state.exercise} onCheckedChange={(v) => setState((s) => ({ ...s, exercise: v }))} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Diet change</span>
          <Switch checked={state.diet} onCheckedChange={(v) => setState((s) => ({ ...s, diet: v }))} />
        </label>
      </div>
    </div>
  );
}
