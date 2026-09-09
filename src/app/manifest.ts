import type { MetadataRoute } from "next";
import { brand } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} — Serious Roleplay`,
    short_name: brand.shortName,
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05070b",
    theme_color: "#00a3ff",
    icons: [
      { src: "/icons/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/icons/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
