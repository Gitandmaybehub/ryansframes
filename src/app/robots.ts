import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// AI / LLM crawlers we explicitly welcome — being cited by ChatGPT, Claude,
// Perplexity, Gemini, etc. (GEO) is a goal for this site, not something to block.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: new URL(SITE.url).host,
  };
}
