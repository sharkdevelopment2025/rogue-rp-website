import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/auth/session";
import { isStaffKeyUser } from "@/lib/auth/staff-access";
import { isStaffAccessConfigured } from "@/lib/env";
import { isSafeRelativePath } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Login",
  description: "Sign in to the Rogue RP staff editor with a username and password.",
  path: "/login",
});

const errorCopy: Record<string, string> = {
  oauth: "Sign-in could not be completed. Try again.",
  config: "Staff login is not configured on this deployment.",
  rate: "Too many sign-in attempts. Wait a moment and try again.",
  suspended: "This website account has been suspended.",
  "staff-invalid": "That username or password is not valid.",
  "staff-rate": "Too many staff sign-in attempts. Wait a few minutes and try again.",
  "staff-off": "Staff login is not configured on this deployment.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const next = isSafeRelativePath(params.next) ? params.next : "/admin";
  const staffNext = next.startsWith("/admin") ? next : "/admin";
  const staffConfigured = isStaffAccessConfigured();
  const errorMessage = params.error ? errorCopy[params.error] || errorCopy.oauth : null;

  return (
    <PageContainer>
      <PageHeader
        kicker="Staff"
        title="Login"
        description="Sign in with your staff username and password to edit the public website."
      />
      {session ? (
        <p className="mt-8 font-display text-2xl uppercase text-white">
          Welcome back, {session.globalName || session.username}
        </p>
      ) : null}
      {isStaffKeyUser(session) ? (
        <div className="mt-4">
          <Button href="/admin">Open staff editor</Button>
        </div>
      ) : null}
      {errorMessage ? <p className="mt-6 text-sm text-rogue-danger">{errorMessage}</p> : null}
      <section className="panel mt-10 max-w-xl p-6">
        <h2 className="font-display text-2xl uppercase text-white">Staff login</h2>
        <p className="mt-3 text-sm leading-6 text-rogue-muted">
          Post news, update staff, media, rules and other public pages.
        </p>
        {staffConfigured ? (
          <form action="/api/auth/staff" method="POST" className="mt-6 grid gap-3">
            <input type="hidden" name="next" value={staffNext} />
            <label className="grid gap-2 text-sm text-rogue-muted">
              Username
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
              />
            </label>
            <label className="grid gap-2 text-sm text-rogue-muted">
              Password
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
              />
            </label>
            <Button type="submit">Sign in</Button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-rogue-muted">
            Set STAFF_USERNAME and STAFF_ACCESS_CODE in the environment to enable staff login.
          </p>
        )}
      </section>
    </PageContainer>
  );
}
