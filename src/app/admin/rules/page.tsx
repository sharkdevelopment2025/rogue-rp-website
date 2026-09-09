import { requireStaff } from "@/lib/auth/guards";
import { listRules } from "@/lib/repositories/rules";
import { deleteRuleItemAction, saveRuleItemAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { formatUkDate } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Rules",
  description: "Configure Rogue RP rules.",
  path: "/admin/rules",
});

export default async function AdminRulesPage() {
  await requireStaff("content");
  const { categories, updatedAt } = await listRules();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Rules</h1>
      <p className="mt-3 text-sm text-rogue-muted">Last updated {formatUkDate(updatedAt)}</p>
      <div className="mt-8 space-y-8">
        {categories.map((category) => (
          <section key={category.id} className="panel p-6">
            <h2 className="font-display text-2xl uppercase text-white">{category.title}</h2>
            <div className="mt-4 space-y-4">
              {category.items.map((item) => (
                <form key={item.id} action={saveRuleItemAction} className="grid gap-3 border border-white/10 p-4">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <input type="hidden" name="itemId" value={item.id} />
                  <input
                    name="title"
                    required
                    defaultValue={item.title}
                    className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
                  />
                  <textarea
                    name="body"
                    required
                    rows={3}
                    defaultValue={item.body}
                    className="border border-white/10 bg-black/40 px-3 py-2 text-white"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button type="submit">Save rule</Button>
                    <button
                      className="inline-flex min-h-11 items-center px-5 font-display text-sm uppercase tracking-[0.12em] text-rogue-danger"
                      formAction={async () => {
                        "use server";
                        await deleteRuleItemAction(category.id, item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
            <form action={saveRuleItemAction} className="mt-6 grid gap-3">
              <input type="hidden" name="categoryId" value={category.id} />
              <input
                name="title"
                required
                placeholder="New rule title"
                className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
              />
              <textarea
                name="body"
                required
                rows={3}
                placeholder="Rule text"
                className="border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
              <Button type="submit">Add rule</Button>
            </form>
          </section>
        ))}
      </div>
    </div>
  );
}
