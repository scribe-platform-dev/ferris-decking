import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `base` is computed by the deploy workflow from `public/CNAME` and passed in
// as PUBLIC_BASE_PATH, rather than baked in here: a bare github.io project page
// needs `/<repo>`, a custom domain needs `/`. Getting it backwards 404s every
// asset on the page, so `scribe site verify` checks the emitted URLs.
export default defineConfig({
  output: 'static',
  // Update to the real domain once the client's own hostname is live —
  // sitemap entries and canonicals are built from this.
  site: 'https://scribe-platform-dev.github.io',
  base: process.env.PUBLIC_BASE_PATH || '/ferris-decking',
  integrations: [sitemap()],
});
