import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Contact } from "@/components/sections/contact";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { SITE } from "@/lib/site";

const DESCRIPTION =
  "Book Ryan Heiart for an upcoming game, or request photos from an event he has already covered. The fastest way to reach him is a quick text.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: `Contact — ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's capture your moment"
        intro="Need a photographer for an upcoming game, or want shots from an event I've already covered? I'd love to hear from you — the fastest way to reach me is a quick text."
      />
      <Contact />
    </>
  );
}
