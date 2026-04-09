import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const site = process.env.PUBLIC_SITE_URL ?? "https://blog.example.com";
const rawBase = process.env.PUBLIC_SITE_BASE?.trim();
const base = rawBase && rawBase !== "/" ? rawBase : undefined;

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
