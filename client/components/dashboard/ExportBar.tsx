import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { summary, lifestyle } from "@/data/static";

function exportCSV() {
  const rows = [
    ["metric","value"],
    ["health_score", String(summary.healthScore)],
    ["heart_rate", String(summary.heartRate)],
    ["spo2", String(summary.spo2)],
    ["glucose", String(summary.glucose)],
    ["sleep_hours", String(summary.sleepHours)],
    ["stress", String(summary.stress)],
    ["calories_in", String(lifestyle.caloriesIn)],
    ["calories_out", String(lifestyle.caloriesOut)],
    ["steps", String(lifestyle.steps)],
    ["recovery", String(lifestyle.recovery)],
    ["hrv_ms", String(lifestyle.hrv)],
  ];
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "biotwin-dashboard-export.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ExportBar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10" onClick={exportCSV}>
        <Download className="h-4 w-4" /> Export CSV
      </Button>
      <Button className="bg-gradient-to-r from-aqua/80 to-violet/80 text-background shadow-neon-aqua hover:opacity-90" onClick={() => navigate('/doctor')}>
        <Share2 className="h-4 w-4" /> Share with doctor
      </Button>
    </div>
  );
}
