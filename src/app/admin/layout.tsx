import type { ReactNode } from "react";
import { unstable_rethrow } from "next/navigation";
import { AuthError, requireAnyStaffPage } from "@/lib/auth/guards";
import { AdminShell } from "@/components/admin/AdminShell";
import { ErrorState } from "@/components/ui/ErrorState";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    const staff = await requireAnyStaffPage();
    return (
      <AdminShell roles={staff.roles} name={staff.user.globalName || staff.user.username}>
        {children}
      </AdminShell>
    );
  } catch (error) {
    unstable_rethrow(error);
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <ErrorState
          title="Staff only"
          message={
            error instanceof AuthError
              ? error.message
              : "You do not have access to staff systems. Sign in from Login with a staff username and password."
          }
          retryHref="/login?next=/admin"
        />
      </div>
    );
  }
}
