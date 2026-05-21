// AI Builder School 2.0 — Special(특강) 노드.
// 제품·버전 종속 휘발성 노드. 항상 volatile이며 reviewBy가 필수다 (스펙 3).
import type { Special } from "@/lib/types";

export const specials: Special[] = [
  {
    id: "special-01",
    slug: "frontier-ai-landscape-2026-05",
    titleKo: "2026년 상반기 프런티어 AI 진형 — Google I/O와 3사 경쟁",
    titleEn: "Frontier AI Lineup — 2026 H1",
    summary:
      "2026년 4~5월 한 달 반 사이의 모델 경쟁 — Claude Opus 4.7, GPT-5.5, Google I/O 2026 — 을 엎치락뒤치락 흐름으로 정리하고, 휘발성과 항구를 가르는 빌더의 자세(하네스 엔지니어링·오케스트레이션 하모니)까지 담는다.",
    product: "Google Gemini · OpenAI GPT-5.5 · Anthropic Claude",
    format: "interactive-slides",
    estimatedMinutes: 14,
    reviewBy: "2026-11-30",
    volatility: "volatile",
    status: "published",
    tags: [
      "frontier-models",
      "google-io-2026",
      "model-landscape",
      "gpt-5.5",
      "claude-opus-4.7",
      "harness-engineering",
      "orchestration",
    ],
  },
];
