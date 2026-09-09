import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AdminLoading() {
  return <LoadingSkeleton message="Loading Dashboard..." rows={4} />;
}
