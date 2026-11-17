import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alexashin.github.io',
  integrations: [mdx(), sitemap()],
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
