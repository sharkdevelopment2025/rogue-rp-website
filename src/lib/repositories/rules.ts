import { rulesSeed, rulesUpdatedAt } from "@/data/rules";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { RuleCategory } from "@/types";

const KEY = "rules";
const UPDATED_KEY = "rulesUpdatedAt";

export async function listRules(): Promise<{ categories: RuleCategory[]; updatedAt: string }> {
  const categories = await storeGet<RuleCategory[]>(KEY, rulesSeed);
  const updatedAt = await storeGet<string>(UPDATED_KEY, rulesUpdatedAt);
  return { categories, updatedAt };
}

export async function saveRules(categories: RuleCategory[]): Promise<void> {
  await storeSet(KEY, categories);
  await storeSet(UPDATED_KEY, new Date().toISOString().slice(0, 10));
}
