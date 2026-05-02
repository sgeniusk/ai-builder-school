import type { Journey } from "@/lib/types";

/**
 * 6개의 출발 여정.
 *
 * 학교의 약속 — "출발점이 어디든, 빌더가 됩니다."
 *
 * Practitioner / Adopter / Creator / Founder / Engineer 는 같은 차원의 출발 정체성.
 * Explorer 는 "아직 정하지 못한 사람을 위한 30초 진단" 의 메타 입구.
 */
export const journeys: Journey[] = [
  {
    id: "practitioner",
    slug: "practitioner",
    title: "Practitioner",
    titleKo: "실무자",
    identity: "일에 AI를 붙이는 사람",
    targetLearner:
      "보고서·이메일·회의록·리서치를 매일 다루는 직장인. AI를 자기 일에 깔아 시간을 되찾고 싶은 사람.",
    promise:
      "내 업무를 AI로 운영해서, 반복은 줄이고 판단에 시간을 씁니다.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-1-ai-literacy",
      "phase-2-prompt-engineering",
      "phase-3-ai-work-os",
      "phase-9-data-decision",
      "phase-10-evals-security",
    ],
    recommendedLessons: [
      "common-skills-of-future-proof-people",
      "structure-of-good-prompts",
      "automate-report-drafts",
      "meeting-notes-pipeline",
      "research-workflow",
    ],
    capstoneIdeas: [
      "주간 보고서 초안 자동 파이프라인",
      "팀 회의록 자동 정리 봇",
      "사내 위키 기반 5분 Q&A 노트",
    ],
    expectedOutcome:
      "AI 업무 플레이북 + 팀에 공유 가능한 프롬프트 세트, 매주 5시간 이상의 시간 회복.",
  },
  {
    id: "adopter",
    slug: "adopter",
    title: "Adopter",
    titleKo: "도입자",
    identity: "조직에 AI를 들여오는 사람",
    targetLearner:
      "조직의 의사결정·프로세스·정책을 다루는 기획자/매니저. AI를 팀과 회사에 들여오는 책임을 지는 사람.",
    promise:
      "조직에 AI를 안전하게 들여오고, 위험과 품질을 함께 운영합니다.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-1-ai-literacy",
      "phase-2-prompt-engineering",
      "phase-3-ai-work-os",
      "phase-9-data-decision",
      "phase-10-evals-security",
      "phase-11-product",
    ],
    recommendedLessons: [
      "checks-before-trusting-ai-output",
      "research-workflow",
      "ai-app-cost-and-usage",
      "prompt-injection-defense",
    ],
    capstoneIdeas: [
      "내부 AI 사용 가이드라인 v1",
      "팀 단위 AI 도입 12주 로드맵",
      "사내 정책 문서 기반 Q&A 봇",
    ],
    expectedOutcome:
      "조직 맞춤 AI 도입 플레이북 + 평가·보안 체크리스트 + 첫 파일럿 팀의 도입 사례.",
  },
  {
    id: "creator",
    slug: "creator",
    title: "Creator",
    titleKo: "크리에이터",
    identity: "AI로 콘텐츠를 만드는 사람",
    targetLearner:
      "블로그·뉴스레터·유튜브·숏폼 등을 운영하며 AI로 표현력과 속도를 키우려는 크리에이터.",
    promise:
      "AI를 부속으로 쓰지 않고, 표현의 폭을 넓히는 도구로 다룹니다.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-1-ai-literacy",
      "phase-2-prompt-engineering",
      "phase-3-ai-work-os",
      "phase-8-multimodal",
      "phase-11-product",
    ],
    recommendedLessons: [
      "structure-of-good-prompts",
      "blog-writing-pipeline",
      "research-workflow",
    ],
    capstoneIdeas: [
      "블로그 → 쇼츠 자동 파이프라인",
      "뉴스레터 AI 편집부 + 톤 일관성 가드",
      "개인 에디토리얼 OS (아이디어→발행)",
    ],
    expectedOutcome:
      "콘텐츠 자동화 파이프라인 1개 + 내 스타일 가이드 + 발행 빈도 2배.",
  },
  {
    id: "founder",
    slug: "founder",
    title: "Founder",
    titleKo: "파운더",
    identity: "AI로 제품·사업을 띄우는 사람",
    targetLearner:
      "AI로 제품·사업·사이드프로젝트를 띄우려는 솔로프리뉴어, 인디 해커, 1인 창업자. 코드보다 시장과 가치가 본업인 사람.",
    promise:
      "AI를 코어로 한 작은 제품을 직접 손으로 만들고, 시장에 내놓습니다.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-2-prompt-engineering",
      "phase-4-coding-agents",
      "phase-5-ai-app-dev",
      "phase-9-data-decision",
      "phase-11-product",
      "phase-12-capstone",
    ],
    recommendedLessons: [
      "coding-agent-setup",
      "github-issue-to-ai-brief",
      "connect-ai-api",
      "structured-output-handling",
      "ai-app-cost-and-usage",
      "capstone-plan-and-launch",
    ],
    capstoneIdeas: [
      "AI 코어 SaaS MVP (랜딩 + 결제 + 첫 10명 사용자)",
      "특정 직군 위한 GPT 래퍼 제품 (시장 검증 포함)",
      "사이드 프로젝트 → 첫 매출 100만원 도달기",
    ],
    expectedOutcome:
      "공개 URL로 배포된 제품 1개 + 비용 시뮬레이션 + 런칭 회고 + 첫 사용자 피드백 수집.",
  },
  {
    id: "engineer",
    slug: "engineer",
    title: "Engineer",
    titleKo: "엔지니어",
    identity: "AI 시스템을 깊게 짓는 사람",
    targetLearner:
      "RAG·Agents·Evals를 깊이 다루고 싶은 실무 개발자·ML 엔지니어·AI 시스템을 책임지는 사람.",
    promise:
      "평가·보안까지 포함된, 운영 가능한 AI 시스템을 짓는 엔지니어가 됩니다.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-2-prompt-engineering",
      "phase-4-coding-agents",
      "phase-5-ai-app-dev",
      "phase-6-rag",
      "phase-7-agents-mcp",
      "phase-10-evals-security",
      "phase-12-capstone",
    ],
    recommendedLessons: [
      "plan-with-ai",
      "write-tests-with-coding-agent",
      "grounded-rag-answers",
      "mini-agent-loop",
      "tool-permission-safeguards",
      "prompt-injection-defense",
    ],
    capstoneIdeas: [
      "Evals 대시보드가 붙은 RAG 시스템",
      "권한·로깅·복구가 포함된 미니 에이전트 플랫폼",
      "사내 코드베이스 인덱싱 + 코드 Q&A 봇",
    ],
    expectedOutcome:
      "검증·보안·배포가 모두 포함된 심화 캡스톤 + 회고 문서.",
  },
  {
    id: "explorer",
    slug: "explorer",
    title: "Explorer",
    titleKo: "탐험가",
    identity: "매일 배우고 매일 나누는 학생-교육자",
    targetLearner:
      "AI를 진지하게 처음 배우는 사람, 다섯 여정 중 어디에 정착할지 아직 모르는 호기심형 학습자. 또는 배운 것을 곧바로 누군가에게 가르치는 학생-교육자.",
    promise:
      "흡수하면서 동시에 나눕니다. 매일 배우고 매일 가르치는 빌더가 되는 길.",
    recommendedPhases: [
      "phase-0-setup",
      "phase-1-ai-literacy",
      "phase-2-prompt-engineering",
      "phase-3-ai-work-os",
    ],
    recommendedLessons: [
      "common-skills-of-future-proof-people",
      "what-llms-are-good-and-bad-at",
      "hallucination-verification",
      "checks-before-trusting-ai-output",
      "structure-of-good-prompts",
    ],
    capstoneIdeas: [
      "한 달 AI 학습 일지 → 동료 5명에게 공유",
      "내가 처음 배운 5개 프롬프트 → 사내 5분 발표",
      "Phase 1·2 회고를 블로그에 공개 — 누군가의 입구가 되기",
    ],
    expectedOutcome:
      "Phase 1·2를 마친 뒤 다섯 정체성 중 자기 자리를 자신 있게 고름 + 첫 학습 결과를 한 사람 이상에게 가르침으로 환원.",
  },
];
