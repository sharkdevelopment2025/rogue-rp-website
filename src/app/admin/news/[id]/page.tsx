import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth/guards";
import { getNewsById } from "@/lib/repositories/news";
import { NewsEditor } from "@/components/admin/NewsEditor";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff("content");
  const { id } = await params;
  const article = await getNewsById(id);
  if (!article) {
    notFound();
  }
  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Edit article</h1>
      <div className="mt-8 max-w-3xl">
        <NewsEditor article={article} />
      </div>
    </div>
  );
}
