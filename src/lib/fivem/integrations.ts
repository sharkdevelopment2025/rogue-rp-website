/**
 * Future FiveM integrations.
 *
 * These helpers are intentionally empty adapters so the website can later connect to
 * Rogue RP systems without hard-wiring a single framework.
 */

export type FutureSystem =
  | "server"
  | "framework"
  | "mdt"
  | "police"
  | "health"
  | "fire"
  | "economy"
  | "characters";

export async function getFutureSystemStatus(system: FutureSystem): Promise<{
  configured: boolean;
  message: string;
}> {
  return {
    configured: false,
    message: `The Rogue RP ${system} system is not connected to the website yet.`,
  };
}
