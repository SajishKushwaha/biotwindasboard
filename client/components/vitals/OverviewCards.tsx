import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Activity, HeartPulse, Droplets, Stethoscope, Thermometer, Wind } from "lucide-react";
import { latest } from "@/data/vitals";

const Card = ({ title, tooltip, children }: { title: string; tooltip: string; children: React.ReactNode }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className={cn("glass p-4 rounded-xl border-white/10 hover:shadow-neon-violet transition-shadow")}> 
        <div className="text-xs text-muted-foreground mb-2">{title}</div>
        {children}
      </div>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
      <Card title="Heart Rate" tooltip="Beats per minute">
        <div className="flex items-center gap-3">
          <HeartPulse className="text-aqua" />
          <div className="text-2xl font-semibold">{latest.hr} <span className="text-sm">bpm</span></div>
        </div>
      </Card>
      <Card title="Blood Pressure" tooltip="Systolic/Diastolic (mmHg)">
        <div className="flex items-center gap-3">
          <Stethoscope className="text-violet" />
          <div className="text-2xl font-semibold">{latest.bpSys}/{latest.bpDia} <span className="text-sm">mmHg</span></div>
        </div>
      </Card>
      <Card title="SpO₂" tooltip="Oxygen saturation">
        <div className="flex items-center gap-3">
          <Droplets className="text-aqua" />
          <div className="text-2xl font-semibold">{latest.spo2}%</div>
        </div>
      </Card>
      <Card title="Respiratory Rate" tooltip="Breaths per minute">
        <div className="flex items-center gap-3">
          <Wind className="text-aqua" />
          <div className="text-2xl font-semibold">{latest.rr} <span className="text-sm">rpm</span></div>
        </div>
      </Card>
      <Card title="Temperature" tooltip="Body temperature">
        <div className="flex items-center gap-3">
          <Thermometer className="text-violet" />
          <div className="text-2xl font-semibold">{latest.temp}°C</div>
        </div>
      </Card>
      <Card title="HRV" tooltip="Heart rate variability (ms)">
        <div className="flex items-center gap-3">
          <Activity className="text-aqua" />
          <div className="text-2xl font-semibold">{latest.hrv} <span className="text-sm">ms</span></div>
        </div>
      </Card>
    </div>
  );
}
