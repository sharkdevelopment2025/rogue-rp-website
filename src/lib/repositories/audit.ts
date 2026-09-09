import { randomUUID } from "node:crypto";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { AuditLogEntry } from "@/types";

const KEY = "audit";

export async function listAuditLogs(): Promise<AuditLogEntry[]> {
  const logs = await storeGet<AuditLogEntry[]>(KEY, []);
  return logs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function writeAuditLog(
  entry: Omit<AuditLogEntry, "id" | "createdAt">,
): Promise<AuditLogEntry> {
  const logs = await storeGet<AuditLogEntry[]>(KEY, []);
  const record: AuditLogEntry = {
    ...entry,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await storeSet(KEY, [record, ...logs].slice(0, 500));
  return record;
}
