import Layout from "@/components/layout/Layout";
import LabsOverviewCards from "@/components/labs/OverviewCards";
import LabsTrends from "@/components/labs/Trends";
import LabsDetailsTable from "@/components/labs/DetailsTable";
import { useState } from "react";
import { Range } from "@/components/dashboard/Filters";

export default function Labs() {
  const [range, setRange] = useState<Range>("Yearly");
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">Labs</h1>
        </div>
        <LabsOverviewCards />
        <LabsTrends range={range} onRangeChange={setRange} />
        <LabsDetailsTable />
      </div>
    </Layout>
  );
}
