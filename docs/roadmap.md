# AI Builder School — v1.0 로드맵

> 현재 **v0.5** (정식 런칭 완료) · 목표 **v1.0**.
> 작업 단위는 마일스톤별 PR. 진행 상세는 GitHub PR description 참고.

---

## 1. 한눈에 보는 현재 상태 — v0.5

v0.4 런칭 작업을 모두 마치고 v0.5로 올렸다. 사이트는 GitHub Pages에 상시 배포 중.
https://sgeniusk.github.io/ai-builder-school/

| 영역 | 상태 |
|---|---|
| 콘텐츠 | ✅ 8 Stage · 84 lesson · 13 project |
| 데이터 모델 | ✅ Stage 단일 모델 (Phase legacy 완전 제거) |
| UI | ✅ 계단형 사다리 · 프로젝트 상세 페이지 · 코드블록 복사 |
| SEO·메타 | ✅ metadata · OG 이미지 · favicon · sitemap · robots |
| 베타 반영 | ✅ 20인 페르소나 테스트 High 4건 반영 |
| 배포 | ✅ GitHub Pages(상시) + Vercel(PR preview) |

**제약 — 정적 export 사이트.** 서버·DB가 없다. 모든 인터랙티브 기능은 클라이언트(localStorage·클라이언트 컴포넌트·사용자 본인 API 키)로만 구현한다.

---

## 2. v0.6 → v1.0 마일스톤

### v0.6 — 다듬기·접근성 ✅ 완료
v0.4 베타에서 v0.5로 미룬 Med/Low + 접근성·편의.
- ✅ 다크(야간) 모드 (#29)
- ✅ 모바일 코드블록 가로 스크롤 → wrap 토글 (#30)
- ✅ 사이트 검색 — 커맨드 팔레트 (#31)
- ✅ 베타 Med 콘텐츠 — Adopter·Creator 추천 lesson 보강, `custom-gpt-builder` 비결제 대안 (#32)
- ⏳ 후속(Low) — L3 건너뛰기 경로, lesson 시간 "최소/권장" 표기

### v0.7 — 빌더 정체성 레이어 ✅ 완료
이미 localStorage로 도는 진척·캐릭터를 동기 부여 시스템으로 키웠다.
- ✅ 빌더 대시보드 `/me` — 전체·여정·Stage별 진척, 이어서 볼 레슨 (#35)
- ✅ 학습 스트릭 — 연속 학습일 추적 (#36)
- ✅ 빌더 카드 — 진척을 이미지로 내보내 공유·인증샷 (#37)
- ✅ 캐릭터 성장 — 완료 레슨 수 기반 6단계 빌더 랭크 (#38)
- ⏳ 후속 — 캐릭터 동물 아바타 아트 확장(꾸미기)

### v0.8 — 레슨 경험·모션
- 레슨 메모·책갈피 (localStorage)
- 스크롤 모션 — 히어로·레슨 등장 애니메이션, 프롬프트 타이핑 효과
- 디자인 일관성 패스

### v0.9 — 프롬프트 연습장 (flagship)
읽는 학교에서 직접 해보는 학교로.
- 레슨 안에서 직접 프롬프트를 쓰고 본인 API 키(Gemini/Claude)로 실제 호출
- 키는 localStorage에 저장, 클라이언트에서 직접 호출 — 정적 사이트 유지

### v1.0 — 마감
- `npm run eval:rubric` 품질 패스 — 낮은 점수 레슨 flag 반영
- 전체 회귀·접근성·디자인 마감
- 정식 v1.0 공개

---

## 3. 인터랙티브 기능 — 마일스톤 배치

| 기능 | 마일스톤 | 구현 방식 |
|---|---|---|
| 다크(야간) 모드 | v0.6 | CSS 토큰 + localStorage |
| 사이트 검색 | v0.6 | 빌드 타임 인덱스 + 클라이언트 검색 |
| 빌더 대시보드 + 공유 카드 | v0.7 | localStorage + canvas 이미지 |
| 학습 스트릭 / 오늘의 레슨 | v0.7 | localStorage |
| 캐릭터 랜덤·성장·꾸미기 | v0.7 | localStorage |
| 학습 인증샷 | v0.7 | canvas/OG 스타일 이미지 |
| 레슨 메모·책갈피 | v0.8 | localStorage |
| 스크롤 모션·타이핑 효과 | v0.8 | IntersectionObserver |
| 프롬프트 연습장 (BYO 키) | v0.9 | 클라이언트 fetch + localStorage 키 |

---

## 4. 확정된 결정 (불변)

| 항목 | 결정 |
|---|---|
| 배포 | GitHub Pages(main 상시 정적 export) + Vercel(PR preview) |
| 인터랙티브 | 서버 없이 — localStorage·클라이언트·BYO 키만 |
| 공통 캐릭터 | 가상 인물 없음. 학습자 본인("당신") |
| 콘텐츠 게이트 | `npm run validate`(차단) · `eval`·`eval:rubric`(advisory) |
| PR 분할 | 마일스톤 안에서도 기능별 1 PR |

---

## 5. 진행 로그

**v0.4 → v0.5 완료** — 8 Stage 전환 · 84 lesson · Phase legacy 제거 · SEO·메타 · 13 project 확장 · 베타 High 반영 · 코드블록 복사 버튼 · LLM 루브릭 eval (PR #5~#27)

**v0.6 완료** — 다크 모드 · 코드블록 wrap 토글 · 사이트 검색(커맨드 팔레트) · 베타 Med 콘텐츠 (PR #28~#32)

**v0.7 완료** — 빌더 대시보드 `/me` · 학습 스트릭 · 빌더 카드 공유 · 캐릭터 랭크 (PR #35~#38). 곁들여 템플릿 7→24 확장(#34)

**다음** — v0.8 레슨 경험·모션
