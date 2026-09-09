import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundView } from "@/components/ui/NotFoundView";

export default async function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
