import { z, defineCollection } from "astro:content";

const devlogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
  }),
});

export const collections = {
  devlog: devlogCollection,
};
