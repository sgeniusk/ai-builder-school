// AI Builder School 2.0 — Special(특강) 노드.
// 제품·버전 종속 휘발성 노드. 항상 volatile이며 reviewBy가 필수다 (스펙 3).
import type { Special } from "@/lib/types";

export const specials: Special[] = [
  {
    id: "special-01",
    slug: "frontier-ai-landscape-2026-05",
    titleKo: "프런티어 AI 지형 2026 — Google I/O와 3사 경쟁",
    titleEn: "Frontier AI Landscape 2026",
    summary:
      "2026년 4~5월 한 달 반 사이의 모델 경쟁 — Claude Opus 4.7, GPT-5.5, Google I/O 2026 — 을 빌더 관점에서 정리하고, 무엇이 휘발성이고 무엇이 항구적인지 가른다.",
    product: "Google Gemini · OpenAI GPT-5.5 · Anthropic Claude",
    format: "interactive-slides",
    estimatedMinutes: 12,
    reviewBy: "2026-11-30",
    volatility: "volatile",
    status: "published",
    tags: [
      "frontier-models",
      "google-io-2026",
      "model-landscape",
      "gpt-5.5",
      "claude-opus-4.7",
    ],
  },
];
