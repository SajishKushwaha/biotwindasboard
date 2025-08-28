import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Share2, ClipboardCopy, Mail } from "lucide-react";
import { summary } from "@/data/static";
import { overview as labsOverview, recentLabs } from "@/data/labs";
import { overview as lifeOverview } from "@/data/lifestyle";

function encodeShare(payload: any) {
  const json = JSON.stringify(payload);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64;
}

export default function ShareForm() {
  const [patient, setPatient] = useState("SAJISH KUMAR");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sections, setSections] = useState({ vitals: true, labs: true, lifestyle: true });
  const [range, setRange] = useState<{ from: string; to: string }>(() => {
    const to = new Date();
    const from = new Date(); from.setDate(to.getDate() - 30);
    const f = from.toISOString().slice(0,10); const t = to.toISOString().slice(0,10);
    return { from: f, to: t };
  });

  const payload = useMemo(() => ({
    patient,
    email,
    note,
    range,
    sections,
    snapshot: {
      vitals: sections.vitals ? summary : undefined,
      labs: sections.labs ? labsOverview : undefined,
      lifestyle: sections.lifestyle ? lifeOverview : undefined,
      recentLabs: sections.labs ? recentLabs.slice(0,5) : undefined,
      generatedAt: new Date().toISOString(),
    },
  }), [patient, email, note, range, sections]);

  const link = useMemo(() => `${location.origin}/doctor#${encodeShare(payload)}`,[payload]);

  return (
    <div className="glass rounded-xl p-4 border border-white/10 space-y-4">
      <div className="text-sm text-muted-foreground">Share securely with your doctor</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="patient">Patient name</Label>
          <Input id="patient" value={patient} onChange={(e) => setPatient(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Doctor email</Label>
          <Input id="email" type="email" placeholder="doctor@clinic.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="from">From</Label>
          <Input id="from" type="date" value={range.from} onChange={(e) => setRange({ ...range, from: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" type="date" value={range.to} onChange={(e) => setRange({ ...range, to: e.target.value })} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Include sections</div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={sections.vitals} onCheckedChange={(v) => setSections((s) => ({ ...s, vitals: !!v }))} /> Vitals</label>
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={sections.labs} onCheckedChange={(v) => setSections((s) => ({ ...s, labs: !!v }))} /> Labs</label>
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={sections.lifestyle} onCheckedChange={(v) => setSections((s) => ({ ...s, lifestyle: !!v }))} /> Lifestyle</label>
        </div>
      </div>
      <div>
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" placeholder="Any message for your doctor" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-2 justify-end">
        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10" onClick={() => { navigator.clipboard.writeText(link); }}>
          <ClipboardCopy className="h-4 w-4" /> Copy link
        </Button>
        <Button asChild className="bg-gradient-to-r from-aqua/80 to-violet/80 text-background shadow-neon-aqua hover:opacity-90">
          <a href={`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("BioTwin AI Share Link")}&body=${encodeURIComponent(link)}`}>
            <Mail className="h-4 w-4" /> Email link
          </a>
        </Button>
        <Button onClick={() => window.print()}>
          <Share2 className="h-4 w-4" /> Print / PDF
        </Button>
      </div>
      <div className="text-xs break-all text-muted-foreground">{link}</div>
    </div>
  );
}
