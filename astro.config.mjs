// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://fieldletter.dcrader.dev',
  output: 'static',
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [tailwind()],
});
