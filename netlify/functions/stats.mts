import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";

const TZ = "Asia/Karachi";
const dayKey = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d); // YYYY-MM-DD

// Returns visitor counts when the correct passcode (STATS_PASSCODE env var) is supplied.
export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const expected = Netlify.env.get("STATS_PASSCODE");
  if (!expected) return Response.json({ error: "STATS_PASSCODE is not set for this site." }, { status: 503 });

  let passcode = "";
  try {
    passcode = String((await req.json())?.passcode ?? "");
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const a = Buffer.from(passcode);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const store = getStore({ name: "visitor-stats", consistency: "strong" });
  const stats = ((await store.get("counts", { type: "json" })) as Stats | null) ?? { views: 0, uniques: 0, lastVisit: null };
  const days = stats.days ?? {};

  // Last 30 days, newest first, with zero-visit days filled in (days counted in TZ).
  const now = Date.now();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const date = dayKey(new Date(now - i * 86400000));
    return { date, visits: days[date] ?? 0 };
  });

  return Response.json(
    { views: stats.views, uniques: stats.uniques, lastVisit: stats.lastVisit, today: last30[0].visits, last30 },
    { headers: { "Cache-Control": "no-store" } },
  );
};

type Stats = { views: number; uniques: number; lastVisit: string | null; days?: Record<string, number> };

export const config: Config = { path: "/api/stats" };
