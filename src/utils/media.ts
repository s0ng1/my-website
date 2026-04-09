import { categories } from "../data/categories";
import { siteConfig } from "../data/site";

interface CoverInput {
  title: string;
  category: string;
  cover?: string;
  coverAlt?: string;
}

export interface ResolvedCover {
  src: string;
  alt: string;
}

export function resolvePostCover(input: CoverInput): ResolvedCover {
  const category = categories[input.category];

  if (input.cover) {
    return {
      src: input.cover,
      alt: input.coverAlt ?? input.title,
    };
  }

  if (category?.defaultCover) {
    return {
      src: category.defaultCover,
      alt: input.coverAlt ?? category.defaultCoverAlt ?? input.title,
    };
  }

  return {
    src: siteConfig.defaultOgImage,
    alt: input.coverAlt ?? input.title,
  };
}
