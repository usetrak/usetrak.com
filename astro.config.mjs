import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: "https://usetrak.com",
  integrations: [tailwind(), sitemap(), mdx(), metaTags()],
});
