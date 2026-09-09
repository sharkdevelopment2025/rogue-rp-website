import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function savePublicUpload(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Images must be 4MB or smaller.");
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    throw new Error("Use a JPG, PNG, WEBP or GIF image.");
  }

  const filename = `${randomUUID()}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${filename}`;
}
