import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { DepartmentRecord } from "@/types";

export function DepartmentCard({ department }: { department: DepartmentRecord }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center gap-4">
        <Image src={department.logo} alt="" width={64} height={64} className="rounded-2xl" unoptimized />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: department.colour }}>
            {department.shortName}
          </p>
          <h3 className="font-display text-2xl uppercase text-white">{department.name}</h3>
        </div>
      </div>
      <p className="mt-4 font-display text-lg uppercase text-rogue-chrome">{department.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-7 text-rogue-muted">{department.description}</p>
      <div className="mt-6">
        <Button href={`/departments/${department.slug}`} variant="secondary">
          View department
        </Button>
      </div>
    </Card>
  );
}

export function DepartmentLinkCard({ department }: { department: DepartmentRecord }) {
  return (
    <Link
      href={`/departments/${department.slug}`}
      className="panel block p-6 transition hover:-translate-y-0.5"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: department.colour }}>
        {department.shortName}
      </p>
      <h3 className="mt-3 font-display text-2xl uppercase text-white">{department.name}</h3>
      <p className="mt-2 text-sm text-rogue-muted">{department.tagline}</p>
    </Link>
  );
}
