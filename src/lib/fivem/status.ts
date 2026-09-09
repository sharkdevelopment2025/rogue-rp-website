import { getFiveMConnectUrl, getServerEnv, isFiveMConfigured } from "@/lib/env";
import { getSettings } from "@/lib/repositories/settings";
import type { FiveMServerStatus } from "@/types";

interface CacheEntry {
  expires: number;
  value: FiveMServerStatus;
}

let cache: CacheEntry | null = null;

interface DynamicStatus {
  clients?: number;
  hostname?: string;
  sv_maxclients?: string;
}

async function fetchJson(url: string): Promise<unknown | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "RogueRP-Website/1.0",
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function getServerStatus(): Promise<FiveMServerStatus> {
  if (cache && cache.expires > Date.now()) {
    return cache.value;
  }

  const settings = await getSettings();
  const env = getServerEnv();
  const maxFallback = env.fivemMaxPlayers || settings.maxPlayers || 64;
  const lastChecked = new Date().toISOString();
  const joinUrl = getFiveMConnectUrl();

  if (!isFiveMConfigured()) {
    const value: FiveMServerStatus = {
      health: "unconfigured",
      name: settings.serverDisplayName,
      players: 0,
      maxPlayers: maxFallback,
      uptimeLabel: "Not reported",
      statusLabel: "Awaiting configuration",
      lastChecked,
      connectUrl: joinUrl,
      message: "Server status appears once FiveM endpoints are configured.",
    };
    cache = { expires: Date.now() + 15_000, value };
    return value;
  }

  const base = `http://${env.fivemServerIp}:${env.fivemServerPort}`;
  const [players, dynamic] = await Promise.all([
    fetchJson(`${base}/players.json`),
    fetchJson(`${base}/dynamic.json`),
  ]);

  const dynamicStatus =
    dynamic && typeof dynamic === "object" ? (dynamic as DynamicStatus) : null;
  const playerList = Array.isArray(players) ? players : null;
  const online = playerList !== null || typeof dynamicStatus?.clients === "number";

  if (!online) {
    const value: FiveMServerStatus = {
      health: "offline",
      name: settings.serverDisplayName,
      players: 0,
      maxPlayers: maxFallback,
      uptimeLabel: "Unavailable",
      statusLabel: "Offline",
      lastChecked,
      connectUrl: joinUrl,
      message: "Rogue RP is currently unavailable.",
    };
    cache = { expires: Date.now() + 10_000, value };
    return value;
  }

  const reportedMax = Number(dynamicStatus?.sv_maxclients || maxFallback);

  const value: FiveMServerStatus = {
    health: "online",
    name: dynamicStatus?.hostname || settings.serverDisplayName,
    players: playerList ? playerList.length : Number(dynamicStatus?.clients || 0),
    maxPlayers: Number.isFinite(reportedMax) ? reportedMax : maxFallback,
    uptimeLabel: "Live",
    statusLabel: "Operational",
    lastChecked,
    connectUrl: joinUrl,
    message: "Rogue RP is online.",
  };

  cache = { expires: Date.now() + 15_000, value };
  return value;
}

export async function getPlayerCount(): Promise<{
  players: number;
  maxPlayers: number;
  health: FiveMServerStatus["health"];
}> {
  const status = await getServerStatus();
  return {
    players: status.players,
    maxPlayers: status.maxPlayers,
    health: status.health,
  };
}
