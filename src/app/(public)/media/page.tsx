import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { MediaGallery } from "@/components/media/MediaGallery";
import { listMedia } from "@/lib/repositories/media";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Media",
  description: "Rogue RP screenshots, videos, community clips, trailers and events.",
  path: "/media",
});

export default async function MediaPage() {
  const items = await listMedia();

  return (
    <PageContainer>
      <PageHeader
        kicker="Gallery"
        title="Rogue RP Media"
        description="Official brand frames and community media. Additional screenshots and videos can be published from the staff panel."
      />
      <div className="mt-10">
        <MediaGallery items={items} />
      </div>
    </PageContainer>
  );
}
