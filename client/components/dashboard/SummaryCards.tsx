import { useEffect, useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HeartPulse, CloudMoon, Brain, Droplets, LineChart } from "lucide-react";
import { motion } from "framer-motion";

function useCounter(target: number, duration = 800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0 as number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(target * (0.2 + 0.8 * p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function CircularScore({ score }: { score: number }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score > 80 ? "from-aqua/90 to-emerald-400/80" : score > 60 ? "from-yellow-400/80 to-aqua/80" : "from-rose-500/80 to-yellow-400/80";
  return (
    <div className="relative size-20">
      <svg viewBox="0 0 80 80" className="size-20 -rotate-90">
        <circle cx="40" cy="40" r={radius} stroke="hsl(var(--border))" strokeWidth={8} fill="none" />
        <motion.circle cx="40" cy="40" r={radius} strokeWidth={8} fill="none" strokeLinecap="round" stroke="url(#grad)" style={{ strokeDasharray: circ, strokeDashoffset: offset }} />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--aqua))"/>
            <stop offset="100%" stopColor="hsl(var(--violet))"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-lg font-bold">{score}</div>
      </div>
      <div className={cn("absolute -inset-1 rounded-full blur-xl", `bg-gradient-to-br ${color}`)} aria-hidden />
    </div>
  );
}

function PulseLine() {
  const [points, setPoints] = useState<number[]>(() => Array.from({ length: 32 }, () => 50));
  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1);
        const base = 50 + Math.sin(Date.now() / 200) * 8;
        const beat = Date.now() % 1200 < 80 ? 28 : 0;
        next.push(Math.max(10, Math.min(90, base - beat + (Math.random() - 0.5) * 6)));
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, []);
  const d = useMemo(() => points.map((p, i) => `${(i / (points.length - 1)) * 100},${100 - p}`).join(" "), [points]);
  return (
    <svg viewBox="0 0 100 100" className="w-full h-10">
      <polyline fill="none" stroke="hsl(var(--aqua))" strokeWidth="2" points={d} />
    </svg>
  );
}

import { summary } from "@/data/static";

export default function SummaryCards() {
  const score = summary.healthScore;
  const hr = useCounter(summary.heartRate);
  const spo2 = useCounter(summary.spo2);
  const glucose = useCounter(summary.glucose);
  const sleep = useCounter(summary.sleepHours);
  const stress = useCounter(summary.stress);

  const Card = ({ title, tooltip, children, className }: { title: string; tooltip: string; children: React.ReactNode; className?: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("glass p-4 rounded-xl border-white/10 hover:shadow-neon-violet transition-shadow", className)}>
          <div className="text-xs text-muted-foreground mb-2">{title}</div>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
      <Card title="Health Score" tooltip="Overall health score derived from vitals, lab markers, lifestyle and sleep quality">
        <div className="flex items-center gap-3">
          <CircularScore score={score} />
          <div>
            <div className="text-xl font-semibold">{score}/100</div>
            <div className="text-xs text-green-400">Good</div>
          </div>
        </div>
      </Card>
      <Card title="Heart Rate" tooltip="Real-time heart rate stream (bpm)">
        <div className="flex items-center gap-3">
          <HeartPulse className="text-aqua" />
          <div className="flex-1 w-full">
            <div className="text-xl font-semibold">{hr} bpm</div>
            <PulseLine />
          </div>
        </div>
      </Card>
      <Card title="Oxygen (SpO₂)" tooltip="Blood oxygen saturation percentage">
        <div className="flex items-center gap-3">
          <Droplets className="text-aqua" />
          <div className="text-xl font-semibold">{spo2}%</div>
        </div>
      </Card>
      <Card title="Glucose" tooltip="Current glucose level (mg/dL)">
        <div className="flex items-center gap-3">
          <LineChart className="text-violet" />
          <div className="text-xl font-semibold">{glucose} mg/dL</div>
        </div>
      </Card>
      <Card title="Sleep (hrs)" tooltip="Last night vs 7-day average">
        <div className="flex items-center gap-3">
          <CloudMoon className="text-violet" />
          <div>
            <div className="text-xl font-semibold">{sleep}h</div>
            <div className="text-xs text-muted-foreground">avg {summary.sleepAvg}h</div>
          </div>
        </div>
      </Card>
      <Card title="Stress" tooltip="Stress index (lower is better)">
        <div className="flex items-center gap-3">
          <Brain className="text-aqua" />
          <div>
            <div className="text-xl font-semibold">{stress}</div>
            <div className="text-xs">{stress < 30 ? "😊" : stress < 60 ? "😐" : "😣"}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
