import { Range } from "@/components/dashboard/Filters";

export type VitalReading = {
  time: string; // ISO or label
  hr: number; // bpm
  spo2: number; // %
  bpSys: number; // mmHg
  bpDia: number; // mmHg
  rr: number; // breaths per minute
  temp: number; // °C
  hrv: number; // ms
};

export const latest = {
  hr: 72,
  spo2: 98,
  bpSys: 118,
  bpDia: 76,
  rr: 16,
  temp: 36.7,
  hrv: 64,
};

function genDay(): VitalReading[] {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    hr: 65 + Math.round(Math.sin(i / 2) * 6) + (i > 17 && i < 19 ? 10 : 0),
    spo2: 96 + (i % 6 === 0 ? -1 : 2),
    bpSys: 112 + Math.round(Math.sin(i / 3) * 6),
    bpDia: 72 + Math.round(Math.sin(i / 3) * 4),
    rr: 14 + (i % 5 === 0 ? 2 : 0),
    temp: Number((36.6 + Math.sin(i / 8) * 0.2).toFixed(1)),
    hrv: 60 + (i % 4 === 0 ? 6 : -2),
  }));
}

function genWeek(): VitalReading[] {
  return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
    time: d,
    hr: 70 + Math.round(Math.sin(i / 2) * 3),
    spo2: 97 + (i % 2),
    bpSys: 116 + Math.round(Math.sin(i / 3) * 4),
    bpDia: 75 + Math.round(Math.sin(i / 3) * 3),
    rr: 15 + (i % 3 === 0 ? 1 : 0),
    temp: Number((36.7 + Math.sin(i / 4) * 0.1).toFixed(1)),
    hrv: 62 + (i % 2 ? 3 : -1),
  }));
}

function genMonth(): VitalReading[] {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i + 1}`,
    hr: 70 + Math.round(Math.sin(i / 4) * 2),
    spo2: 97 + (i % 7 === 0 ? -1 : 0),
    bpSys: 118 + Math.round(Math.sin(i / 6) * 3),
    bpDia: 76 + Math.round(Math.sin(i / 6) * 2),
    rr: 15 + (i % 10 === 0 ? 2 : 0),
    temp: Number((36.7 + Math.sin(i / 10) * 0.1).toFixed(1)),
    hrv: 63 + (i % 5 === 0 ? 5 : 0),
  }));
}

function genYear(): VitalReading[] {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}`,
    hr: 71 + Math.round(Math.sin(i / 2) * 1),
    spo2: 97 + (i % 3 === 0 ? 1 : 0),
    bpSys: 118 + Math.round(Math.sin(i / 4) * 2),
    bpDia: 76 + Math.round(Math.sin(i / 4) * 2),
    rr: 15,
    temp: Number((36.7 + Math.sin(i / 5) * 0.1).toFixed(1)),
    hrv: 64,
  }));
}

export const vitalsSeries: Record<Range, VitalReading[]> = {
  Daily: genDay(),
  Weekly: genWeek(),
  Monthly: genMonth(),
  Yearly: genYear(),
};

export const ecgPoints: number[] = [0,2,4,6,8,7,6,5,4,5,6,5,4,3,2,1,0,0,0,8,22,0,0,0,2,3,2,1,0,-1,-2,-3,-4,-3,-2,-1,0,0,0,0];
