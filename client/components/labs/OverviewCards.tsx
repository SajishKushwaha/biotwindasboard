import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FlaskConical, Droplets, ShieldCheck, ShieldAlert, SunMedium, LineChart } from "lucide-react";
import { overview } from "@/data/labs";

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

export default function LabsOverviewCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
      <Card title="HbA1c" tooltip="3-month glucose average">
        <div className="flex items-center gap-3">
          <FlaskConical className="text-violet" />
          <div className="text-2xl font-semibold">{overview.a1c}<span className="text-sm">%</span></div>
        </div>
      </Card>
      <Card title="Fasting Glucose" tooltip="mg/dL">
        <div className="flex items-center gap-3">
          <LineChart className="text-aqua" />
          <div className="text-2xl font-semibold">{overview.fastingGlucose} <span className="text-sm">mg/dL</span></div>
        </div>
      </Card>
      <Card title="LDL-C" tooltip="Low-density lipoprotein">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-rose-400" />
          <div className="text-2xl font-semibold">{overview.ldl} <span className="text-sm">mg/dL</span></div>
        </div>
      </Card>
      <Card title="HDL-C" tooltip="High-density lipoprotein">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" />
          <div className="text-2xl font-semibold">{overview.hdl} <span className="text-sm">mg/dL</span></div>
        </div>
      </Card>
      <Card title="Triglycerides" tooltip="mg/dL">
        <div className="flex items-center gap-3">
          <Droplets className="text-aqua" />
          <div className="text-2xl font-semibold">{overview.triglycerides} <span className="text-sm">mg/dL</span></div>
        </div>
      </Card>
      <Card title="Vitamin D" tooltip="ng/mL">
        <div className="flex items-center gap-3">
          <SunMedium className="text-yellow-300" />
          <div className="text-2xl font-semibold">{overview.vitaminD} <span className="text-sm">ng/mL</span></div>
        </div>
      </Card>
    </div>
  );
}
