import { PageContainer } from "@/components/layout/PageContainer";
import { termsContent } from "@/data/legal";
import { formatUkDate } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Placeholder terms of service for the Rogue RP website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageContainer>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300">
        Placeholder for replacement
      </p>
      <h1 className="mt-4 font-display text-5xl uppercase text-white">{termsContent.title}</h1>
      <p className="mt-3 text-sm text-rogue-muted">Updated {formatUkDate(termsContent.updatedAt)}</p>
      <div className="mt-10 space-y-8">
        {termsContent.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl uppercase text-white">{section.heading}</h2>
            <p className="mt-3 max-w-3xl leading-8 text-rogue-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
