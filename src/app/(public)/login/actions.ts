"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createStaffKeyUser, staffCredentialsMatch } from "@/lib/auth/staff-access";
import { setSessionCookie } from "@/lib/auth/session";
import { isStaffAccessConfigured } from "@/lib/env";
import { rateLimit } from "@/lib/server/rate-limit";
import { isSafeRelativePath } from "@/lib/utils";

function destinationFrom(value: FormDataEntryValue | null) {
  const next = String(value || "");
  if (!isSafeRelativePath(next)) {
    return "/admin";
  }
  return next.startsWith("/admin") ? next : "/admin";
}

function fail(destination: string, code: string): never {
  redirect(`/login?next=${encodeURIComponent(destination)}&error=${code}`);
}

export async function staffLogin(formData: FormData) {
  const destination = destinationFrom(formData.get("next"));
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`staff-login:${ip}`, 5, 15 * 60_000)) {
    fail(destination, "staff-rate");
  }

  if (!isStaffAccessConfigured()) {
    fail(destination, "staff-off");
  }

  const matched = await staffCredentialsMatch(
    String(formData.get("username") || ""),
    String(formData.get("password") || ""),
  );
  if (!matched) {
    fail(destination, "staff-invalid");
  }

  await setSessionCookie(createStaffKeyUser());
  redirect(destination);
}
