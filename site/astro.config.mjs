import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const site = process.env.SITE_URL ?? 'https://afumu.github.io';
const base = process.env.SITE_BASE ?? '/hundred-lab/';

export default defineConfig({
  site,
  base,
  integrations: [react()],
});
