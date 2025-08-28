import Layout from "@/components/layout/Layout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TwinCanvas from "@/components/dashboard/TwinCanvas";
import Filters, { Range } from "@/components/dashboard/Filters";
import Charts from "@/components/dashboard/Charts";
import LifestylePanel from "@/components/dashboard/LifestylePanel";
import SimulatorPanel, { SimState } from "@/components/dashboard/SimulatorPanel";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ExportBar from "@/components/dashboard/ExportBar";
import { useState } from "react";

export default function Index() {
  const [range, setRange] = useState<Range>("Weekly");
  const [sim, setSim] = useState<{ mod: number; state: SimState }>({ mod: 18, state: { quitSmoking: true, exercise: true, diet: false } });
  const [gender, setGender] = useState<"male" | "female">("male");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Summary */}
        <SummaryCards />

        {/* Center: Twin + Filters + Export */}
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <TwinCanvas modifier={sim.mod} gender={gender} />
          </div>
          <div className="space-y-4">
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Filters</div>
                <Filters value={range} onChange={setRange} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Body</span>
                <button onClick={() => setGender("male")} className={`px-3 py-1 rounded-full text-sm ${gender === "male" ? "bg-aqua/30 text-white" : "hover:bg-white/10"}`}>Male</button>
                <button onClick={() => setGender("female")} className={`px-3 py-1 rounded-full text-sm ${gender === "female" ? "bg-violet/30 text-white" : "hover:bg-white/10"}`}>Female</button>
              </div>
            </div>
            <SimulatorPanel onChange={(m, s) => setSim({ mod: m, state: s })} />
            <ExportBar />
          </div>
        </div>

        {/* Charts */}
        <Charts range={range} simModifier={sim.mod} />

        {/* Bottom panels */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <LifestylePanel />
          </div>
          <AlertsPanel />
        </div>
      </div>
    </Layout>
  );
}
