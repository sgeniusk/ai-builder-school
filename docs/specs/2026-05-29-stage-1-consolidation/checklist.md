# Stage 1 통합 — Checklist

각 단계 끝에 `npm run check` 그린 확인. dev 떠 있으면 먼저 kill.

## 단계 0 — 준비
- [x] context-notes.md 작성
- [x] checklist.md 작성

## 단계 1 — 이동 (콘텐츠 손실 없음, 가장 안전) ✅ 완료 2026-05-29
- [x] `cost-monitoring-in-production` → Stage 6 (운영 축)
  - [x] lesson-stage-mapping.ts: stage-1 제거 → stage-6 ordinal 19
  - [x] stages.ts: stage-1 lessonSlugs/subGroup(1b) 제거, stage-6 운영 축에 추가
  - [x] EXPECTED stage-1 14→12 / stage-6 18→20
- [x] `ai-collaboration-mindset` → Stage 6 (공유 축, ordinal 20)
- [x] stage-1 설명문 개수(12/1b5/1c1) + estimatedHours 12 갱신
- [x] `npm run check` 그린 (140 페이지)
- [ ] (후속) 이동한 두 레슨 본문의 level·Stage1 의존 표현 점검 — 추후

## 단계 2 — 삭제(흡수) ✅ 완료 2026-05-29
- [x] 흡수: Human-in-the-loop(단계별 사람/AI 배치) → ai-delegation-decision MDX에 섹션 추가. (근거요구·회고는 Stage 2/회고에 이미 있어 생략)
- [x] 레슨 제거: lessons.ts 객체(4–86행) / 매핑 / stages.ts(목록+1a) / lesson-bodies.ts(import+registry) / mdx+outputs
- [x] 잔여 참조 정리: journeys(2) 제거, prerequisites(4) 제거/리포인트, ontology teaches 엣지 → 위임 레슨, MDX 인터링크 3개 → 위임 레슨
- [x] EXPECTED stage-1 12→11, 총계 91→90, 1a 6→5
- [x] `npm run check` 그린 (139 페이지)

## 단계 3 — 병합: 서비스 + 챗봇기능 ✅ 완료 2026-05-29
- [x] ai-service-landscape를 "AI 도구 고르고 익히기"로 재구성 (고르기 2갈래 + 익히기 공통6기능). 해요체·번호미션·ai-tool-map.md
- [x] 구독 vs API는 병합 레슨에 압축 유지(고르기의 일부) + "실제 세팅은 계정·비용 레슨" 안내. (account 레슨 이관은 생략 — context-notes 참고)
- [x] ai-chat-features-basics 삭제: lessons.ts 객체 / 매핑 / stages(목록+1a) / lesson-bodies / mdx+outputs / journeys
- [x] EXPECTED stage-1 11→10, 총계 90→89, 1a 5→4 + 재번호(1b 5-9, 1c 10)
- [x] `npm run check` 그린 (138 페이지)

## 단계 4 — 확장: 개발 환경 비교 ✅ 완료 2026-05-29
- [x] `zero-coding-orientation` → "AI를 쓰는 네 가지 환경(웹앱·데스크탑·IDE·CLI)"로 재구성. 해요체·번호미션·ai-env-map.md
- [x] 옛 "8단계 사다리/12 Phase" 표현 → 6 Stage로 수정
- [x] terminal-first-day 유지(개념 1 + 실습 1), git/github 유지(2개) — 잠정 결정대로
- [x] `npm run check` 그린 (138 페이지)

## 단계 5 — 마무리 ✅ 완료 2026-05-29
- [x] 1a subGroup shortDescription 갱신(서비스/챗봇 → 도구 고르고 익히기)
- [x] stage-1 개수 표기 10개 / 1a(4)·1b(5)·1c(1) / estimatedHours 10
- [x] 전체 `npm run check` 그린 (138 페이지)
- [x] 브라우저 확인

## 최종 결과
- Stage 1: 14 → **10개** (1a 4 · 1b 5 · 1c 1)
- 총 레슨: 91 → **89개**, 정적 페이지 138
- 이동(→S6) 2 · 삭제 1 · 병합 −1(2→1) · 확장 1(zero-coding 재구성)

## 후속 과제 (이번 범위 밖, 추후)
- [ ] 이동한 cost-monitoring / collaboration-mindset 본문을 S6(advanced) 맥락에 맞게 손질 + level 점검
- [ ] 나머지 Stage 1 레슨(터미널·git·github·계정·위임) 본문 해요체 전환 (현재 한다체)
- [ ] git-basics + github-essentials 병합 여부 최종 결정
- [ ] 전체 레슨 제목 줄글 → 명사구 스윕 (Stage 2~6)
