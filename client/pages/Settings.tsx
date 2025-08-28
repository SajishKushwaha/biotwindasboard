import Layout from "@/components/layout/Layout";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, setUser } from "@/lib/auth";

export default function Settings() {
  const u = getUser() || { name: "You", email: "" };
  const [name, setName] = useState(u.name);
  const [email, setEmail] = useState(u.email);
  const [notif, setNotif] = useState({ alerts: true, summaries: true });
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-xl font-bold neon-text">Settings</h1>

        <div className="grid lg:grid-cols-2 gap-4 items-start">
          <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
            <div className="text-sm text-muted-foreground">Account</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setUser({ name, email })}>Save</Button>
            </div>
          </div>

          <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
            <div className="text-sm text-muted-foreground">Appearance</div>
            <label className="flex items-center justify-between text-sm">
              <span>Dark mode</span>
              <Switch checked={dark} onCheckedChange={(v) => { setDark(v); const el = document.documentElement; el.classList.toggle("dark", v); }} />
            </label>
          </div>

          <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
            <div className="text-sm text-muted-foreground">Notifications</div>
            <label className="flex items-center justify-between text-sm">
              <span>Alerts & insights</span>
              <Switch checked={notif.alerts} onCheckedChange={(v) => setNotif((n) => ({ ...n, alerts: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Weekly summary</span>
              <Switch checked={notif.summaries} onCheckedChange={(v) => setNotif((n) => ({ ...n, summaries: v }))} />
            </label>
          </div>

          <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
            <div className="text-sm text-muted-foreground">Data sources</div>
            <div className="flex items-center gap-2">
              <Button asChild className="bg-gradient-to-r from-aqua/80 to-violet/80 text-background">
                <Link to="/connect">Manage Upload & Connect</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
                <Link to="/doctor">Doctor/Share</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
