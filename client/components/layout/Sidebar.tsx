import { NavLink, useLocation } from "react-router-dom";
import { Activity, Brain, FlaskConical, Home, Share2, Upload, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/vitals", label: "Vitals", icon: Activity },
  { to: "/labs", label: "Labs", icon: FlaskConical },
  { to: "/lifestyle", label: "Lifestyle", icon: Zap },
  { to: "/simulator", label: "Simulator", icon: Brain },
  { to: "/connect", label: "Upload & Connect", icon: Upload },
  { to: "/doctor", label: "Doctor/Share", icon: Share2 },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="h-full flex flex-col px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-aqua/80 to-violet/80 shadow-neon-aqua animate-glow" />
        <div>
          <div className="text-lg font-extrabold tracking-wide neon-text">BioTwin AI</div>
          <div className="text-xs text-muted-foreground">Health Analytics</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
              "hover:bg-white/5 hover:shadow-neon-violet",
              isActive || active ? "bg-white/10 shadow-neon-aqua text-white" : "text-foreground/90"
            )}>
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto p-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <div className="text-xs text-muted-foreground">Next check-in</div>
        <div className="text-sm font-semibold">Dr. Chen — Tue 3:30 PM</div>
      </div>
    </div>
  );
}
