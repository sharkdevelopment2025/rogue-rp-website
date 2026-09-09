import { randomUUID } from "node:crypto";
import { departmentSeed } from "@/data/departments";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { DepartmentRecord } from "@/types";

const KEY = "departments";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function uniqueSlug(desired: string, departments: DepartmentRecord[], excludeId?: string) {
  const base = slugify(desired) || "department";
  let slug = base;
  let n = 2;
  while (departments.some((item) => item.slug === slug && item.id !== excludeId)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function listDepartments(): Promise<DepartmentRecord[]> {
  return storeGet<DepartmentRecord[]>(KEY, departmentSeed);
}

export async function getDepartmentBySlug(slug: string): Promise<DepartmentRecord | null> {
  const departments = await listDepartments();
  return departments.find((department) => department.slug === slug) ?? null;
}

export async function getDepartmentById(id: string): Promise<DepartmentRecord | null> {
  const departments = await listDepartments();
  return departments.find((department) => department.id === id) ?? null;
}

export async function saveDepartment(
  input: Partial<DepartmentRecord> & { name: string },
): Promise<DepartmentRecord> {
  const departments = await listDepartments();
  const existing = input.id ? departments.find((item) => item.id === input.id) : null;
  const name = input.name.trim();
  if (!name) {
    throw new Error("Department name is required.");
  }

  const lead = input.leadership?.[0];
  const department: DepartmentRecord = {
    id: existing?.id ?? `dept-${randomUUID()}`,
    slug: uniqueSlug(input.slug?.trim() || name, departments, existing?.id),
    name,
    shortName: (input.shortName || existing?.shortName || name).trim(),
    tagline: (input.tagline ?? existing?.tagline ?? "").trim(),
    description: (input.description ?? existing?.description ?? "").trim(),
    colour: (input.colour ?? existing?.colour ?? "#22D3EE").trim() || "#22D3EE",
    logo: input.logo || existing?.logo || "/logo.jpg",
    requirements: input.requirements ?? existing?.requirements ?? [],
    leadership: lead
      ? [{ title: lead.title, name: lead.name }, ...(existing?.leadership.slice(1) ?? [])]
      : (existing?.leadership ?? [{ title: "Command", name: "Assigned" }]),
    statistics: input.statistics ??
      existing?.statistics ?? [
        { label: "Application", value: "Required" },
      ],
    applicationType: (input.applicationType ?? existing?.applicationType ?? "Department").trim(),
  };

  const next = existing
    ? departments.map((item) => (item.id === department.id ? department : item))
    : [...departments, department];
  await storeSet(KEY, next);
  return department;
}

export async function deleteDepartment(id: string): Promise<boolean> {
  const departments = await listDepartments();
  const next = departments.filter((item) => item.id !== id);
  if (next.length === departments.length) {
    return false;
  }
  await storeSet(KEY, next);
  return true;
}
