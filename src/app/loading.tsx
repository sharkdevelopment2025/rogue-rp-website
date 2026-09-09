import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <LoadingSkeleton message="Loading Rogue RP..." rows={4} />
    </div>
  );
}
