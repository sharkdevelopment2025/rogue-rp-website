import Image from "next/image";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getDepartmentBySlug, listDepartments } from "@/lib/repositories/departments";
import { createMetadata } from "@/lib/metadata";
import { getSession } from "@/lib/auth/session";

export async function generateStaticParams() {
  const departments = await listDepartments();
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);
  if (!department) {
    return createMetadata({ title: "Department", description: "Rogue RP department.", path: "/departments" });
  }
  return createMetadata({
    title: department.name,
    description: department.description,
    path: `/departments/${department.slug}`,
  });
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);
  if (!department) {
    notFound();
  }
  const session = await getSession();

  return (
    <PageContainer>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src={department.logo} alt="" width={72} height={72} className="rounded-2xl" unoptimized />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em]" style={{ color: department.colour }}>
                {department.shortName}
              </p>
              <h1 className="font-display text-4xl uppercase text-white md:text-6xl">{department.name}</h1>
            </div>
          </div>
          <p className="mt-6 font-display text-3xl uppercase text-rogue-chrome">{department.tagline}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-rogue-muted">{department.description}</p>
          <div className="mt-8">
            <Button href={session ? "/applications" : "/login?next=/applications"}>
              Apply to {department.shortName}
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="font-display text-xl uppercase text-white">Requirements</h2>
            <ul className="mt-4 space-y-2 text-sm text-rogue-muted">
              {department.requirements.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase text-white">Leadership</h2>
            <ul className="mt-4 space-y-3">
              {department.leadership.map((lead) => (
                <li key={lead.title}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-blue">
                    {lead.title}
                  </p>
                  <p className="text-white">{lead.name}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase text-white">Department statistics</h2>
            <dl className="mt-4 space-y-3">
              {department.statistics.map((stat) => (
                <div key={stat.label} className="flex justify-between gap-4">
                  <dt className="text-rogue-muted">{stat.label}</dt>
                  <dd className="text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
