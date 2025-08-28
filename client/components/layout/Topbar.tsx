import { Bell, Cog, Search, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getUser, clearUser } from "@/lib/auth";
import { Link } from "react-router-dom";

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const d = document.documentElement.classList.contains("dark");
    setDark(d);
  }, []);
  return (
    <Button
      aria-label="Toggle theme"
      variant="ghost"
      className={cn("rounded-full hover:bg-white/10")}
      onClick={() => {
        const el = document.documentElement;
        el.classList.toggle("dark");
        setDark(el.classList.contains("dark"));
      }}
    >
      {dark ? (
        <span className="text-xs">🌙</span>
      ) : (
        <span className="text-xs">☀️</span>
      )}
    </Button>
  );
}

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function UserMenu() {
  const user = getUser() || { name: "You", email: "" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-full border border-white/10 bg-white/5">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-aqua/80 to-violet/80 shadow-neon-aqua" />
          <span className="hidden sm:inline text-sm">{user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/connect">Upload & Connect</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/doctor">Doctor/Share</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { clearUser(); location.reload(); }}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Topbar() {
  return (
    <div className="glass flex items-center justify-between px-4 sm:px-6 py-3">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search vitals, labs, insights..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-aqua/60"
        />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" className="rounded-full hover:bg-white/10" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button asChild variant="ghost" className="rounded-full hover:bg-white/10" aria-label="Settings">
          <Link to="/settings"><Cog className="h-4 w-4" /></Link>
        </Button>
        <ThemeToggle />
        <div className="ml-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
