import { requireStaffPage } from "@/lib/auth/guards";
import { NewsEditor } from "@/components/admin/NewsEditor";

export default async function NewArticlePage() {
  await requireStaffPage("content");
  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Create article</h1>
      <div className="mt-8 max-w-3xl">
        <NewsEditor />
      </div>
    </div>
  );
}
