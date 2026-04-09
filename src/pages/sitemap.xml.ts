import type { APIRoute } from "astro";
import { siteConfig } from "../data/site";
import { getAllPosts, getCategoryGroups } from "../utils/content";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL(siteConfig.siteUrl);
  const posts = await getAllPosts();
  const categories = await getCategoryGroups();

  const routes = [
    { path: "/", lastmod: undefined },
    { path: "/about/", lastmod: undefined },
    { path: "/archives/", lastmod: undefined },
    { path: "/categories/", lastmod: undefined },
    ...categories.map((category) => ({
      path: `/categories/${category.slug}/`,
      lastmod: category.posts[0]?.updatedDate ?? category.posts[0]?.pubDate,
    })),
    ...posts.map((post) => ({
      path: `/posts/${post.slug}/`,
      lastmod: post.data.updatedDate ?? post.data.pubDate,
    })),
    { path: "/rss.xml", lastmod: posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ path, lastmod }) => {
    const loc = new URL(path, origin).toString();
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${lastmod ? `    <lastmod>${lastmod.toISOString()}</lastmod>` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
