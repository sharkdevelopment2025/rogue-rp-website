import { departmentSeed } from "@/data/departments";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { DepartmentRecord } from "@/types";

const KEY = "departments";

export async function listDepartments(): Promise<DepartmentRecord[]> {
  return storeGet<DepartmentRecord[]>(KEY, departmentSeed);
}

export async function getDepartmentBySlug(slug: string): Promise<DepartmentRecord | null> {
  const departments = await listDepartments();
  return departments.find((department) => department.slug === slug) ?? null;
}

export async function saveDepartment(department: DepartmentRecord): Promise<DepartmentRecord> {
  const departments = await listDepartments();
  const exists = departments.some((item) => item.id === department.id);
  const next = exists
    ? departments.map((item) => (item.id === department.id ? department : item))
    : [...departments, department];
  await storeSet(KEY, next);
  return department;
}
