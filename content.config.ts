import { defineContentConfig, defineCollection } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "*.md",
      })
    ),
    events: defineCollection({
      type: "page",
      source: "events/**/*.md",
    }),
  },
});
