import type { MediaItem } from "@/types";

export const mediaSeed: MediaItem[] = [
  {
    id: "media-emblem",
    title: "Rogue RP emblem",
    kind: "community",
    src: "/logo.jpg",
    published: true,
  },
  {
    id: "media-city-night",
    title: "City night circuit",
    kind: "screenshot",
    src: "/backgrounds/city-night.svg",
    published: true,
  },
  {
    id: "media-briefing",
    title: "Command briefing backdrop",
    kind: "event",
    src: "/backgrounds/briefing.svg",
    published: true,
  },
  {
    id: "media-trailer-slot",
    title: "Official trailer",
    kind: "trailer",
    src: "/backgrounds/trailer.svg",
    href: "",
    published: true,
  },
];
