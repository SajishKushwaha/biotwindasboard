import { Range } from "@/components/dashboard/Filters";

export const overview = {
  caloriesIn: 1980,
  caloriesOut: 2420,
  steps: 8432,
  sleepLast: 7.0,
  sleepAvg: 7.3,
  recovery: 82,
  hrv: 64,
  activeMinutes: 62,
  workoutsThisWeek: 3,
};

export type LifestylePoint = { name: string; steps: number; caloriesIn: number; caloriesOut: number; sleep: number; recovery: number };

const weekly: LifestylePoint[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  name: d,
  steps: 7000 + (i === 5 ? 9500 : 1000 * i),
  caloriesIn: 1900 + (i % 3) * 80,
  caloriesOut: 2300 + 40 * i + (i === 5 ? 200 : 0),
  sleep: 6.8 + (i % 2 ? 0.4 : -0.1),
  recovery: 78 + (i % 2 ? 4 : -2),
}));

const daily: LifestylePoint[] = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`,
  steps: (i > 7 && i < 20 ? Math.round(Math.random() * 400) : 0),
  caloriesIn: i === 9 || i === 13 || i === 19 ? 650 : 50,
  caloriesOut: i > 6 && i < 22 ? 90 + (i === 18 ? 160 : 0) : 40,
  sleep: 0,
  recovery: 0,
}));

const monthly: LifestylePoint[] = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  steps: 7000 + Math.round(Math.sin(i / 4) * 1500),
  caloriesIn: 2000 + Math.round(Math.sin(i / 5) * 120),
  caloriesOut: 2350 + Math.round(Math.sin(i / 5) * 140),
  sleep: Number((7 + Math.sin(i / 6) * 0.4).toFixed(2)),
  recovery: 80 + Math.round(Math.sin(i / 6) * 6),
}));

const yearly: LifestylePoint[] = Array.from({ length: 12 }, (_, i) => ({
  name: `${i + 1}`,
  steps: 8500 + Math.round(Math.sin(i / 2) * 1200),
  caloriesIn: 2000 + Math.round(Math.sin(i / 3) * 80),
  caloriesOut: 2400 + Math.round(Math.sin(i / 3) * 100),
  sleep: Number((7 + Math.sin(i / 4) * 0.2).toFixed(2)),
  recovery: 82 + Math.round(Math.sin(i / 4) * 4),
}));

export const lifestyleSeries: Record<Range, LifestylePoint[]> = {
  Daily: daily,
  Weekly: weekly,
  Monthly: monthly,
  Yearly: yearly,
};

export const activityGoals = {
  move: { current: 2420, goal: 2600 },
  exercise: { current: 120, goal: 150 },
  stand: { current: 12, goal: 14 },
};

export const habits = [
  { name: "Hydration", percent: 78 },
  { name: "Sleep schedule", percent: 84 },
  { name: "Meditation", percent: 56 },
  { name: "Protein target", percent: 71 },
  { name: "No sugar", percent: 62 },
];
