export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "分类", href: "/categories/" },
  { label: "归档", href: "/archives/" },
  { label: "关于", href: "/about/" },
];

export const siteConfig = {
  siteTitle: "栖川笔记",
  siteSubtitle: "关于 Astro、前端工程和静态博客构建的安静记录。",
  siteDescription:
    "一个使用 Astro、Tailwind CSS 和 Markdown content collections 构建的纯静态中文技术博客。",
  author: "Site Author",
  lang: "zh-CN",
  themeColor: "#cc7442",
  siteUrl: "https://blog.example.com",
  defaultOgImage: "/og-default.jpg",
  navigation,
  socialLinks: [] as Array<{ label: string; href: string }>,
};
