import { requireStaff } from "@/lib/auth/guards";
import { listDepartments } from "@/lib/repositories/departments";
import { deleteDepartmentAction, saveDepartmentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import type { DepartmentRecord } from "@/types";

export const metadata = createMetadata({
  title: "Admin Departments",
  description: "Add, edit and remove Rogue RP departments.",
  path: "/admin/departments",
});

export default async function AdminDepartmentsPage() {
  await requireStaff("content");
  const departments = await listDepartments();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Departments</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-rogue-muted">
        Departments saved here appear on the public Departments page and homepage. You can add new
        departments or remove ones that should no longer be listed.
      </p>
      <section className="panel mt-8 p-6">
        <h2 className="font-display text-2xl uppercase text-white">Add department</h2>
        <DepartmentForm />
      </section>
      <div className="mt-8 space-y-8">
        {departments.map((department) => (
          <section key={department.id} className="panel p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl uppercase text-white">{department.name}</h2>
              <form
                action={async () => {
                  "use server";
                  await deleteDepartmentAction(department.id);
                }}
              >
                <Button type="submit" variant="danger">
                  Delete
                </Button>
              </form>
            </div>
            <DepartmentForm department={department} />
          </section>
        ))}
      </div>
    </div>
  );
}

function DepartmentForm({ department }: { department?: DepartmentRecord }) {
  return (
    <form action={saveDepartmentAction} className="mt-4 grid gap-3">
      {department ? <input type="hidden" name="id" value={department.id} /> : null}
      <input
        name="name"
        required
        placeholder="Department name"
        defaultValue={department?.name}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <div className="grid gap-3 md:grid-cols-3">
        <input
          name="slug"
          placeholder="URL slug"
          defaultValue={department?.slug}
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
        <input
          name="shortName"
          placeholder="Short name"
          defaultValue={department?.shortName}
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
        <input
          name="colour"
          placeholder="#22D3EE"
          defaultValue={department?.colour ?? "#22D3EE"}
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
      </div>
      <input
        name="tagline"
        placeholder="Tagline"
        defaultValue={department?.tagline}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <textarea
        name="description"
        required
        placeholder="Description"
        defaultValue={department?.description}
        rows={3}
        className="border border-white/10 bg-black/40 px-3 py-2 text-white"
      />
      <textarea
        name="requirements"
        placeholder="Requirements, one per line"
        defaultValue={department?.requirements.join("\n")}
        rows={4}
        className="border border-white/10 bg-black/40 px-3 py-2 text-white"
      />
      <input
        name="logo"
        placeholder="Logo path, or upload below"
        defaultValue={department?.logo ?? "/logo.jpg"}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <label className="grid gap-2 text-sm text-rogue-muted">
        Logo file
        <input name="logoFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
      </label>
      <input
        name="leadTitle"
        placeholder="Lead title"
        defaultValue={department?.leadership[0]?.title}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <input
        name="leadName"
        placeholder="Lead name"
        defaultValue={department?.leadership[0]?.name}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <input
        name="applicationType"
        placeholder="Application type"
        defaultValue={department?.applicationType ?? "Department"}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <Button type="submit">{department ? "Save department" : "Add department"}</Button>
    </form>
  );
}
