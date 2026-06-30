import type { MetadataRoute } from "next";
import { getGalleryPhotos } from "@/lib/sanity";
import { absoluteUrl, photoUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const photos = await getGalleryPhotos();
  // Image sitemap entries help the photos surface in Google Images / AI search.
  const images = photos.map(photoUrl);

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images,
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

// Keep the image list fresh as new photos are published in Sanity.
export const revalidate = 3600;
