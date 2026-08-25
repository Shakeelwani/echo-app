export function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function countdownLabel(unlockAt: string) {
  const diff = daysBetween(new Date(), new Date(unlockAt));
  if (diff <= 0) return "ready to open";
  if (diff === 1) return "opens tomorrow";
  if (diff < 30) return `opens in ${diff} days`;
  const months = Math.round(diff / 30);
  return `opens in ${months} month${months > 1 ? "s" : ""}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const TYPE_META: Record<
  string,
  { glyph: string; color: string; label: string }
> = {
  todo: { glyph: "✓", color: "#4C6EF5", label: "Future todo" },
  question: { glyph: "?", color: "#F0B860", label: "Future question" },
  prediction: { glyph: "◈", color: "#7C6FF0", label: "Future prediction" },
  promise: { glyph: "◐", color: "#3FBF8F", label: "Future promise" },
  letter: { glyph: "✉", color: "#E0629B", label: "Future letter" },
  goal: { glyph: "★", color: "#4C6EF5", label: "Future goal" },
  freeform: { glyph: "…", color: "#9C9CC4", label: "Freeform message" },
};
