const formatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(value: Date): string {
  return formatter.format(value);
}
