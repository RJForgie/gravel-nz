import { defineCollection, z } from 'astro:content';

const races = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    description: z.string(),
    terrain: z.string(),
    status: z.string(),
    registrationUrl: z.string().optional(),
    raceOptions: z.array(z.object({
      distance: z.number(),
      elevation: z.number(),
      startTime: z.string().optional(),
      price: z.number().optional(),
      registrationUrl: z.string().optional(),
    }))
  })
});

export const collections = {
  races
}; 