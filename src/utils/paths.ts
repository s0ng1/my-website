const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

function getSiteOrigin(): string {
  return import.meta.env.SITE ?? "https://blog.example.com";
}

export function withBase(path: string): string {
  if (!path || path === "/") {
    return import.meta.env.BASE_URL;
  }

  if (ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const normalizedBase = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
}

export function createCanonical(pathname: string): string {
  return new URL(withBase(pathname), getSiteOrigin()).toString();
}

export function createAbsoluteUrl(path: string): string {
  if (ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  return new URL(withBase(path), getSiteOrigin()).toString();
}
