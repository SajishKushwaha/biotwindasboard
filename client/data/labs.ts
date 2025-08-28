import { Range } from "@/components/dashboard/Filters";

export type LabPoint = { name: string; glucose: number; a1c?: number; ldl?: number; hdl?: number; tg?: number; crp?: number };

export const overview = {
  a1c: 5.4, // %
  fastingGlucose: 92, // mg/dL
  ldl: 98, // mg/dL
  hdl: 58, // mg/dL
  triglycerides: 110, // mg/dL
  crp: 1.1, // mg/L
  vitaminD: 38, // ng/mL
};

const daily: LabPoint[] = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`,
  glucose: 85 + Math.round(Math.sin(i / 2) * 10) + (i === 13 ? 25 : 0),
}));

const weekly: LabPoint[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  name: d,
  glucose: 90 + Math.round(Math.sin(i / 2) * 5),
}));

const monthly: LabPoint[] = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  glucose: 92 + Math.round(Math.sin(i / 5) * 6),
}));

const yearly: LabPoint[] = Array.from({ length: 12 }, (_, i) => ({
  name: `${i + 1}`,
  glucose: 92 + Math.round(Math.sin(i / 3) * 4),
  a1c: Number((5.2 + Math.sin(i / 6) * 0.2).toFixed(1)),
  ldl: 95 + Math.round(Math.sin(i / 5) * 10),
  hdl: 56 + Math.round(Math.sin(i / 4) * 4),
  tg: 115 + Math.round(Math.sin(i / 3) * 15),
  crp: Number((1.2 + Math.sin(i / 7) * 0.3).toFixed(2)),
}));

export const glucoseSeries: Record<Range, LabPoint[]> = {
  Daily: daily,
  Weekly: weekly,
  Monthly: monthly,
  Yearly: yearly,
};

export const lipidsYearly = yearly.map((p) => ({ name: p.name, ldl: p.ldl!, hdl: p.hdl!, tg: p.tg! }));

export type LabRow = { date: string; test: string; value: string; unit: string; ref: string; flag?: "H" | "L" };

export const recentLabs: LabRow[] = [
  { date: "2025-02-10", test: "HbA1c", value: `${overview.a1c}`, unit: "%", ref: "< 5.7" },
  { date: "2025-02-10", test: "Fasting Glucose", value: `${overview.fastingGlucose}`, unit: "mg/dL", ref: "70–99" },
  { date: "2025-02-10", test: "LDL-C", value: `${overview.ldl}`, unit: "mg/dL", ref: "< 100" },
  { date: "2025-02-10", test: "HDL-C", value: `${overview.hdl}`, unit: "mg/dL", ref: "> 50" },
  { date: "2025-02-10", test: "Triglycerides", value: `${overview.triglycerides}`, unit: "mg/dL", ref: "< 150" },
  { date: "2025-02-10", test: "CRP (hs)", value: `${overview.crp}`, unit: "mg/L", ref: "< 3" },
  { date: "2025-02-10", test: "Vitamin D", value: `${overview.vitaminD}`, unit: "ng/mL", ref: "30–60" },
];
