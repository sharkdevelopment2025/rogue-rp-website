import type { SiteSettings } from "@/types";
import { brand } from "@/lib/config";
import { publicEnv } from "@/lib/env";

export const settingsSeed: SiteSettings = {
  discordInvite: publicEnv.discordInvite,
  serverDisplayName: brand.name,
  maxPlayers: 64,
  maintenanceMessage: "",
};
