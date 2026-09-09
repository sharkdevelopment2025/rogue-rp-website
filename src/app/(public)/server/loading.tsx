import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function ServerLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <LoadingSkeleton message="Loading Server..." rows={3} />
    </div>
  );
}
