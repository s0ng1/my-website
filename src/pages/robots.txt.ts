import type { APIRoute } from "astro";
import { siteConfig } from "../data/site";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteConfig.siteUrl);
  const sitemapUrl = new URL("/sitemap.xml", origin).toString();

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
