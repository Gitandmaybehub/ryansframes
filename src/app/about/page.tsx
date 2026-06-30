import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { About } from "@/components/sections/about";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { SITE } from "@/lib/site";

const DESCRIPTION =
  "Meet Ryan Heiart — a high school sports photographer from Whippany Park who has covered 50+ events across Morris County, New Jersey.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    siteName: SITE.name,
    locale: "en_US",
    title: `About — ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About"
        title="Behind the lens"
        intro="Capturing the beauty, triumph, and raw emotion of high school athletics — one frame at a time."
      />
      <About />
    </>
  );
}
