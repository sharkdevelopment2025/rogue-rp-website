import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { listDepartments } from "@/lib/repositories/departments";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Departments",
  description: "Rogue Police Service, Rogue Health Service, Rogue Fire & Rescue and Civilian Operations.",
  path: "/departments",
});

export default async function DepartmentsPage() {
  const departments = await listDepartments();

  return (
    <PageContainer>
      <PageHeader
        kicker="Structure"
        title="Departments"
        description="Emergency services and civilian operations that keep the Rogue RP city moving."
      />
      {departments.length ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-rogue-muted">No departments are listed yet.</p>
      )}
    </PageContainer>
  );
}
