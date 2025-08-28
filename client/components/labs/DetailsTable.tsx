import { recentLabs } from "@/data/labs";

export default function LabsDetailsTable() {
  return (
    <div className="glass rounded-xl p-4 border border-white/10 overflow-x-auto">
      <div className="text-sm text-muted-foreground mb-2">Recent Lab Results</div>
      <table className="w-full text-sm">
        <thead className="text-muted-foreground">
          <tr className="text-left">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Test</th>
            <th className="py-2 pr-4">Value</th>
            <th className="py-2 pr-4">Unit</th>
            <th className="py-2 pr-4">Reference</th>
            <th className="py-2 pr-0">Flag</th>
          </tr>
        </thead>
        <tbody>
          {recentLabs.map((r, i) => (
            <tr key={i} className="border-t border-white/10">
              <td className="py-2 pr-4">{r.date}</td>
              <td className="py-2 pr-4">{r.test}</td>
              <td className="py-2 pr-4">{r.value}</td>
              <td className="py-2 pr-4">{r.unit}</td>
              <td className="py-2 pr-4">{r.ref}</td>
              <td className="py-2 pr-0">{r.flag || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
