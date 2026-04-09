import type { APIRoute } from "astro";
import { siteConfig } from "../data/site";
import { getAllPosts, toPostSummary } from "../utils/content";

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
  const posts = (await getAllPosts()).slice(0, 20).map(toPostSummary);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.siteTitle)}</title>
    <link>${escapeXml(origin.toString())}</link>
    <description>${escapeXml(siteConfig.siteDescription)}</description>
    <language>${siteConfig.lang}</language>
    ${posts
      .map((post) => {
        const link = new URL(`/posts/${post.slug}/`, origin).toString();
        const guid = link;
        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <guid>${escapeXml(guid)}</guid>
    </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
