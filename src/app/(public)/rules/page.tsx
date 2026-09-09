import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { RulesAccordion } from "@/components/rules/RulesAccordion";
import { formatUkDate } from "@/lib/utils";
import { listRules } from "@/lib/repositories/rules";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Rules",
  description: "Community, server, roleplay, combat, vehicle, department, criminal, staff and Discord rules.",
  path: "/rules",
});

export default async function RulesPage() {
  const { categories, updatedAt } = await listRules();

  return (
    <PageContainer>
      <PageHeader
        kicker="Standards"
        title="Rules"
        description="Rogue RP is a serious roleplay environment. These rules are the operating standard, not a suggestion list."
      />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-rogue-muted">
        Last updated · {formatUkDate(updatedAt)}
      </p>
      <div className="mt-10">
        <RulesAccordion categories={categories} />
      </div>
    </PageContainer>
  );
}
