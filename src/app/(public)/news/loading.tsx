import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <LoadingSkeleton message="Loading News..." rows={3} />
    </div>
  );
}
