import { mockCommunitiesByZip } from "./mockData";
import type { CommunityDashboardData } from "./types";

/**
 * Central data fetch for the dashboard.
 * Today: reads from mock data. Later: replace with API (no PII in response).
 *
 * Example future implementation:
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${zip}`, {
 *     next: { revalidate: 10 },
 *   });
 *   if (!res.ok) return null;
 *   return (await res.json()) as CommunityDashboardData;
 */
export async function getCommunityData(
  zip: string,
): Promise<CommunityDashboardData | null> {
  const normalized = zip.trim();
  // Async boundary matches real network calls
  await Promise.resolve();
  return mockCommunitiesByZip[normalized] ?? null;
}
