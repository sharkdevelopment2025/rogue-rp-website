import { settingsSeed } from "@/data/settings";
import { publicEnv, resolveDiscordInvite } from "@/lib/env";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { SiteSettings } from "@/types";

const KEY = "settings";

export async function getSettings(): Promise<SiteSettings> {
  const settings = await storeGet<SiteSettings>(KEY, settingsSeed);
  return {
    ...settings,
    discordInvite: resolveDiscordInvite(settings.discordInvite || publicEnv.discordInvite),
  };
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  return storeSet(KEY, settings);
}
