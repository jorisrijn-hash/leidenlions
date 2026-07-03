import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        steel: "var(--steel)",
        line: "var(--line)",
        ice: { DEFAULT: "var(--ice)", 100: "var(--ice-100)" },
        surface: "var(--surface)",
        navy: {
          600: "var(--navy-600)",
          700: "var(--navy-700)",
          800: "var(--navy-800)",
          900: "var(--navy-900)",
        },
        red: {
          DEFAULT: "var(--red)",
          700: "var(--red-700)",
          ink: "var(--red-ink)",
        },
        "hero-muted": "var(--hero-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        drawer: "var(--ease-drawer)",
      },
    },
  },
  plugins: [],
};

export default config;
