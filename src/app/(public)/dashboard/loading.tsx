import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <LoadingSkeleton message="Loading Dashboard..." rows={4} />
    </div>
  );
}
