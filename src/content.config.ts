import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const layer = z.object({
  label: z.string(),
  caption: z.string().optional(),
  type: z.enum(['image', 'video']),
  src: z.string(),
  poster: z.string().optional()
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['film', 'advertising', 'personal']),
    role: z.string(),
    year: z.string().optional(),
    client: z.string().optional(),
    order: z.number().default(50),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    thumb: z.string(),
    previewLoop: z.string().optional(),
    vimeoUrl: z.string().optional(),
    layers: z.array(layer).min(1).max(6)
  })
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/site' }),
  schema: z.object({
    lede: z.string(),
    location: z.string().optional(),
    experience: z.string().optional(),
    status: z.string().optional(),
    portrait: z.string(),
    portraitVideo: z.string().optional(),
    cv: z.string(),
    software: z.array(z.string())
  })
});

const reel = defineCollection({
  loader: glob({ pattern: 'reel.md', base: './src/content/site' }),
  schema: z.object({
    vimeoUrl: z.string(),
    loop: z.string(),
    poster: z.string(),
    tagline: z.string().optional()
  })
});

export const collections = { projects, about, reel };
