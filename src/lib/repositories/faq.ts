import { faqSeed } from "@/data/faq";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { FaqCategory } from "@/types";

const KEY = "faq";

export async function listFaq(): Promise<FaqCategory[]> {
  return storeGet<FaqCategory[]>(KEY, faqSeed);
}

export async function saveFaq(categories: FaqCategory[]): Promise<void> {
  await storeSet(KEY, categories);
}
