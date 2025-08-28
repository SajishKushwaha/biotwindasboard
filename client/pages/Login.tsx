import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { setUser } from "@/lib/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") || "/";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: name || email.split("@")[0], email });
    navigate(from);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto glass rounded-xl p-6 border border-white/10 space-y-4">
        <h1 className="text-xl font-bold neon-text">Login</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-aqua/80 to-violet/80 text-background">
            Continue
          </Button>
        </form>
        <div className="text-sm text-muted-foreground">Demo login only. Connect real auth with Supabase or your provider later.</div>
      </div>
    </Layout>
  );
}
