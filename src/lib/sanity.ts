import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { localPhotos } from "@/data/gallery";
import type { GalleryPhoto, Sport } from "@/lib/types";

/**
 * Read-only Sanity data layer.
 *
 * The site works with zero configuration using the bundled `localPhotos`.
 * The moment NEXT_PUBLIC_SANITY_PROJECT_ID is set (see .env.example), the
 * gallery is served from Sanity instead, so Ryan can manage photos from the
 * Studio dashboard. Any error falls back to the bundled photos.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityEnabled = Boolean(projectId);

const client: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: "2024-10-01",
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

interface SanityPhotoDoc {
  _id: string;
  alt?: string;
  caption?: string;
  sport?: string;
  featured?: boolean;
  url?: string;
  dims?: { width: number; height: number };
  lqip?: string;
}

const QUERY = `*[_type == "photo" && defined(image.asset)]
  | order(coalesce(order, 9999) asc, _createdAt desc){
    _id, alt, caption, sport, featured,
    "url": image.asset->url,
    "dims": image.asset->metadata.dimensions,
    "lqip": image.asset->metadata.lqip
  }`;

const VALID_SPORTS: Sport[] = [
  "Basketball",
  "Baseball",
  "Lacrosse",
  "Soccer",
  "Softball",
  "Football",
  "Track",
  "Other",
];

function normalizeSport(value?: string): Sport {
  if (!value) return "Other";
  const match = VALID_SPORTS.find(
    (s) => s.toLowerCase() === value.toLowerCase()
  );
  return match ?? "Other";
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!client || !builder) return localPhotos;
  try {
    const docs = await client.fetch<SanityPhotoDoc[]>(QUERY);
    const mapped = (docs ?? [])
      .filter((d) => d.url && d.dims)
      .map<GalleryPhoto>((d) => ({
        id: d._id,
        src: builder
          .image(d.url!)
          .width(2400)
          .fit("max")
          .auto("format")
          .quality(82)
          .url(),
        alt: d.alt || d.caption || "Sports photograph by Ryan Heiart",
        caption: d.caption,
        sport: normalizeSport(d.sport),
        width: d.dims!.width,
        height: d.dims!.height,
        blurDataURL: d.lqip,
        featured: d.featured,
      }));
    return mapped.length ? mapped : localPhotos;
  } catch (err) {
    console.error(
      "[sanity] gallery fetch failed — using bundled photos.",
      err
    );
    return localPhotos;
  }
}
