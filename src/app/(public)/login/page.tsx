import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/auth/session";
import { isStaffKeyUser } from "@/lib/auth/staff-access";
import { isDiscordOAuthConfigured, isStaffAccessConfigured } from "@/lib/env";
import { isSafeRelativePath } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Login",
  description: "Login to Rogue RP with Discord, or sign in to staff tools with an access code.",
  path: "/login",
});

const errorCopy: Record<string, string> = {
  oauth: "Sign-in could not be completed. Try again, or ask staff to check Discord OAuth configuration.",
  config: "Discord login is not configured on this deployment.",
  rate: "Too many sign-in attempts. Wait a moment and try again.",
  suspended: "This website account has been suspended.",
  "staff-invalid": "That staff access code is not valid.",
  "staff-rate": "Too many staff sign-in attempts. Wait a few minutes and try again.",
  "staff-off": "Staff login is not configured on this deployment. Set STAFF_ACCESS_CODE to enable it.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const next = isSafeRelativePath(params.next) ? params.next : "/dashboard";
  const staffNext = next.startsWith("/admin") ? next : "/admin";
  const staffConfigured = isStaffAccessConfigured();
  const discordConfigured = isDiscordOAuthConfigured();
  const errorMessage = params.error ? errorCopy[params.error] || errorCopy.oauth : null;

  return (
    <PageContainer>
      <PageHeader
        kicker="Account"
        title="Login"
        description="Players sign in with Discord. Staff can also open the website editor with an access code. Discord passwords are never stored."
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
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="panel p-6">
          <h2 className="font-display text-2xl uppercase text-white">Discord</h2>
          <p className="mt-3 text-sm leading-6 text-rogue-muted">
            Use this for your player dashboard, whitelist status and applications.
          </p>
          <div className="mt-6">
            {discordConfigured ? (
              <Button href={`/api/auth/discord?next=${encodeURIComponent(next)}`} variant="discord">
                Login with Discord
              </Button>
            ) : (
              <p className="text-sm text-rogue-muted">
                Discord OAuth is not configured yet. Set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET
                to enable player login.
              </p>
            )}
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="font-display text-2xl uppercase text-white">Staff editor</h2>
          <p className="mt-3 text-sm leading-6 text-rogue-muted">
            Post news, update staff, media, rules and other public pages. The access code is set in
            the server environment, not in the browser.
          </p>
          {staffConfigured ? (
            <form action="/api/auth/staff" method="POST" className="mt-6 grid gap-3">
              <input type="hidden" name="next" value={staffNext} />
              <label className="grid gap-2 text-sm text-rogue-muted">
                Staff access code
                <input
                  name="code"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
                />
              </label>
              <Button type="submit">Open staff tools</Button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-rogue-muted">
              Set STAFF_ACCESS_CODE (8 or more characters) in the environment to enable staff login.
            </p>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
