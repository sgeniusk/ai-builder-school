// AI Builder School 2.0 — Special(특강) 노드.
// 제품·버전 종속 휘발성 노드. 항상 volatile이며 reviewBy가 필수다 (스펙 3).
// kind — "internal"은 빌더 스쿨 자체 thesis, "external"은 외부 강의·영상 큐레이션.
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
    kind: "internal",
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
  {
    id: "special-02",
    slug: "jay-choi-claude-code-9tips",
    titleKo: "신선한 컨텍스트가 비대한 컨텍스트를 이긴다 — Jay Choi 800시간 9가지 꿀팁 정리",
    titleEn: "Fresh Context Beats Bloated Context — Curating Jay Choi's 9 Tips from 800 Hours",
    summary:
      "Claude Code 800시간을 쓴 Jay Choi가 \"하지 말 것·해야 할 것·매일 쓰는 실전\" 9가지로 압축한 영상을 빌더 스쿨이 슬라이드로 정리. 원전 thesis는 \"신선한 컨텍스트 > 비대한 컨텍스트\". 좋은 걸 다 깔고 다 시키는 게 답이 아니라, 안 할 것을 안 하고 진짜 필요한 것만 명시적으로 시키는 게 답이다.",
    product: "Claude Code",
    format: "interactive-slides",
    estimatedMinutes: 12,
    reviewBy: "2026-11-30",
    volatility: "volatile",
    status: "published",
    kind: "external",
    source: {
      author: "Jay Choi",
      originalTitle: "클로드 코드 800시간 쓰고 깨달은 9가지 꿀팁",
      url: "https://youtu.be/hXlB1QstQ-Y",
      medium: "video",
      publishedAt: "2026-04",
      channel: "인디해커 라이프",
    },
    tags: [
      "claude-code",
      "context-engineering",
      "harness-engineering",
      "skills",
      "external-curation",
    ],
  },
  {
    id: "special-03",
    slug: "castle-claude-code-6-skills",
    titleKo: "모델은 실행하고, 사람은 결정한다 — 캐슬 클로드 코드 6가지 스킬 정리",
    titleEn: "Model Executes, Human Decides — Curating Castle's 6 Essential Claude Code Skills",
    summary:
      "캐슬 채널의 41페이지 슬라이드 \"클로드 코드를 제대로 쓰는 6가지 스킬\"을 빌더 스쿨이 9장으로 압축. 원전 thesis는 \"모델은 실행하고, 사람은 결정한다. 6가지 스킬은 그 결정을 선명하게 만드는 도구다\". grill-me·to-prd·to-issues·caveman·handoff·improve-codebase — 매일 쓰는 6단계 루틴.",
    product: "Claude Code",
    format: "interactive-slides",
    estimatedMinutes: 14,
    reviewBy: "2026-11-30",
    volatility: "volatile",
    status: "published",
    kind: "external",
    source: {
      author: "캐슬 (아는 개발자)",
      originalTitle: "바이브 코딩은 이렇게 하셔야 합니다 (필수 스킬 6개)",
      url: "https://youtu.be/lo9VmozeTxg",
      medium: "video",
      publishedAt: "2026-05",
      channel: "아는 개발자 | 캐슬",
    },
    tags: [
      "claude-code",
      "prd-workflow",
      "context-engineering",
      "token-optimization",
      "deep-module",
      "external-curation",
    ],
  },
];
