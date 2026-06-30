import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

/**
 * The "Photos" dashboard Ryan logs into to add, remove, and reorder photos.
 *
 * Set your project id below (or via the SANITY_STUDIO_PROJECT_ID env var).
 * You get it for free when you create a project at https://www.sanity.io.
 */
export default defineConfig({
  name: "default",
  title: "Ryan Heiart — Photos",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REPLACE_WITH_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("photo").title("Photos"),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
