/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        app: "rgb(var(--color-app) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-soft": "rgb(var(--color-surface-soft) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(39, 29, 20, 0.24)",
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          "system-ui",
          "sans-serif",
        ],
        serif: [
          '"Songti SC"',
          '"STSong"',
          '"Noto Serif SC"',
          "serif",
        ],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        reading: "46rem",
        layout: "72rem",
      },
    },
  },
  plugins: [],
};
