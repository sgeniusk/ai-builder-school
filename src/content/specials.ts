// AI Builder School 2.0 — Special(특강) 노드.
// 제품·버전 종속 휘발성 노드. 항상 volatile이며 reviewBy가 필수다 (스펙 3).
import type { Special } from "@/lib/types";

export const specials: Special[] = [
  {
    id: "special-01",
    slug: "frontier-ai-landscape-2026-05",
    titleKo: "2026년 상반기 프런티어 AI 진형 — 라우팅·오케스트레이션 시대",
    titleEn: "Frontier AI Lineup — 2026 H1 · The Routing & Orchestration Era",
    summary:
      "한 달 반 사이 SWE 1위가 세 번 바뀌었다. 세 빅테크가 같은 신호를 보내고 있다 — 단일 모델 시대는 끝났다. 모델 1위가 아니라 그 위에 얹는 다섯 척추(추상화·평가셋·라우팅·하네스·오케스트레이션)가 빌더의 새 경쟁력이다.",
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
