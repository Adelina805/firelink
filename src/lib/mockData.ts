import type { CommunityDashboardData } from "./types";

/** Demo dataset for ZIP 92104 — no PII */
export const mockCommunity92104: CommunityDashboardData = {
  zip: "92104",
  stats: {
    registeredHouseholds: 18,
    pets: 11,
    transportationNeeds: 6,
    medicalPowerNeeds: 4,
    markedSafe: 8,
    requestedHelp: 3,
    volunteers: 5,
    averagePreparedness: 62,
  },
  households: [
    {
      anonymous_id: "A7F2",
      zip_code: "92104",
      has_pets: true,
      has_transport: false,
      medical_needs: false,
      can_volunteer: false,
      status: "Needs ride",
      prep_score: 40,
    },
    {
      anonymous_id: "C19B",
      zip_code: "92104",
      has_pets: false,
      has_transport: true,
      medical_needs: false,
      can_volunteer: true,
      status: "Safe",
      prep_score: 80,
    },
    {
      anonymous_id: "B92K",
      zip_code: "92104",
      has_pets: true,
      has_transport: true,
      medical_needs: false,
      can_volunteer: false,
      status: "Preparing",
      prep_score: 55,
    },
    {
      anonymous_id: "E51M",
      zip_code: "92104",
      has_pets: true,
      has_transport: false,
      medical_needs: false,
      can_volunteer: false,
      status: "Shelter info",
      prep_score: 35,
    },
    {
      anonymous_id: "D33Q",
      zip_code: "92104",
      has_pets: false,
      has_transport: false,
      medical_needs: true,
      can_volunteer: false,
      status: "Medical device power support",
      prep_score: 50,
    },
  ],
  needs: [
    { label: "Evacuation rides", count: 3 },
    { label: "Pet transport", count: 2 },
    { label: "Medical device power support", count: 1 },
    { label: "Shelter info", count: 5 },
    { label: "Marked safe", count: 8 },
  ],
  events: [
    {
      id: "e1",
      message:
        "Household A7F2 requested evacuation transport",
      timestamp: "2026-05-09T18:02:00.000Z",
    },
    {
      id: "e2",
      message: "Household C19B marked safe",
      timestamp: "2026-05-09T17:45:00.000Z",
    },
    {
      id: "e3",
      message: "Household B92K completed go-bag task",
      timestamp: "2026-05-09T17:20:00.000Z",
    },
    {
      id: "e4",
      message: "Household E51M asked for pet shelter info",
      timestamp: "2026-05-09T16:55:00.000Z",
    },
    {
      id: "e5",
      message: "Household D33Q requested medical device power support",
      timestamp: "2026-05-09T16:30:00.000Z",
    },
  ],
  resources: [
    {
      id: "r1",
      title: "County emergency hotline",
      description: "Official evacuation orders and shelter openings.",
      detail: "Call your county OES number or 2-1-1 for verified shelter locations.",
    },
    {
      id: "r2",
      title: "Pet-friendly shelter lookup",
      description: "Aggregate shelter capacity by ZIP — no personal data required.",
      detail: "Check Red Cross / county animal services for co-sheltering options.",
    },
    {
      id: "r3",
      title: "Community transport coordination",
      description: "Volunteers matched at neighborhood level only.",
      detail: "Sign up via SMS; dashboard shows counts, not rider identities.",
    },
    {
      id: "r4",
      title: "Go-bag checklist (SMS)",
      description: "Text PREP for a short checklist; reply DONE with task numbers.",
      detail: "Progress updates community preparedness scores anonymously.",
    },
  ],
};

export const mockCommunitiesByZip: Record<string, CommunityDashboardData> = {
  "92104": mockCommunity92104,
};
