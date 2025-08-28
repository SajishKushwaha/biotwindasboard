import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ranges = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
export type Range = typeof ranges[number];

export default function Filters({ value, onChange }: { value: Range; onChange: (v: Range) => void }) {
  return (
    <div className="flex items-center gap-2">
      {ranges.map((r) => (
        <Button
          key={r}
          size="sm"
          variant={r === value ? "default" : "ghost"}
          className={cn("rounded-full", r === value ? "bg-gradient-to-r from-aqua/80 to-violet/80 text-background shadow-neon-aqua" : "hover:bg-white/10")}
          onClick={() => onChange(r)}
        >
          {r}
        </Button>
      ))}
    </div>
  );
}
