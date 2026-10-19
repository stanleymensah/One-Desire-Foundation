export const pad = (n: number) => String(n).padStart(2, "0");

export const keyOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function formatTime(d: Date) {
  const h = d.getHours();
  return `${h % 12 || 12}:${pad(d.getMinutes())}${h >= 12 ? "pm" : "am"}`;
}

export function buildMonthGrid(year: number, month: number): Date[] {
  const offset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const total = Math.ceil((offset + daysInMonth) / 7) * 7;
  return Array.from(
    { length: total },
    (_, i) => new Date(year, month, 1 - offset + i),
  );
}