import {
  organizationGraph,
  breadcrumbList,
  imageGalleryLd,
} from "@/lib/seo";
import type { GalleryPhoto } from "@/lib/types";

/** Render an arbitrary schema.org object as a JSON-LD <script>. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Global JSON-LD: the website, the photography business, and Ryan — linked by
 * @id so search engines and AI/LLM crawlers can resolve the full entity graph.
 * Rendered once in the root layout.
 */
export function StructuredData() {
  return <JsonLd data={organizationGraph()} />;
}

/** Per-page breadcrumb trail, e.g. Home › Portfolio. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return <JsonLd data={breadcrumbList(items)} />;
}

/** Portfolio image gallery — each photo as a captioned, attributed ImageObject. */
export function GalleryJsonLd({
  photos,
  name,
  description,
  path,
}: {
  photos: GalleryPhoto[];
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd data={imageGalleryLd(photos, { name, description, path })} />
  );
}
