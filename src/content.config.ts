import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Проект: папка src/content/projects/<slug>/ с index.md и картинками рядом. */
const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string(), // подпись вида работы: «Бот и веб-панель»
      kind: z.enum(['bot', 'web', 'data', 'iot', 'audio']), // для фильтра
      year: z.number(),
      order: z.number(),
      summary: z.string().max(220),
      client: z.string(), // обезличенный заказчик
      repo: z.string().url().optional(),
      stack: z.array(z.string()),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      cover: image(),
      gallery: z.array(
        z.object({
          src: image(),
          alt: z.string(),
          frame: z.enum(['desktop', 'chat', 'mobile']),
        }),
      ),
      draft: z.boolean().default(false),
    }),
});

/** Группа возможностей на главной. */
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    group: z.string(),
    order: z.number(),
    // Позиция прайс-листа: название, пояснение, стартовая цена, ссылка на проект-пример
    items: z.array(z.object({ name: z.string(), note: z.string(), price: z.string(), project: z.string().optional() })),
  }),
});

/** Достижения и публикации. */
const achievements = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    list: z.enum(['award', 'paper']),
    order: z.number().default(0),
  }),
});

export const collections = { projects, services, achievements };
