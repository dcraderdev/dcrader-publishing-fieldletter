// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fieldletter.dcrader.dev',
  output: 'static',
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [sitemap(), tailwind()],
});
