import { mediaSeed } from "@/data/media";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { MediaItem } from "@/types";

const KEY = "media";

export async function listMedia(): Promise<MediaItem[]> {
  const items = await storeGet<MediaItem[]>(KEY, mediaSeed);
  return items.filter((item) => item.published);
}

export async function listAllMedia(): Promise<MediaItem[]> {
  return storeGet<MediaItem[]>(KEY, mediaSeed);
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
  const items = await listAllMedia();
  const exists = items.some((entry) => entry.id === item.id);
  const next = exists
    ? items.map((entry) => (entry.id === item.id ? item : entry))
    : [item, ...items];
  await storeSet(KEY, next);
  return item;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const items = await listAllMedia();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) {
    return false;
  }
  await storeSet(KEY, next);
  return true;
}
