import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthError, requireAnyStaff } from "@/lib/auth/guards";
import { AdminShell } from "@/components/admin/AdminShell";
import { ErrorState } from "@/components/ui/ErrorState";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let staff: Awaited<ReturnType<typeof requireAnyStaff>> | null = null;
  let denied = false;

  try {
    staff = await requireAnyStaff();
  } catch (error) {
    if (error instanceof AuthError && error.code === "unauthenticated") {
      redirect("/login?next=/admin");
    }
    denied = true;
  }

  if (denied || !staff) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <ErrorState
          title="Staff only"
          message="You do not have access to staff systems. Sign in from Login with a staff username and password."
          retryHref="/login?next=/admin"
        />
      </div>
    );
  }

  return (
    <AdminShell roles={staff.roles} name={staff.user.globalName || staff.user.username}>
      {children}
    </AdminShell>
  );
}
