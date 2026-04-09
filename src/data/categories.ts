export interface CategoryMeta {
  label: string;
  description: string;
  order: number;
  defaultCover?: string;
  defaultCoverAlt?: string;
}

export const categories: Record<string, CategoryMeta> = {
  astro: {
    label: "Astro",
    description: "围绕 Astro 的静态站点实践与内容组织。",
    order: 1,
    defaultCover: "/covers/astro.svg",
    defaultCoverAlt: "Astro 分类默认封面",
  },
  "frontend-engineering": {
    label: "前端工程",
    description: "构建流程、部署策略与工程化经验。",
    order: 2,
    defaultCover: "/covers/frontend-engineering.svg",
    defaultCoverAlt: "前端工程分类默认封面",
  },
  "css-notes": {
    label: "CSS 笔记",
    description: "样式组织、阅读体验与细节打磨。",
    order: 3,
    defaultCover: "/covers/css-notes.svg",
    defaultCoverAlt: "CSS 笔记分类默认封面",
  },
  "static-deployment": {
    label: "静态部署",
    description: "围绕 OSS 与静态发布链路的实践。",
    order: 4,
    defaultCover: "/covers/static-deployment.svg",
    defaultCoverAlt: "静态部署分类默认封面",
  },
};

export const categoryEntries = Object.entries(categories)
  .map(([slug, meta]) => ({ slug, ...meta }))
  .sort((left, right) => left.order - right.order);
