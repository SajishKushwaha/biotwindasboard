import { Range } from "@/components/dashboard/Filters";

export const summary = {
  healthScore: 83,
  heartRate: 72,
  spo2: 98,
  glucose: 94,
  sleepHours: 7.0,
  sleepAvg: 7.3,
  stress: 22,
};

export type Point = { name: string; hr: number; glucose: number; sleep: number };

const weekly: Point[] = [
  { name: "Mon", hr: 70, glucose: 96, sleep: 7.4 },
  { name: "Tue", hr: 72, glucose: 94, sleep: 7.0 },
  { name: "Wed", hr: 71, glucose: 92, sleep: 6.8 },
  { name: "Thu", hr: 73, glucose: 97, sleep: 7.6 },
  { name: "Fri", hr: 74, glucose: 99, sleep: 6.9 },
  { name: "Sat", hr: 69, glucose: 93, sleep: 7.8 },
  { name: "Sun", hr: 68, glucose: 90, sleep: 7.2 },
];

const daily: Point[] = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`,
  hr: [68,70,69,72,71,70,68,66,65,72,74,73,70,69,68,72,74,76,78,75,73,70,69,68][i],
  glucose: [92,93,94,95,96,97,98,96,95,94,92,90,94,96,98,97,96,95,93,92,91,92,93,94][i],
  sleep: 0,
}));

const monthly: Point[] = Array.from({ length: 30 }, (_, i) => ({
  name: `${i+1}`,
  hr: 70 + Math.round(Math.sin(i/4)*3),
  glucose: 94 + Math.round(Math.sin(i/5)*4),
  sleep: Number((7 + Math.sin(i/6)*0.4).toFixed(2)),
}));

const yearly: Point[] = Array.from({ length: 12 }, (_, i) => ({
  name: `${i+1}`,
  hr: 71 + Math.round(Math.sin(i/2)*2),
  glucose: 95 + Math.round(Math.sin(i/3)*3),
  sleep: Number((7 + Math.sin(i/4)*0.2).toFixed(2)),
}));

export const timeSeries: Record<Range, Point[]> = {
  Daily: daily,
  Weekly: weekly,
  Monthly: monthly,
  Yearly: yearly,
};

export const riskForecast = [
  { year: "1y", risk: 22 },
  { year: "2y", risk: 19 },
  { year: "3y", risk: 17 },
  { year: "4y", risk: 15 },
  { year: "5y", risk: 13 },
];

export const organs = [
  { name: "Heart", value: 92 },
  { name: "Liver", value: 88 },
  { name: "Brain", value: 85 },
  { name: "Lungs", value: 90 },
];

export const lifestyle = {
  caloriesIn: 1980,
  caloriesOut: 2420,
  steps: 8432,
  recovery: 82,
  hrv: 64,
};
