import Layout from "@/components/layout/Layout";
import Inputs, { SimInputs, defaultInputs, computeModifier } from "@/components/simulator/Inputs";
import SimCharts from "@/components/simulator/Charts";
import Summary from "@/components/simulator/Summary";
import Filters, { Range } from "@/components/dashboard/Filters";
import { useMemo, useState } from "react";
import { timeSeries, riskForecast } from "@/data/static";

export default function Simulator() {
  const [inputs, setInputs] = useState<SimInputs>(defaultInputs());
  const [range, setRange] = useState<Range>("Weekly");
  const modifier = computeModifier(inputs);

  // derive headline predictions from current range mid-point
  const base = timeSeries[range];
  const mid = base[Math.floor(base.length / 2)];
  const hr = Math.round(mid.hr - modifier * 0.15);
  const glucose = Math.round(mid.glucose - modifier * 0.25);
  const sleep = Number(Math.min(9, mid.sleep + modifier * 0.008).toFixed(2));
  const risk5y = Math.max(2, Math.round(riskForecast[4].risk - modifier * 0.2));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">What-if Simulator</h1>
          <Filters value={range} onChange={setRange} />
        </div>
        <Summary hr={hr} glucose={glucose} sleep={sleep} risk5y={risk5y} />
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <SimCharts range={range} modifier={modifier} />
          </div>
          <div className="order-1 lg:order-2">
            <Inputs value={inputs} onChange={setInputs} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
