import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQItem } from "@/components/ui/FAQItem";
import { listFaq } from "@/lib/repositories/faq";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Answers about Rogue RP, whitelist, FiveM, rules, departments, applications, technical issues and Discord.",
  path: "/faq",
});

export default async function FaqPage() {
  const categories = await listFaq();

  return (
    <PageContainer>
      <PageHeader
        kicker="Support"
        title="FAQ"
        description="Straight answers. If your question is a ticket, use Discord instead of a public channel."
      />
      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <section key={category.id}>
            <h2 className="font-display text-3xl uppercase text-white">{category.title}</h2>
            <div className="mt-4">
              {category.items.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
