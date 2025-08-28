import { vitalsSeries } from "@/data/vitals";
import { Range } from "@/components/dashboard/Filters";

export default function DetailsTable({ range }: { range: Range }) {
  const data = vitalsSeries[range].slice(-10).reverse();
  return (
    <div className="glass rounded-xl p-4 border border-white/10 overflow-x-auto">
      <div className="text-sm text-muted-foreground mb-2">Recent Readings</div>
      <table className="w-full text-sm">
        <thead className="text-muted-foreground">
          <tr className="text-left">
            <th className="py-2 pr-4">Time</th>
            <th className="py-2 pr-4">HR (bpm)</th>
            <th className="py-2 pr-4">SpO₂ (%)</th>
            <th className="py-2 pr-4">BP (mmHg)</th>
            <th className="py-2 pr-4">RR (rpm)</th>
            <th className="py-2 pr-0">Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} className="border-t border-white/10">
              <td className="py-2 pr-4">{r.time}</td>
              <td className="py-2 pr-4">{r.hr}</td>
              <td className="py-2 pr-4">{r.spo2}</td>
              <td className="py-2 pr-4">{r.bpSys}/{r.bpDia}</td>
              <td className="py-2 pr-4">{r.rr}</td>
              <td className="py-2 pr-0">{r.temp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
