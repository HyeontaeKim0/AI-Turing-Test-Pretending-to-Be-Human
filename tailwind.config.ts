import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "sns-bg": "var(--sns-bg)",
        "sns-card": "var(--sns-card)",
        "sns-header": "var(--sns-header)",
        "sns-text": "var(--sns-text)",
        "sns-text-secondary": "var(--sns-text-secondary)",
        "sns-primary": "var(--sns-primary)",
        "sns-divider": "var(--sns-divider)",
        "sns-like": "#f33e58",
      },
      spacing: {
        "top-bar": "56px",
        "bottom-nav": "56px",
      },
    },
  },
  plugins: [],
};

export default config;
