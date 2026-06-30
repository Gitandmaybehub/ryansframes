import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Portfolio } from "@/components/sections/portfolio-gallery";
import { BreadcrumbJsonLd, GalleryJsonLd } from "@/components/structured-data";
import { getGalleryPhotos } from "@/lib/sanity";
import { SITE } from "@/lib/site";

const DESCRIPTION =
  "A growing archive of game-day moments — boys and girls high school sports across Morris County, New Jersey, shot by Ryan Heiart.";

export const metadata: Metadata = {
  title: "Portfolio",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: `Portfolio — ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/portfolio`,
  },
};

// Re-check Sanity for new photos at most once a minute (ISR).
export const revalidate = 60;

export default async function PortfolioPage() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]}
      />
      <GalleryJsonLd
        photos={photos}
        name="Ryan Heiart — Sports Photography Portfolio"
        description={DESCRIPTION}
        path="/portfolio"
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Selected frames"
        intro="A growing archive of game-day moments — the beauty, triumph, and raw emotion of Morris County athletics, boys and girls alike. Tap any frame to view it full screen."
      />
      <div className="pb-24 sm:pb-32">
        <Portfolio photos={photos} />
      </div>
    </>
  );
}
