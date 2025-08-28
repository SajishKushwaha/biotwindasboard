import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Watch, Activity, ShieldCheck, Smartphone } from "lucide-react";

const vendors = [
  { key: "fitbit", name: "Fitbit", icon: Activity },
  { key: "garmin", name: "Garmin", icon: Watch },
  { key: "googlefit", name: "Google Fit", icon: Smartphone },
  { key: "apple", name: "Apple Health", icon: Smartphone },
];

type Connections = Record<string, { connected: boolean; at?: string }>;

function load(): Connections {
  try { return JSON.parse(localStorage.getItem("bt_connections") || "{}"); } catch { return {}; }
}
function save(data: Connections) { localStorage.setItem("bt_connections", JSON.stringify(data)); }

export default function DeviceConnect() {
  const [conns, setConns] = useState<Connections>({});
  useEffect(() => { setConns(load()); }, []);

  const toggle = (key: string) => {
    const next: Connections = { ...conns, [key]: { connected: !(conns[key]?.connected), at: new Date().toISOString() } };
    setConns(next); save(next);
  };

  return (
    <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
      <div className="text-sm text-muted-foreground">Connect smartwatch/fitness data</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {vendors.map(v => {
          const Icon = v.icon; const isOn = conns[v.key]?.connected;
          return (
            <div key={v.key} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-aqua" />
                <div className="text-sm">{v.name}</div>
                {isOn && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
              </div>
              <Button size="sm" className={isOn ? "bg-emerald-500 hover:bg-emerald-600" : undefined} onClick={() => toggle(v.key)}>
                {isOn ? "Connected" : "Connect"}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted-foreground">Connections are simulated in this demo UI. Production will redirect to each provider's OAuth and sync via webhooks.</div>
    </div>
  );
}
