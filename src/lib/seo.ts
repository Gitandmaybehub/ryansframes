/**
 * SEO / GEO helpers — absolute URLs and schema.org JSON-LD builders.
 *
 * Centralizing the structured data here keeps it consistent across the site and
 * makes it easy for AI search engines (GEO) and traditional crawlers to extract
 * a clear, linked picture of who Ryan is, what he offers, and where he works.
 */
import { SITE } from "@/lib/site";
import type { GalleryPhoto } from "@/lib/types";

/** Stable @id anchors so the graph nodes can reference one another. */
export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const PERSON_ID = `${SITE.url}/#ryan`;

/** Resolve a site-relative path to an absolute URL on the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/** Absolute URL for a gallery photo (local static import or remote Sanity URL). */
export function photoUrl(photo: GalleryPhoto): string {
  const src = typeof photo.src === "string" ? photo.src : photo.src.src;
  return src.startsWith("http") ? src : absoluteUrl(src);
}

/** Towns and regions Ryan actively shoots — strengthens local + AI search. */
const AREA_SERVED = [
  "Morris County, New Jersey",
  "Hanover, New Jersey",
  "Whippany, New Jersey",
  "Morristown, New Jersey",
  "New Jersey",
].map((name) => ({ "@type": "Place", name }));

const SPORTS_KNOWN = [
  "Sports photography",
  "High school sports photography",
  "Lacrosse photography",
  "Basketball photography",
  "Baseball photography",
  "Softball photography",
  "Soccer photography",
  "Hockey photography",
  "Wrestling photography",
  "Action and event photography",
];

/**
 * The global entity graph: the website, the photography business, and Ryan
 * himself — cross-linked by @id. Rendered once in the root layout.
 */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-US",
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": BUSINESS_ID,
        name: "Ryan Heiart Sports Photography",
        alternateName: SITE.name,
        url: SITE.url,
        image: absoluteUrl("/opengraph-image"),
        description: SITE.description,
        slogan: SITE.tagline,
        founder: { "@id": PERSON_ID },
        employee: { "@id": PERSON_ID },
        areaServed: AREA_SERVED,
        knowsAbout: SPORTS_KNOWN,
        serviceType: "Sports photography",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hanover",
          addressRegion: "NJ",
          addressCountry: "US",
        },
        sameAs: [SITE.instagram.url],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High school sports photography",
            serviceType: "Game-day sports photography",
            provider: { "@id": BUSINESS_ID },
            areaServed: AREA_SERVED,
          },
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE.name,
        jobTitle: SITE.role,
        description: `${SITE.name} is a ${SITE.region} sports photographer covering high school athletics across New Jersey.`,
        worksFor: { "@id": BUSINESS_ID },
        knowsAbout: SPORTS_KNOWN,
        url: SITE.url,
        sameAs: [SITE.instagram.url],
      },
    ],
  };
}

/** A BreadcrumbList for a sub-page, e.g. Home › Portfolio. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * An ImageGallery of the portfolio photos. Each photo becomes an ImageObject
 * with its descriptive caption — exactly the kind of labeled visual content
 * that image search and generative engines surface and cite.
 */
export function imageGalleryLd(
  photos: GalleryPhoto[],
  meta: { name: string; description: string; path: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${absoluteUrl(meta.path)}#gallery`,
    name: meta.name,
    description: meta.description,
    url: absoluteUrl(meta.path),
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    associatedMedia: photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: photoUrl(photo),
      caption: photo.alt,
      name: photo.caption
        ? `${photo.sport} — ${photo.caption}`
        : `${photo.sport} photography`,
      width: photo.width,
      height: photo.height,
      creator: { "@id": PERSON_ID },
      creditText: SITE.name,
      copyrightHolder: { "@id": BUSINESS_ID },
    })),
  };
}
