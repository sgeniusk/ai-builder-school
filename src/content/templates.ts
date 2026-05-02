import type { ContentTemplate } from "@/lib/types";

export const templates: ContentTemplate[] = [
  {
    id: "tpl-4axis-prompt",
    slug: "four-axis-prompt",
    title: "4축 프롬프트 템플릿",
    kind: "prompt",
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    summary: "Task / Context / Constraints / Output을 분리해 쓰는 재현 가능한 프롬프트.",
    body: `# Task
(AI가 해야 하는 최종 결과물)

# Context
- 사용자:
- 배경:
- 이미 알고 있는 것:

# Constraints
- 톤/문체:
- 길이:
- 금지 사항:

# Output
- 형식:
- 예시:`,
    tags: ["prompt", "structure"],
  },
  {
    id: "tpl-codex-mission",
    slug: "codex-mission-template",
    title: "Codex 미션 템플릿",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "Codex에게 주는 실행 가능한 작업지시서.",
    body: `# Goal
무엇을 완료해야 하는가.

# Context
- 관련 파일:
- 관련 이슈/PR:
- 관습/스타일 가이드:

# Steps
1. 탐색: 관련 파일 나열
2. 계획: 변경 파일과 테스트 전략
3. 구현: 최소 변경
4. 검증: 테스트/린트/타입체크 실행

# Acceptance
- 테스트 통과
- 변경 파일 목록 출력
- 위험 지점 요약`,
    tags: ["mission", "codex"],
  },
  {
    id: "tpl-claude-mission",
    slug: "claude-code-mission-template",
    title: "Claude Code 미션 템플릿",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "Claude Code에게 주는 계획→구현→검증 미션 프롬프트.",
    body: `# Claude Code Mission
- Target: <작업 이름>
- Scope: <범위 정의>

# Steps
1. Plan: 변경 파일 목록과 테스트 전략 출력
2. Implement: 최소 변경
3. Verify: \`npm run lint\`, \`npm run typecheck\`, \`npm run build\`

# Stop Points
- 외부 API 키 필요 시 작업 중단 후 질문
- 파일 삭제 전 사용자 확인 요구`,
    tags: ["mission", "claude"],
  },
  {
    id: "tpl-rag-checklist",
    slug: "rag-checklist",
    title: "RAG 품질 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "founder"],
    summary: "RAG 앱이 배포 가능한지 검사하는 기본 체크리스트.",
    body: `- [ ] 모든 답에 최소 1개 출처가 표시됨
- [ ] 출처가 실제 청크와 일치
- [ ] 근거 없는 질문에 답을 거부
- [ ] 청킹 전략이 문서화됨
- [ ] 하이브리드 검색 평가가 있음
- [ ] 사용자 피드백 경로가 존재
- [ ] 비용 시뮬레이션이 존재`,
    tags: ["rag", "checklist"],
  },
  {
    id: "tpl-agent-checklist",
    slug: "agent-checklist",
    title: "에이전트 안전 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "founder"],
    summary: "도구 사용 에이전트를 배포 전에 확인할 항목.",
    body: `- [ ] 도구별 권한이 allow/deny 리스트로 명시됨
- [ ] 위험 동작 앞에 사람 확인 단계가 있음
- [ ] 최대 스텝/타임아웃이 설정됨
- [ ] 사용자 입력과 시스템 지시가 분리됨
- [ ] 외부 콘텐츠 주입이 격리됨
- [ ] 모든 도구 호출에 로그가 남음
- [ ] 실패 시 복구 경로가 있음`,
    tags: ["agents", "checklist", "security"],
  },
  {
    id: "tpl-security-checklist",
    slug: "ai-service-security-checklist",
    title: "AI 서비스 보안 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "adopter", "founder"],
    summary: "AI 제품을 공개하기 전 기본적인 보안·프라이버시 점검.",
    body: `- [ ] 키/시크릿이 서버에만 존재
- [ ] 사용자 입력 PII 마스킹 정책
- [ ] 출력에 PII/민감정보가 반복 저장되지 않음
- [ ] 프롬프트 인젝션 회귀 테스트 존재
- [ ] 레이트 리밋/과금 한도 설정
- [ ] 감사 로그(audit log) 보관 기간 정의
- [ ] 사용자 데이터 삭제 요청 처리 경로`,
    tags: ["security", "checklist"],
  },
  {
    id: "tpl-judgment-checklist",
    slug: "ai-judgment-checklist",
    title: "AI 사용 판단 체크리스트",
    kind: "checklist",
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    summary: "AI 결과를 업무에 쓸지 말지 5분 안에 결정하기 위한 질문.",
    body: `- [ ] 이 결과를 내가 직접 검증했는가
- [ ] 출처가 있는가 / 출처를 확인했는가
- [ ] 가정이 명시되었는가
- [ ] 내 책임 영역 밖을 건드리는가
- [ ] 수치/고유명사가 실제와 일치하는가
- [ ] 편향이 있을 만한 입력이었는가
- [ ] 실패 시 누가 책임지는가가 분명한가`,
    tags: ["literacy", "checklist"],
  },
];
