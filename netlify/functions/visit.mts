import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

// Records a page view. Stores aggregate counts only — no IPs, user agents or other personal data.
const TZ = "Asia/Karachi"; // days are counted in this time zone
const KEEP_DAYS = 30;

const dayKey = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d); // YYYY-MM-DD

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let newVisitor = false;
  try {
    const body = await req.json();
    newVisitor = body?.newVisitor === true;
  } catch {
    // Ignore malformed bodies; still count the view.
  }

  const store = getStore({ name: "visitor-stats", consistency: "strong" });
  const stats = ((await store.get("counts", { type: "json" })) as Stats | null) ?? { views: 0, uniques: 0, lastVisit: null };
  const now = new Date();
  stats.views += 1;
  if (newVisitor) stats.uniques += 1;
  stats.lastVisit = now.toISOString();

  // Per-day view counts, trimmed to the last KEEP_DAYS days.
  const days = stats.days ?? {};
  const today = dayKey(now);
  days[today] = (days[today] ?? 0) + 1;
  const cutoff = dayKey(new Date(now.getTime() - (KEEP_DAYS - 1) * 86400000));
  for (const k of Object.keys(days)) if (k < cutoff) delete days[k];
  stats.days = days;

  await store.setJSON("counts", stats);
  return new Response(null, { status: 204 });
};

type Stats = { views: number; uniques: number; lastVisit: string | null; days?: Record<string, number> };

export const config: Config = { path: "/api/visit" };
