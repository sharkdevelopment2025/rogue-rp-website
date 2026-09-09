import type { NewsArticle } from "@/types";

export const newsSeed: NewsArticle[] = [
  {
    id: "news-launch",
    slug: "rogue-rp-opens-its-city",
    title: "Rogue RP opens its city",
    description:
      "A serious British roleplay community built for players who want consequence, character and a city that remembers them.",
    content: `Rogue RP is now open as a serious FiveM roleplay community.

This is not a server for chaos tourists. The city is built for players who want civilian lives, emergency services, crime with consequence, and stories that last longer than a single night.

Whitelist applications are open. Read the rules, join Discord, and bring a character who can exist in a living city.`,
    category: "Announcement",
    tags: ["launch", "whitelist", "community"],
    author: "Rogue RP Management",
    featuredImage: "/logo.jpg",
    published: true,
    scheduledFor: null,
    publishedAt: "2026-09-01T18:00:00.000Z",
    updatedAt: "2026-09-01T18:00:00.000Z",
  },
  {
    id: "news-emergency",
    slug: "emergency-services-applications",
    title: "Emergency services applications",
    description:
      "Police, Health and Fire are taking structured applications from whitelisted players.",
    content: `The Rogue Police Service, Rogue Health Service and Rogue Fire & Rescue are now listed on the website.

Department applications are handled through the Rogue RP applications system. Get whitelisted first. Departments are not a shortcut around the community standard.

Each department publishes its own requirements, leadership contacts and expectations on the Departments page.`,
    category: "Department Update",
    tags: ["police", "health", "fire"],
    author: "Department Command",
    featuredImage: "/logo.jpg",
    published: true,
    scheduledFor: null,
    publishedAt: "2026-09-04T16:00:00.000Z",
    updatedAt: "2026-09-04T16:00:00.000Z",
  },
  {
    id: "news-framework",
    slug: "city-framework-development",
    title: "City framework development continues",
    description:
      "Vehicles, economy, departments and character systems are being built as a Rogue RP stack — not a throwaway framework clone.",
    content: `Development on the Rogue RP city continues.

The website is deliberately not hard-wired to a single FiveM framework. Police, health, fire, economy and character systems will connect through stable APIs as those resources mature.

If you are a developer interested in contributing, use the Contact page and choose Development Enquiry.`,
    category: "Development Update",
    tags: ["development", "framework"],
    author: "Development",
    featuredImage: "/logo.jpg",
    published: true,
    scheduledFor: null,
    publishedAt: "2026-09-06T12:00:00.000Z",
    updatedAt: "2026-09-06T12:00:00.000Z",
  },
  {
    id: "news-community-night",
    slug: "community-briefing-nights",
    title: "Community briefing nights",
    description:
      "Regular briefings for whitelisted players covering standards, upcoming city changes and department notices.",
    content: `Rogue RP will run community briefing nights for whitelisted players.

These are not hype streams. They are short, useful briefings: rule clarifications, city changes, department notices and a chance to ask staff questions in the right room.

Dates will be posted on Discord and in News when confirmed.`,
    category: "Event",
    tags: ["community", "briefing"],
    author: "Community Team",
    featuredImage: "/logo.jpg",
    published: true,
    scheduledFor: null,
    publishedAt: "2026-09-08T19:00:00.000Z",
    updatedAt: "2026-09-08T19:00:00.000Z",
  },
];
