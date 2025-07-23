// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'http://www.gravel.nz',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: []
});