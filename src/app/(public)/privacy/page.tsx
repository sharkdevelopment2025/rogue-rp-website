import { PageContainer } from "@/components/layout/PageContainer";
import { privacyContent } from "@/data/legal";
import { formatUkDate } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Placeholder privacy policy for the Rogue RP website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageContainer>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300">
        Placeholder for replacement
      </p>
      <h1 className="mt-4 font-display text-5xl uppercase text-white">{privacyContent.title}</h1>
      <p className="mt-3 text-sm text-rogue-muted">Updated {formatUkDate(privacyContent.updatedAt)}</p>
      <div className="mt-10 space-y-8">
        {privacyContent.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl uppercase text-white">{section.heading}</h2>
            <p className="mt-3 max-w-3xl leading-8 text-rogue-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
