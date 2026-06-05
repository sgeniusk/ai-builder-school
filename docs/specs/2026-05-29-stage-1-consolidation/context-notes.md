# Stage 1 통합 — Context Notes

> 2026-05-29 시작. Stage 1 레슨 중복 과다를 줄이고 레슨당 질을 높이는 구조 재편.
> 이번 "강의 업그레이드" 취지의 연장선 (호흡·어조·7스텝 자연스러움 + 중복 제거).

## 배경 / 취지
- Stage 1이 14개로 비대하고, 특히 **비용**이 3개 레슨에 흩어져 있었음.
- 입문 Stage에 안 맞는 주제(프로덕션 비용 모니터링, 팀 변화관리)가 섞여 있었음.
- 목표: 14 → 약 8~9개. 레슨당 밀도·질 상승.

## 확정된 결정 (사용자 승인 2026-05-29)
1. **이동** `cost-monitoring-in-production` → Stage 6 (운영 축). 프로덕션 주제라 입문에 안 맞음.
2. **이동** `ai-collaboration-mindset` → Stage 6 (공유 축). 팀 저항·변화관리는 입문자에 이름.
3. **삭제(흡수)** `common-skills-of-future-proof-people` — 가장 약한 레슨.
   - 판단·검증·학습 포인트는 `ai-delegation-decision` + 1강(`what-it-means-to-use-ai`) 프레이밍으로 흡수.
4. **병합** `ai-service-landscape` + `ai-chat-features-basics` → "AI 도구 고르고 익히기" 1개.
   - 구독 vs API 축은 `ai-tool-account-and-cost`로 이관.
5. **확장(재구성)** 터미널/오리엔 → **"개발 환경 비교"** 레슨.
   - CLI 환경(터미널, Claude Code·Codex CLI 등) vs IDE 환경(Cursor·VS Code) vs 데스크탑앱 vs 웹앱.
   - `zero-coding-orientation` 흡수.

## 열린 결정 (진행하며 확정)
- `terminal-first-day`(명령어 10개 실습): "개발 환경 비교" 뒤에 **실습 레슨으로 유지** vs 환경 레슨에 흡수. → 잠정: 유지(개념 1 + 실습 1).
- `git-basics-and-terminology` + `github-essentials`: 병합 vs 유지. → 사용자가 환경 비교로 방향을 틀어 미확정. → 잠정: **유지(2개)**, 추후 결정.
- 어조: 새/수정 레슨 본문은 모두 **해요체**(존댓말)로 통일 (이전 합의).

## 어조·템플릿 규칙 (이번 업그레이드에서 확립)
- 본문 = 해요체, 수능 강사 에너지("자,", "여기가 포인트예요"), 핵심만 굵게(페이지당 몇 곳).
- 본문은 미션을 담지 않음 (빌드 단계가 미션 소유). 깨달음에서 끝내고 buildIntro가 받음.
- `mission`은 번호 과제(1./2./3.) 형식 → 빌드 단계에서 인라인 체크박스로 렌더(MissionChecklist).
- 제목은 간결한 명사구(줄글 금지). Stage 제목만 문장 허용.

## 최종 목표 Stage 1 형태 (잠정)
1a 원리 (5): AI와의 첫 만남 · LLM의 원리 · 토큰·컨텍스트·비용 · AI 도구 고르고 익히기(병합) · 위임 판단(흡수)
1b 도구 (3~4): 개발 환경 비교(확장) · [터미널 첫날?] · Git·GitHub · AI 계정·비용
→ 14개에서 8~9개로.

## 영향 파일 (매 구조 변경 시 같이 손봐야)
- `src/content/lessons.ts` — 레슨 객체
- `src/content/lesson-stage-mapping.ts` — stageId/ordinal/subgroup + EXPECTED_STAGE_DISTRIBUTION + EXPECTED_TOTAL_LESSONS
- `src/content/stages.ts` — stage.lessonSlugs + subGroups[].lessonSlugs + 개수 표기/estimatedHours
- `src/content/lesson-bodies.ts` — MDX import/registry (삭제·병합 시)
- `src/content/lessons/<slug>.mdx` + `<slug>/outputs/`
- 게이트: `npm run check` (dev 떠 있으면 먼저 kill — build가 .next.nosync 공유)

## 위험 / stop point
- 레슨 삭제·이동·이름변경 = stop point. (이미 승인받음)
- slug 이름변경 금지(파일 rename) — slug는 유지하고 title만 바꾼다.
