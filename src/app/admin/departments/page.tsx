import { requireStaff } from "@/lib/auth/guards";
import { listDepartments } from "@/lib/repositories/departments";
import { saveDepartmentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Departments",
  description: "Configure Rogue RP departments.",
  path: "/admin/departments",
});

export default async function AdminDepartmentsPage() {
  await requireStaff("content");
  const departments = await listDepartments();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Departments</h1>
      <div className="mt-8 space-y-8">
        {departments.map((department) => (
          <form key={department.id} action={saveDepartmentAction} className="panel grid gap-3 p-6">
            <input type="hidden" name="id" value={department.id} />
            <input name="name" defaultValue={department.name} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <div className="grid gap-3 md:grid-cols-3">
              <input name="slug" defaultValue={department.slug} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
              <input name="shortName" defaultValue={department.shortName} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
              <input name="colour" defaultValue={department.colour} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            </div>
            <input name="tagline" defaultValue={department.tagline} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <textarea name="description" defaultValue={department.description} rows={3} className="border border-white/10 bg-black/40 px-3 py-2 text-white" />
            <textarea
              name="requirements"
              defaultValue={department.requirements.join("\n")}
              rows={4}
              className="border border-white/10 bg-black/40 px-3 py-2 text-white"
            />
            <input name="logo" defaultValue={department.logo} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <label className="grid gap-2 text-sm text-rogue-muted">
              Logo file
              <input name="logoFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
            </label>
            <input name="leadTitle" defaultValue={department.leadership[0]?.title} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <input name="leadName" defaultValue={department.leadership[0]?.name} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <input name="applicationType" defaultValue={department.applicationType} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
            <Button type="submit">Save department</Button>
          </form>
        ))}
      </div>
    </div>
  );
}
