import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cn } from "@/lib/utils";

export default function Layout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-h-screen w-full grid grid-cols-[260px_1fr]", className)}>
      <aside className="h-screen sticky top-0 glass">
        <Sidebar />
      </aside>
      <main className="min-h-screen relative">
        <div className="sticky top-0 z-40">
          <Topbar />
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
