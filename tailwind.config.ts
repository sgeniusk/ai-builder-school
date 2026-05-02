import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx,mdx}",
  ],
  safelist: [
    // 동적으로 생성되는 페르소나 색 클래스 — 정적 분석에 안 잡히므로 명시.
    "p-practitioner",
    "p-adopter",
    "p-creator",
    "p-founder",
    "p-engineer",
    "p-explorer",
    "p-text",
    "p-mark",
    "p-bar",
    "p-tint",
    "p-glow",
  ],
  theme: {
    extend: {
      colors: {
        // New "calm editorial" design system (per design_handoff)
        ink: {
          DEFAULT: "#0D0D0D",
          1: "#0D0D0D",
          2: "#2A2A2A",
          3: "#6B6B6B",
          4: "#A8A8A8",
          // Backward-compat numeric scale (interpolated between paper↔ink)
          50: "#FAF9F6",
          100: "#F2F0EA",
          200: "#E6E4DE",
          300: "#D4D1C8",
          400: "#A8A8A8",
          500: "#6B6B6B",
          600: "#4A4A4A",
          700: "#2A2A2A",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
        line: {
          DEFAULT: "#E6E4DE",
          2: "#D4D1C8",
        },
        paper: {
          DEFAULT: "#FAF9F6",
          2: "#F2F0EA",
        },
        card: "#FFFFFF",
        // Backward-compat tokens — remapped to calm editorial
        brand: {
          50: "#F2F0EA",
          100: "#E6E4DE",
          200: "#D4D1C8",
          300: "#A8A8A8",
          400: "#6B6B6B",
          500: "#2A2A2A",
          600: "#0D0D0D",
          700: "#0D0D0D",
          800: "#0D0D0D",
          900: "#0D0D0D",
        },
        accent: {
          500: "#A8A8A8",
          600: "#6B6B6B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F2F0EA",
          sunken: "#E6E4DE",
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'monospace',
        ],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "12px",
        lg: "20px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(13,13,13,0.04), 0 1px 3px rgba(13,13,13,0.06)",
        lift: "0 20px 60px -20px rgba(0,0,0,0.2)",
      },
      maxWidth: {
        wrap: "1280px",
        reader: "720px",
        prose: "60ch",
        content: "72rem",
      },
      fontSize: {
        eyebrow: ["12px", { lineHeight: "1.3", letterSpacing: "0.14em" }],
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
