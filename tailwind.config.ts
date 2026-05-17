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
        // calm editorial 토큰을 CSS 변수로 매핑 — 다크 모드([data-theme])에
        // 자동으로 반응한다. 변수 정의는 src/styles/globals.css.
        ink: {
          DEFAULT: "var(--ink)",
          1: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
          // 하위 호환 numeric scale — 가장 가까운 시맨틱 토큰으로 흡수
          50: "var(--paper)",
          100: "var(--paper-2)",
          200: "var(--line)",
          300: "var(--line-2)",
          400: "var(--ink-4)",
          500: "var(--ink-3)",
          600: "var(--ink-3)",
          700: "var(--ink-2)",
          800: "var(--ink-2)",
          900: "var(--ink)",
        },
        line: {
          DEFAULT: "var(--line)",
          2: "var(--line-2)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          2: "var(--paper-2)",
        },
        card: "var(--card)",
        // 하위 호환 토큰 — 시맨틱 토큰으로 흡수
        brand: {
          50: "var(--paper-2)",
          100: "var(--line)",
          200: "var(--line-2)",
          300: "var(--ink-4)",
          400: "var(--ink-3)",
          500: "var(--ink-2)",
          600: "var(--ink)",
          700: "var(--ink)",
          800: "var(--ink)",
          900: "var(--ink)",
        },
        accent: {
          500: "var(--ink-4)",
          600: "var(--ink-3)",
        },
        surface: {
          DEFAULT: "var(--card)",
          muted: "var(--paper-2)",
          sunken: "var(--line)",
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
