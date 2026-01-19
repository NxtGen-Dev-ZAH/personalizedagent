export type DashboardMock = {
  userName: string;
  focus: string;
  metrics: Array<{
    label: string;
    value: string;
    delta?: string;
    trend?: "up" | "down" | "steady";
  }>;
  goals: Array<{
    id: string;
    title: string;
    status: "planned" | "in_progress" | "completed" | "paused";
    progress: number;
  }>;
  planner: Array<{
    time: string;
    label: string;
    status: "complete" | "current" | "upcoming";
  }>;
  reflection: {
    mood: string;
    insight: string;
    action: string;
  };
};

export const dashboardMock: DashboardMock = {
  userName: "Zaheer",
  focus: "Ship Momentum Sprint Alpha",
  metrics: [
    { label: "Focus Score", value: "92", delta: "+8%", trend: "up" },
    { label: "Energy", value: "78", delta: "stable", trend: "steady" },
    { label: "Deep Work", value: "3h 40m", delta: "+32m", trend: "up" },
    { label: "Fulfillment", value: "84", delta: "-2", trend: "down" },
  ],
  goals: [
    { id: "1", title: "Phase 1 Backend Scaffold", status: "in_progress", progress: 68 },
    { id: "2", title: "Agent Planner Kickoff", status: "planned", progress: 25 },
    { id: "3", title: "Motivation Pulses", status: "planned", progress: 10 },
  ],
  planner: [
    { time: "06:30", label: "Prime Intentions + Mobility", status: "complete" },
    { time: "08:00", label: "Backend Modularization", status: "current" },
    { time: "11:30", label: "AI Sync — Planner ↔ Motivation", status: "upcoming" },
    { time: "14:00", label: "Focus Block — Dashboard UI", status: "upcoming" },
  ],
  reflection: {
    mood: "Charged + Clear",
    insight:
      "Goals momentum increases when planner + motivation pulses align. Today's priority is to anchor LangGraph seams before UI polish.",
    action: "After lunch, record a 3min Loom to capture architecture rationale.",
  },
};




