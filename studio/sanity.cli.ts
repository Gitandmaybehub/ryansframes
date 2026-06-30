import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "etahflo7",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  /** Lets you deploy the dashboard to a free <name>.sanity.studio URL. */
  studioHost: "ryansframes",
});
