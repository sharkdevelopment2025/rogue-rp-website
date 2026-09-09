import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { getSession } from "@/lib/auth/session";
import { getStaffContext } from "@/lib/auth/guards";
import { userFromSession } from "@/lib/auth/public-user";
import { getSettings } from "@/lib/repositories/settings";

export async function SiteShell({ children }: { children: ReactNode }) {
  const [session, settings, staff] = await Promise.all([
    getSession(),
    getSettings(),
    getStaffContext(),
  ]);
  const discordHref = settings.discordInvite || "/discord";

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Navbar
        user={userFromSession(session)}
        discordHref={discordHref}
        isStaff={Boolean(staff)}
      />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer discordHref={discordHref} />
      <AnalyticsBeacon />
    </>
  );
}
