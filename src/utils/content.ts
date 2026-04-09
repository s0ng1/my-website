import { getCollection, type CollectionEntry } from "astro:content";
import { categories } from "../data/categories";

export type PostEntry = CollectionEntry<"posts">;

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  category: string;
  categoryLabel: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  featured: boolean;
}

export interface CategoryGroup {
  slug: string;
  label: string;
  description: string;
  count: number;
  posts: PostSummary[];
}

export interface ArchiveGroup {
  year: string;
  count: number;
  posts: PostSummary[];
}

export interface AdjacentPosts {
  previous: PostSummary | null;
  next: PostSummary | null;
}

const collator = new Intl.Collator("zh-CN");

function getCategoryMeta(category: string) {
  return categories[category] ?? {
    label: category,
    description: "",
    order: Number.MAX_SAFE_INTEGER,
  };
}

export function toPostSummary(post: PostEntry): PostSummary {
  const categoryMeta = getCategoryMeta(post.data.category);

  return {
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    updatedDate: post.data.updatedDate,
    category: post.data.category,
    categoryLabel: categoryMeta.label,
    tags: post.data.tags ?? [],
    cover: post.data.cover,
    coverAlt: post.data.coverAlt,
    featured: post.data.featured ?? false,
  };
}

export function sortPostsByPubDateDesc(posts: PostEntry[]): PostEntry[] {
  return [...posts].sort(
    (left, right) =>
      right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return sortPostsByPubDateDesc(posts);
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  return posts.map(toPostSummary);
}

export function selectFeaturedPost(posts: PostEntry[]): PostEntry | null {
  if (posts.length === 0) {
    return null;
  }

  return posts.find((post) => post.data.featured) ?? posts[0];
}

export async function getFeaturedPost(): Promise<PostSummary | null> {
  const posts = await getAllPosts();
  const featuredPost = selectFeaturedPost(posts);

  return featuredPost ? toPostSummary(featuredPost) : null;
}

export async function getLatestPosts(limit?: number): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  const featured = selectFeaturedPost(posts);
  const latestPosts = posts.filter((post) => post.slug !== featured?.slug);

  return (typeof limit === "number" ? latestPosts.slice(0, limit) : latestPosts).map(
    toPostSummary,
  );
}

export async function getHomepagePosts(limit = 6): Promise<{
  featuredPost: PostSummary | null;
  latestPosts: PostSummary[];
}> {
  const posts = await getAllPosts();
  const featuredPost = selectFeaturedPost(posts);
  const latestPosts = posts
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, limit)
    .map(toPostSummary);

  return {
    featuredPost: featuredPost ? toPostSummary(featuredPost) : null,
    latestPosts,
  };
}

export async function getCategoryGroups(): Promise<CategoryGroup[]> {
  const posts = await getAllPosts();
  const grouped = new Map<string, PostEntry[]>();

  for (const post of posts) {
    const bucket = grouped.get(post.data.category) ?? [];
    bucket.push(post);
    grouped.set(post.data.category, bucket);
  }

  return [...grouped.entries()]
    .map(([slug, items]) => {
      const meta = getCategoryMeta(slug);

      return {
        slug,
        label: meta.label,
        description: meta.description,
        count: items.length,
        posts: items.map(toPostSummary),
        order: meta.order,
      };
    })
    .sort((left, right) => {
      if (left.order !== right.order) {
        return left.order - right.order;
      }

      return collator.compare(left.label, right.label);
    })
    .map(({ order: _order, ...group }) => group);
}

export async function getCategoryGroup(
  slug: string,
): Promise<CategoryGroup | null> {
  const groups = await getCategoryGroups();
  return groups.find((group) => group.slug === slug) ?? null;
}

export async function getArchiveGroups(): Promise<ArchiveGroup[]> {
  const posts = await getAllPosts();
  const grouped = new Map<string, PostEntry[]>();

  for (const post of posts) {
    const year = String(post.data.pubDate.getFullYear());
    const bucket = grouped.get(year) ?? [];
    bucket.push(post);
    grouped.set(year, bucket);
  }

  return [...grouped.entries()]
    .sort((left, right) => Number(right[0]) - Number(left[0]))
    .map(([year, items]) => ({
      year,
      count: items.length,
      posts: items.map(toPostSummary),
    }));
}

export async function getPostBySlug(slug: string): Promise<PostEntry | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: posts[index + 1] ? toPostSummary(posts[index + 1]) : null,
    next: posts[index - 1] ? toPostSummary(posts[index - 1]) : null,
  };
}
