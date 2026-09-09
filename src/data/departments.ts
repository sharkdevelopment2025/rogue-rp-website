import type { DepartmentRecord } from "@/types";

export const departmentSeed: DepartmentRecord[] = [
  {
    id: "rps",
    slug: "rogue-police-service",
    name: "Rogue Police Service",
    shortName: "RPS",
    tagline: "Protect. Serve. Respond.",
    description:
      "Join the Rogue Police Service and become part of one of Rogue RP's core emergency services. Officers are expected to investigate, patrol and hold the line with professionalism, not theatrics.",
    colour: "#3B82F6",
    logo: "/departments/police.svg",
    requirements: [
      "Whitelist approved",
      "Clear understanding of police roleplay standards",
      "Willingness to attend training and briefings",
      "Calm communication under pressure",
    ],
    leadership: [
      { title: "Chief Officer", name: "Assigned in-game and on Discord" },
      { title: "Senior Command", name: "Published after appointment" },
    ],
    statistics: [
      { label: "Branch", value: "Emergency Services" },
      { label: "Application", value: "Required" },
      { label: "Training", value: "Mandatory" },
    ],
    applicationType: "Police",
  },
  {
    id: "rhs",
    slug: "rogue-health-service",
    name: "Rogue Health Service",
    shortName: "RHS",
    tagline: "Treat. Stabilise. Care.",
    description:
      "The Rogue Health Service handles emergency medicine, hospital care and scene response. Medics are expected to treat roleplay as clinical, considered and human — never as a scoreboard.",
    colour: "#E11D48",
    logo: "/departments/health.svg",
    requirements: [
      "Whitelist approved",
      "Professional medical roleplay standard",
      "Ability to work with police and fire on scene",
      "Respect for patient confidentiality in character",
    ],
    leadership: [
      { title: "Medical Director", name: "Assigned in-game and on Discord" },
      { title: "Clinical Leads", name: "Published after appointment" },
    ],
    statistics: [
      { label: "Branch", value: "Emergency Services" },
      { label: "Application", value: "Required" },
      { label: "Training", value: "Mandatory" },
    ],
    applicationType: "Health",
  },
  {
    id: "rfr",
    slug: "rogue-fire-rescue",
    name: "Rogue Fire & Rescue",
    shortName: "RFR",
    tagline: "Control. Rescue. Recover.",
    description:
      "Rogue Fire & Rescue covers fires, extrication, hazardous scenes and specialist rescue. The department exists for people who want structured, high-discipline emergency roleplay.",
    colour: "#F97316",
    logo: "/departments/fire.svg",
    requirements: [
      "Whitelist approved",
      "Team-first scene discipline",
      "Willingness to learn procedures and radio use",
      "Reliable attendance for callouts and training",
    ],
    leadership: [
      { title: "Chief Fire Officer", name: "Assigned in-game and on Discord" },
      { title: "Station Command", name: "Published after appointment" },
    ],
    statistics: [
      { label: "Branch", value: "Emergency Services" },
      { label: "Application", value: "Required" },
      { label: "Training", value: "Mandatory" },
    ],
    applicationType: "Fire",
  },
  {
    id: "civilian",
    slug: "civilian-operations",
    name: "Civilian Operations",
    shortName: "Civilians",
    tagline: "Live. Work. Choose.",
    description:
      "Civilian Operations is the backbone of Rogue RP: businesses, public services, legal work, crime, and ordinary lives that make the city feel occupied. Not every story needs a uniform.",
    colour: "#22D3EE",
    logo: "/departments/civilian.svg",
    requirements: [
      "Whitelist approved",
      "A character with a clear place in the city",
      "Respect for other players' scenes",
      "Willingness to follow the server economy and law",
    ],
    leadership: [
      { title: "Civilian Liaison", name: "Community staff" },
      { title: "Business Desk", name: "Available through Discord" },
    ],
    statistics: [
      { label: "Branch", value: "City Life" },
      { label: "Application", value: "Whitelist only" },
      { label: "Focus", value: "Player-driven" },
    ],
    applicationType: "Civilian",
  },
];
