import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function StaffLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <LoadingSkeleton message="Loading Staff..." rows={4} />
    </div>
  );
}
