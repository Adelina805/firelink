import type { AnonymousHousehold } from "./types";

export type CommunityFilterId =
  | "all"
  | "urgent"
  | "needs-ride"
  | "medical"
  | "shelter"
  | "safe"
  | "can-help";

export type CommunitySortId = "urgency" | "prep-asc" | "prep-desc";

const STATUS = {
  needsRide: "Needs ride",
  medical: "Medical device power support",
  shelter: "Shelter info",
  safe: "Safe",
  preparing: "Preparing",
  requestedHelp: "Requested help",
} as const;

/** Lower = more urgent (sort ascending for “needs first”). */
export function householdUrgencyRank(h: AnonymousHousehold): number {
  switch (h.status) {
    case STATUS.needsRide:
    case STATUS.requestedHelp:
      return 0;
    case STATUS.medical:
      return 1;
    case STATUS.shelter:
      return 2;
    case STATUS.preparing:
      return 3;
    case STATUS.safe:
      return 4;
    default:
      return 5;
  }
}

export function householdMatchesFilter(
  h: AnonymousHousehold,
  filter: CommunityFilterId,
): boolean {
  if (filter === "all") return true;
  if (filter === "needs-ride") return h.status === STATUS.needsRide;
  if (filter === "medical") return h.status === STATUS.medical;
  if (filter === "shelter") return h.status === STATUS.shelter;
  if (filter === "safe") return h.status === STATUS.safe;
  if (filter === "can-help") return h.can_volunteer;
  if (filter === "urgent") {
    return (
      h.status === STATUS.needsRide ||
      h.status === STATUS.medical ||
      h.status === STATUS.shelter ||
      h.status === STATUS.requestedHelp
    );
  }
  return true;
}

export function filterHouseholds(
  households: AnonymousHousehold[],
  filter: CommunityFilterId,
): AnonymousHousehold[] {
  return households.filter((h) => householdMatchesFilter(h, filter));
}

export function sortHouseholds(
  list: AnonymousHousehold[],
  sort: CommunitySortId,
): AnonymousHousehold[] {
  const copy = [...list];
  if (sort === "prep-asc") {
    copy.sort((a, b) => a.prep_score - b.prep_score);
    return copy;
  }
  if (sort === "prep-desc") {
    copy.sort((a, b) => b.prep_score - a.prep_score);
    return copy;
  }
  copy.sort((a, b) => {
    const ra = householdUrgencyRank(a);
    const rb = householdUrgencyRank(b);
    if (ra !== rb) return ra - rb;
    return a.prep_score - b.prep_score;
  });
  return copy;
}
