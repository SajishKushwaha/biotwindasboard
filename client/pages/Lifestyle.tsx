import Layout from "@/components/layout/Layout";
import LifestyleOverviewCards from "@/components/lifestyle/OverviewCards";
import LifestyleTrends from "@/components/lifestyle/Trends";
import HabitsPanel from "@/components/lifestyle/HabitsPanel";
import { useState } from "react";
import { Range } from "@/components/dashboard/Filters";

export default function Lifestyle() {
  const [range, setRange] = useState<Range>("Weekly");
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">Lifestyle</h1>
        </div>
        <LifestyleOverviewCards />
        <LifestyleTrends range={range} onRangeChange={setRange} />
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2" />
          <HabitsPanel />
        </div>
      </div>
    </Layout>
  );
}
