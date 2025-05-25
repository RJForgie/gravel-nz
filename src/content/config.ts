import { defineCollection, z } from 'astro:content';

const races = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    distance: z.number(),
    elevation: z.number(),
    description: z.string(),
    registrationUrl: z.string(),
    terrain: z.string(),
    status: z.string()
  })
});

export const collections = {
  races
}; 