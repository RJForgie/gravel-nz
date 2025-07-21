import { defineCollection, z } from 'astro:content';

const races = defineCollection({
  type: 'data',
  schema: z.object({
    races: z.array(z.object({
      title: z.string(),
      date: z.string(),
      location: z.string(),
      terrain: z.string(),
      registrationUrl: z.string().optional(),
      raceOptions: z.array(z.number()),
      tentative: z.boolean()
    }))
  })
});

export const collections = {
  races
}; 