import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type StoreShape = Record<string, unknown>;

const globalStore = globalThis as typeof globalThis & {
  __rogueStore?: StoreShape;
};

function memory(): StoreShape {
  if (!globalStore.__rogueStore) {
    globalStore.__rogueStore = {};
  }
  return globalStore.__rogueStore;
}

function canUseFileStore(): boolean {
  return !process.env.VERCEL && process.env.NODE_ENV !== "test";
}

function filePath(): string {
  return path.join(process.cwd(), ".data", "store.json");
}

async function readFileStore(): Promise<StoreShape> {
  if (!canUseFileStore()) {
    return memory();
  }

  try {
    const raw = await readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    Object.assign(memory(), parsed);
    return memory();
  } catch {
    return memory();
  }
}

async function writeFileStore(): Promise<void> {
  if (!canUseFileStore()) {
    return;
  }

  try {
    await mkdir(path.dirname(filePath()), { recursive: true });
    await writeFile(filePath(), JSON.stringify(memory(), null, 2), "utf8");
  } catch {
    // File persistence is a local convenience only.
  }
}

export async function storeGet<T>(key: string, seed: T): Promise<T> {
  const data = await readFileStore();
  if (data[key] === undefined) {
    data[key] = structuredClone(seed);
  }
  return structuredClone(data[key]) as T;
}

export async function storeSet<T>(key: string, value: T): Promise<T> {
  const data = await readFileStore();
  data[key] = structuredClone(value);
  await writeFileStore();
  return structuredClone(value);
}

export function isPersistentStore(): boolean {
  return canUseFileStore();
}
