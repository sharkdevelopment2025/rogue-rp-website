import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/auth/session";
import { isDiscordOAuthConfigured } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Whitelist",
  description: "Become part of Rogue RP. Complete the whitelist application process to join the city.",
  path: "/whitelist",
});

export default async function WhitelistPage() {
  const session = await getSession();

  return (
    <PageContainer>
      <PageHeader
        kicker="Access"
        title="Become part of Rogue RP"
        description="Rogue RP operates a serious roleplay environment. To join the server, you may need to complete our whitelist application process."
      />
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href={session ? "/applications" : "/login?next=/applications"}>
          Start application
        </Button>
        <Button href="#requirements" variant="secondary">
          View requirements
        </Button>
        <Button href="/rules" variant="ghost">
          View rules
        </Button>
      </div>
      {!session ? (
        <p className="mt-8 font-display text-xl uppercase text-rogue-chrome">
          {isDiscordOAuthConfigured()
            ? "Login with Discord to apply"
            : "Discord login is not configured yet. Join the Discord server and wait for staff to finish website OAuth setup."}
        </p>
      ) : null}
      <section id="requirements" className="panel mt-14 p-8">
        <h2 className="font-display text-3xl uppercase text-white">Requirements</h2>
        <ul className="mt-5 space-y-3 text-rogue-muted">
          <li>A legal copy of Grand Theft Auto V and the FiveM client.</li>
          <li>A Discord account that can join the Rogue RP server.</li>
          <li>A working microphone and a willingness to stay in character.</li>
          <li>Read the rules before you write the application.</li>
          <li>A character concept that can exist in a serious British city.</li>
        </ul>
      </section>
    </PageContainer>
  );
}
