import { requireStaffPage } from "@/lib/auth/guards";
import { listFaq } from "@/lib/repositories/faq";
import { deleteFaqItemAction, saveFaqItemAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin FAQ",
  description: "Configure Rogue RP FAQ entries.",
  path: "/admin/faq",
});

export default async function AdminFaqPage() {
  await requireStaffPage("content");
  const categories = await listFaq();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">FAQ</h1>
      <div className="mt-8 space-y-8">
        {categories.map((category) => (
          <section key={category.id} className="panel p-6">
            <h2 className="font-display text-2xl uppercase text-white">{category.title}</h2>
            <div className="mt-4 space-y-4">
              {category.items.map((item) => (
                <form key={item.id} action={saveFaqItemAction} className="grid gap-3 border border-white/10 p-4">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <input type="hidden" name="itemId" value={item.id} />
                  <input
                    name="question"
                    required
                    defaultValue={item.question}
                    className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
                  />
                  <textarea
                    name="answer"
                    required
                    rows={3}
                    defaultValue={item.answer}
                    className="border border-white/10 bg-black/40 px-3 py-2 text-white"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button type="submit">Save question</Button>
                    <button
                      className="inline-flex min-h-11 items-center px-5 font-display text-sm uppercase tracking-[0.12em] text-rogue-danger"
                      formAction={async () => {
                        "use server";
                        await deleteFaqItemAction(category.id, item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
            <form action={saveFaqItemAction} className="mt-6 grid gap-3">
              <input type="hidden" name="categoryId" value={category.id} />
              <input
                name="question"
                required
                placeholder="New question"
                className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
              />
              <textarea
                name="answer"
                required
                rows={3}
                placeholder="Answer"
                className="border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
              <Button type="submit">Add question</Button>
            </form>
          </section>
        ))}
      </div>
    </div>
  );
}
