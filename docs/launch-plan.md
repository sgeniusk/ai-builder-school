# AI Builder School — 서비스 런칭 계획

> 목표 — **AI Builder School v0.4를 정식 서비스로 런칭한다.**
> 작업 단위는 stage별 PR. 진행 상세는 GitHub PR description 참고.

---

## 1. 한눈에 보는 현재 상태

13 Phase → 8 Stage 사다리로 전환 + 각 stage를 "한 권의 책"으로 보완 완료.

| 영역 | 상태 |
|---|---|
| 데이터 모델 | ✅ Stage 단일 모델·validate 게이트 |
| 콘텐츠 (Stage 1~8) | ✅ **8 Stage 전부 책 보완 완료 — 84 lesson** |
| UI | ✅ `/stages` 라우트·계단형 사다리·journeys/projects de-phase |
| 배포 | ✅ GitHub Pages(상시) + Vercel(PR preview) |
| Phase legacy | ✅ **완전 제거 (STEP 1 완료) — Stage 단일 모델** |

**stage별 lesson 분포 — 7-10-5-17-11-16-9-9 = 84.**

| Stage | lesson | 산출물 |
|---|:-:|---|
| 1 AI와 만나다 | 7 | 매일 쓰는 AI 도구 1개 |
| 2 AI에게 물어보다 | 10 | 개인 프롬프트 라이브러리 |
| 3 AI의 답을 확인하다 | 5 | 검증 루프 1개 |
| 4 AI와 함께 일하다 | 17 | 자동화·콘텐츠·분석 산출물 |
| 5 AI에게 일감을 주다 | 11 | AI 페어로 만든 PR |
| 6 AI 시스템을 만들다 | 16 | 챗봇/RAG/Agent 1개 |
| 7 AI 시스템을 운영하다 | 9 | 운영 SLO 1개 |
| 8 AI 시스템을 공유하다 | 9 | 공개 URL + 회고 글 |

---

## 2. 런칭까지 — 3단계

### STEP 1. 코드 정리 — Phase legacy 제거 ✅ 완료 (#18)
런칭 전 죽은 코드를 걷어냈다. 사용자에게 안 보이지만 유지보수·신뢰성에 직결.
- ✅ `/curriculum` 라우트 · `phases.ts` · `Phase` 타입 삭제
- ✅ 죽은 컴포넌트 제거 — `LessonSidebar`·`CurriculumShell`·`CurriculumToc`·`PhaseCard` 등
- ✅ `LessonShell`·`JourneyRail`·`LessonToc`·`Character*` 체인을 Stage 모델로 전환
- ✅ `lesson.phaseId` · `journey.recommendedPhases` · `project.requiredPhases` 필드 제거
- ✅ legacy 헬퍼(`getPhases`·`getProjectsByPhaseSlug` 등) 제거
- ✅ `lesson.id` 재번호 (`lesson-NN` → `lesson-{S}{XX}`)
- ✅ 본문·도구 스크립트의 "Phase" 잔재 정리

### STEP 2. 품질 검증 — 베타 테스트 반영 (진행 중)
- ✅ 20인 페르소나 베타 테스트 결과 수령 — `docs/persona-reviews/2026-05-16-synthesis.md` + 페르소나 20장
- ✅ High 우선순위 4건 반영
	- `ai-tool-account-and-cost` — 무료 한도 트랙 / 유료 API 트랙 두 갈래로 (Stage 1 이탈 최대 원인)
	- `zero-coding-orientation` — 본문 "12 Phase 지도" 표 → 8 Stage 사다리 표
	- `terminal-first-day` — Windows 분기 보강 (PowerShell·Git Bash·WSL 결정 가이드)
	- `/start` Founder 첫 미션 → `connect-ai-api` 대신 Stage 1 lesson
- ⏳ Med·Low 우선순위(추천 lesson 빈약, 모바일 코드블록 wrap, 신규 lesson 등) → v0.5로 이관

### STEP 3. 런칭 — production 배포
- §3 런칭 체크리스트 통과
- production 도메인 배포, 공개

---

## 3. 런칭 체크리스트

**콘텐츠**
- [x] 8 Stage · 84 lesson 모두 본문·미션·산출물 채워짐
- [x] 모든 lesson "다음 레슨" 연결문, 모든 stage intro/outro 에세이
- [x] `npm run validate` 그린 (분포 7-10-5-17-11-16-9-9 = 84)
- [ ] `npm run eval` (Tier 3) 구조 경고 검토
- [ ] `npm run eval:rubric` (LLM 루브릭) 내용 품질 리포트 검토 — flag 우선순위 반영

**코드·기술**
- [x] Phase legacy 완전 제거 (STEP 1)
- [x] `npm run check` 그린 — lint·typecheck·validate·build
- [ ] GitHub Pages·Vercel production 빌드 정상
- [ ] 깨진 링크 없음 (lesson 연결문·stage 라우트)

**제품·UX**
- [ ] 홈 → /stages → stage 상세 → lesson → 다음 lesson 동선 끊김 없음
- [ ] 모바일 렌더 점검 (계단 사다리·lesson 본문)
- [ ] 6 journey 추천 경로가 실제 stage로 연결
- [x] 베타 테스트 High 우선순위 개선 반영 (4건)

**SEO·메타**
- [ ] 각 페이지 metadata(title·description)
- [ ] OG 이미지·favicon·sitemap

---

## 4. 확정된 결정 (불변)

| 항목 | 결정 |
|---|---|
| 공통 캐릭터 | 가상 인물 없음. 학습자 본인("당신") + 연결문으로 연속성 |
| 신규 lesson | N1~N11 + C1~C12 = 23개 (61 → 84). **전부 완료** |
| PR 분할 | stage별 1 PR |
| legacy 전략 | Phase 보존하다 STEP 1에서 일괄 제거 |
| 배포 | GitHub Pages(main 상시) + Vercel(PR preview). 임의 배포 안 함 |

---

## 5. 진행 로그 (요약)

머지 완료 — #5 데이터골격 · #6~17 D1~D8(84 lesson 완성) · #18 Phase legacy 제거 · #20 LLM 루브릭 eval · #21 코드블록 복사버튼 · #22 MDX Phase 잔재 정리 · #23 eval Gemini provider

다음 — STEP 2 베타 High 반영 머지 → 런칭 체크리스트(STEP 3)
