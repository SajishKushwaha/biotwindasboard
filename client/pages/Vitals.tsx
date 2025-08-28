import Layout from "@/components/layout/Layout";
import OverviewCards from "@/components/vitals/OverviewCards";
import Trends from "@/components/vitals/Trends";
import ECGPanel from "@/components/vitals/ECGPanel";
import DetailsTable from "@/components/vitals/DetailsTable";
import { useMemo, useState } from "react";
import { Range } from "@/components/dashboard/Filters";
import { useLocation } from "react-router-dom";

export default function Vitals() {
  const [range, setRange] = useState<Range>("Weekly");
  const organ = new URLSearchParams(useLocation().search).get("organ");
  const organTitle = useMemo(() => organ ? organ.charAt(0).toUpperCase() + organ.slice(1) : null, [organ]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">Vitals {organTitle ? `— ${organTitle}` : ""}</h1>
        </div>
        <OverviewCards />
        <Trends range={range} onRangeChange={setRange} />
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DetailsTable range={range} />
          </div>
          <ECGPanel />
        </div>
      </div>
    </Layout>
  );
}
