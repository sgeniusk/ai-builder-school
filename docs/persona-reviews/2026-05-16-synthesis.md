# AI Builder School — 20인 베타 테스트 종합 보고서

## 1. 테스트 개요
- 기간(시뮬레이션) — 10일 · 페르소나 20명
- 테스트 사이트 — https://sgeniusk.github.io/ai-builder-school/
- 사이트 버전 — v0.4 · 8 Stage 사다리 · 84 lesson · 6 Journey · 7-step 학습 루프
- 시뮬레이션 시점 — 2026-05-16
- 데이터 소스 — 페르소나별 보고서 20장(2026-05-16-{slug}.md) + 마스터 카드 1장(00-persona-master.md)

## 2. 페르소나 20명 요약표
| P# | 이름 | Journey | 능력 | 완주 여부 | UI/UX 평균 | 콘텐츠 평균 | NPS |
|---|---|---|---|---|---|---|---|
| P01 | 박서윤 | Practitioner | L1 | 부분 완주 | 4.0 | 3.8 | 7 |
| P02 | 최도훈 | Practitioner | L0 | 중도 이탈 | 2.8 | 2.8 | 4 |
| P03 | 김지수 | Practitioner | L2 | 완주 | 4.2 | 4.2 | 8 |
| P04 | 이현우 | Practitioner | L1 | 부분 완주 | 3.4 | 3.6 | 6 |
| P05 | 정연주 | Adopter | L1 | 부분 완주 | 3.8 | 4.0 | 7 |
| P06 | 한승호 | Adopter | L0 | 중도 이탈 | 2.4 | 2.6 | 3 |
| P07 | 윤소영 | Adopter | L2 | 완주 | 4.4 | 4.2 | 9 |
| P08 | 박나래 | Creator | L0 | 부분 완주 | 3.4 | 3.4 | 6 |
| P09 | 임도경 | Creator | L1 | 부분 완주 | 4.0 | 4.2 | 8 |
| P10 | 송지원 | Creator | L1 | 중도 이탈 | 3.2 | 3.4 | 5 |
| P11 | 강민혁 | Founder | L3 | 완주 | 4.4 | 4.6 | 9 |
| P12 | 노현지 | Founder | L1 | 부분 완주 | 3.2 | 3.6 | 5 |
| P13 | 서지훈 | Founder | L2 | 완주 | 4.2 | 4.0 | 8 |
| P14 | 류재훈 | Engineer | L3 | 부분 완주 | 3.6 | 3.6 | 6 |
| P15 | 김태성 | Engineer | L3 | 부분 완주 | 3.4 | 3.2 | 5 |
| P16 | 오은비 | Engineer | L2 | 완주 | 4.0 | 4.0 | 8 |
| P17 | 백지호 | Engineer | L2 | 부분 완주 | 3.8 | 3.8 | 7 |
| P18 | 장수아 | Explorer | L0 | 부분 완주 | 3.6 | 3.8 | 7 |
| P19 | 문지영 | Explorer | L1 | 부분 완주 | 4.0 | 4.2 | 8 |
| P20 | 조은서 | Explorer | L0 | 중도 이탈 | 2.6 | 3.0 | 3 |

## 3. 핵심 지표
- 완주율 — 6/20 = **30%** (10일 안에 자기 여정 추천 Stage를 절반 이상 마침 기준)
- 부분 완주 — 9/20 = 45%
- 중도 이탈 — 5/20 = 25%
- 평균 도달 Stage — **Stage 4.25**(8단계 중 절반 직후)
- UI/UX 전체 평균 — **3.62 / 5**
- 콘텐츠 전체 평균 — **3.70 / 5**
- 평균 NPS — 약 **6.3**
- NPS 분포(0~10 표준) — 추천자(9–10) 10% · 중립자(7–8) 45% · 비추천자(0–6) 45% · **순 NPS −35**
- 능력별 완주율 — L3 33%(1/3) · L2 60%(3/5) · L1 0%(0/7) · L0 20%(1/5). L1이 가장 약한 구간
- 능력별 UI 평균 — L0 2.96 · L1 3.66 · L2 4.12 · L3 3.80. 능력이 올라갈수록 UI 평가가 좋아지다가 L3에서 살짝 꺾임(이미 익숙한 콘텐츠가 시간 낭비로 느껴진 영향)

## 4. 공통 막힌 지점 (언급 빈도순)
| 순위 | 막힌 지점 (lesson/페이지) | 언급 페르소나 수 | 요약 |
|---|---|---|---|
| 1 | `ai-tool-account-and-cost` (S1·L03) | 6 — P02 P08 P10 P12 P18 P20 | Stage 1·L03에서 GitHub·OpenAI API·Codex CLI 셋을 동시에 깔고 결제 카드 등록까지 요구. 입문자·학생·매장 운영자에게 진입 장벽이 가장 크게 잡힘 |
| 2 | `terminal-first-day` (S1·L02) — Windows 분기 | 4 — P01 P02 P06 P12 | "PowerShell 또는 Git Bash 설치" 한 줄로 끝남. 어느 걸 고를지·왜 그런지 결정 가이드 부재. Mac/Windows 분기 설명 분량 차이 큼 |
| 3 | `zero-coding-orientation` (S1·L01) "12개 Phase 전체 지도" | 4 — P01 P06 P11 P20 | 사이트는 "8단계 사다리"인데 lesson 본문 후반에 "12개 Phase 전체 지도" 표가 등장. 일관성 깨짐. L0는 혼란, L3는 신뢰감 하락 |
| 4 | `coding-agent-setup` (S5·L01) | 3 — P04 P05 P12 | Stage 4까지 코드 없이 따라온 사용자가 Stage 5에서 갑자기 코딩 에이전트 셋업으로 점프. 단절이 큼 |
| 5 | `connect-ai-api` (S6·L01) | 2 — P12 P17 | Founder /start 첫 미션으로 점프하는 lesson인데 본문은 Next.js 서버 라우트. "코드보다 시장이 본업"이라는 Founder 카피와 정반대 |
| 6 | `custom-gpt-builder` (S4·L05) | 3 — P03 P05 P19 | ChatGPT Plus 결제 가정. 회사 보안 정책상 결제 불가한 사용자·교사·회계사 막힘 |
| 7 | `figma-ai-ui-variation-workflow` (S4·L11) | 2 — P09 P10 | Creator 여정인데 Figma 미보유자에게 진입 장벽 |
| 8 | `mini-agent-loop` (S6·L12) | 2 — P11 P14 | "Thought/Action/Observation 5–15회 반복"만 적혀 있고 종료 조건 코드 베이스라인·토큰 폭발 통제 부재 |
| 9 | `auth-and-user-sessions` (S6·L05) | 1 — P17 | NextAuth·Clerk·Supabase Auth 선택지 비교 부재 |
| 10 | `cost-monitoring-in-production` (S1·L04) | 2 — P02 P10 | Stage 1에서 "프로덕션"이라는 단어가 입문자에게 위협적 |

## 5. 능력 단계별 차이
- **L0 완전 입문(5명, 완주 1명)이 겪은 고유 문제**
	- Stage 1·L01에서 "코딩 에이전트"라는 단어 자체에 멈춤(P06 P20). 영업·간호사·제조업 임원은 "코드 짤 일이 없는" 사람들인데 첫 lesson이 "터미널이 왜 필요한가"로 시작
	- API 키 발급의 결제 카드 단계가 Stage 1·L03에 등장(P08 P18 P20). 학생·매장 운영자에게 진입 장벽
	- 모바일 사용자(P02 P06 P20)는 코드 블록·표가 가로 스크롤되어 가독성 깨짐
- **L3 숙련자(3명, 완주 1명)가 느낀 부족함**
	- Stage 1~3이 너무 길어 시간 낭비(P11 P14 P15). "L3용 건너뛰기 권장 경로"가 없음
	- Stage 6·6c `mini-agent-loop`·`tool-permission-safeguards`의 프레임은 좋지만 운영 인프라(IAM·async·cache) 매핑 부재(P14 P15)
	- Stage 7 평가·관측 lesson 분량 부족. Promptfoo·Langfuse가 카드에만 등장하고 본문은 개념 위주(P15)
- **능력별로 갈리는 결정적 lesson**
	- `coding-agent-setup` (S5·L01) — L0·L1에게 단절, L2·L3에게는 자연스러움
	- `figma-ai-ui-variation-workflow` (S4·L11) — Creator 직군 안에서도 디자인 도구 보유 여부로 갈림
	- `mini-agent-loop` (S6·L12) — L2는 따라오지만 L3는 "이걸로 부족"이라고 평가

## 6. Journey별 경험 차이
- **Practitioner(4명, 완주 1·부분 2·이탈 1)** — Stage 1~4·4a까지 추천 경로가 가장 매끄러움. 다만 추천 5 lesson에 콘텐츠·데이터 분석을 한 사람이 다 따라가긴 부담. 약속을 지키는 편이지만 Windows·모바일 친화성이 약점
- **Adopter(3명, 완주 1·부분 1·이탈 1)** — 추천이 4 lesson으로 가장 빈약. 조직 도입에 필요한 lesson(`responsible-ai-policy-template`, `prompt-injection-defense`)이 Stage 7에 흩어져 한 흐름으로 안 읽힘. P07 같은 L2 PM은 잘 흡수하지만 L0·L1은 길을 잃음
- **Creator(3명, 완주 0·부분 2·이탈 1)** — 가장 빈약한 추천(3 lesson). Stage 4·4b 자체는 강력하지만 그 전 Stage 1~3 마찰이 모바일·디자이너에겐 너무 큼. `figma-ai-ui-variation-workflow`가 Creator 안에서 분기 발생
- **Founder(3명, 완주 2·부분 1)** — /start의 Founder 첫 미션이 `connect-ai-api`로 점프하는 게 문제. L3는 완주하지만 L1은 첫 클릭에서 막힘. "코드보다 시장과 가치가 본업인 사람" 카피와 실제 첫 lesson의 거리가 큼
- **Engineer(4명, 완주 1·부분 3)** — Stage 6·6a·6b는 강력, 6c는 깊이 부족. 본업 운영 인프라와의 매핑(캐싱·async·IAM) 부재. L3 두 명이 모두 부분 완주에 그친 이유
- **Explorer(3명, 완주 0·부분 2·이탈 1)** — "흡수하면서 동시에 나눕니다" 카피는 매력적이지만 실제로 가르치는 자료(슬라이드·워크시트) 0개. 학생 무료 트랙 부재. 추천 5 lesson 중 4개가 Stage 1~3에 몰려 있어 Stage 4 이후 다양성을 못 봄

## 7. lesson 이탈 히트맵
| lesson slug | 시도 인원 | 이탈 인원 | 이탈률 | 비고 |
|---|---|---|---|---|
| `zero-coding-orientation` | 20 | 1 | 5% | P06 — Stage 1·L01에서 종료 |
| `terminal-first-day` | 19 | 1 | 5% | P02 — Windows 분기 멈춤 |
| `ai-tool-account-and-cost` | 18 | 2 | 11% | P20 P10 — API 결제 단계 종료 |
| `cost-monitoring-in-production` | 16 | 1 | 6% | P02 — "프로덕션" 단어로 종료 |
| `common-skills-of-future-proof-people` | 15 | 0 | 0% | Explorer·Practitioner 모두 호평 |
| `ai-collaboration-mindset` | 13 | 0 | 0% | Adopter 추천 lesson, 호평 |
| `structure-of-good-prompts` | 13 | 0 | 0% | Stage 2 진입 마찰 적음 |
| `hallucination-verification` | 12 | 0 | 0% | Stage 3 핵심, 호평 |
| `checks-before-trusting-ai-output` | 12 | 0 | 0% | Adopter·Practitioner 호평 |
| `automate-report-drafts` | 9 | 0 | 0% | Stage 4·4a 진입 lesson, 호평 |
| `custom-gpt-builder` | 8 | 2 | 25% | P05 P19 — ChatGPT Plus 결제 막힘 |
| `multi-workflow-orchestration` | 7 | 1 | 14% | P04 — 무게감 부담 |
| `figma-ai-ui-variation-workflow` | 5 | 1 | 20% | P10 — Figma 미보유 |
| `coding-agent-setup` (S5) | 7 | 1 | 14% | P12 — Stage 5 점프에서 종료 |
| `connect-ai-api` (S6) | 6 | 1 | 17% | P17 — 후속 lesson에서 이탈 |
| `mini-agent-loop` | 5 | 0 | 0% | 부족함 비판 다수, 완료는 함 |

## 8. UI/UX 종합 진단
- **가장 강한 점 3가지**
	- 일관된 한국어 어조 — "AI를 쓰는 사람에서, AI로 만드는 사람으로" 같은 카피가 첫 5초 인상을 잡음. L0·L1·교사가 공통적으로 "친근해서 일단 클릭하게 된다"고 평
	- 7-step 학습 루프(문제→개념→미션→빌드→검증→산출물→회고)가 lesson마다 같은 리듬으로 반복돼 사용자가 "지금 어디" 인지를 쉽게 잡음
	- 진척 표시 디테일 — "Stage 01 진행 0/7 레슨 / 커리큘럼 0/84 완료 / 0% 가중 평균(빌드 50 · 검증 30 · 회고 20)"이 학습 의지를 자극. P18·P19 같은 학생·교사가 호평
- **가장 약한 점 3가지**
	- 8 Stage vs 12 Phase 명칭 불일치 — `zero-coding-orientation` 본문 후반의 "12개 Phase 전체 지도" 표. 사이트 전역은 "8단계 사다리"이고 이 표만 12 Phase. L0는 혼란, L3는 신뢰감 하락
	- Windows·모바일 친화성 — `terminal-first-day`의 Windows 분기 한 줄, 코드 블록 가로 스크롤. 모바일 주 사용자 5명 중 4명이 마찰 지점으로 지목
	- 학습 시간 표시의 일관성 — 25분 lesson과 60분 lesson이 같은 시각 가중치로 보임. 점심 30분 학습자(P04 P19 P20)에게 어느 lesson을 들어갈지 가이드 부재
- **모바일 사용자 전용 이슈**
	- 코드 블록(`pwd` `ls -la` `mkdir`) 가로 스크롤 — P02 P06 P10 P20 모두 지적
	- 표(코딩 에이전트 vs 일반 챗봇)가 모바일에서 줄바꿈 안 되고 가로 스크롤
	- 사이드바 "☰커리큘럼" "≡이 레슨" 토글이 있긴 하지만 lesson 페이지 안에서 사용자가 자기 진척을 보려면 두 번 토글 필요
	- 폰트 — 50대(P20)가 본문 폰트 작다고 평. line-height는 충분하지만 글자 크기 조정 옵션 없음

## 9. 우선순위 개선 목록
| 우선순위 | 개선 항목 | 영향 받는 페르소나 | 근거 | 제안 |
|---|---|---|---|---|
| **High** | Stage 1·L03 `ai-tool-account-and-cost`를 두 갈래로 — "유료 API 트랙"과 "무료 한도 트랙" | P02 P08 P10 P12 P18 P20 (6명) | Stage 1 이탈의 가장 큰 원인. 카드 등록이 첫 Stage에 등장 | 무료 한도(Claude 무료·ChatGPT 무료·Groq 무료 등)로만 진행 가능한 분기 추가. "Stage 5 이후에 API 결제" 라우트 |
| **High** | `zero-coding-orientation` 본문의 "12개 Phase 전체 지도" 표 제거 또는 "8 Stage 매핑"으로 교체 | P01 P06 P11 P20 (4명, 사실상 모든 L0와 L3) | 사이트 전역과 명백한 불일치. 신뢰감 하락 | 표 자체를 삭제하거나, 8 Stage 사다리 카드와 동일한 8행 표로 재작성 |
| **High** | `terminal-first-day` Windows 분기를 Mac 분량과 동등하게 보강 | P01 P02 P06 P12 (4명) | "PowerShell 또는 Git Bash 설치" 한 줄로는 부족. 회사 노트북이 Windows인 학습자가 절반 이상 | PowerShell vs Git Bash 결정 가이드(주의: WSL 옵션도 짧게) 박스, 첫 명령어 예시를 양쪽 모두로 |
| **High** | /start 페이지의 Founder 첫 미션을 `connect-ai-api`에서 `coding-agent-setup` 또는 더 가벼운 lesson으로 | P12 (Founder L1) | Founder 카피는 "코드보다 시장이 본업"인데 첫 미션은 Next.js 서버 라우트 | Founder 첫 미션을 `common-skills-of-future-proof-people` → `automate-report-drafts` 순으로 |
| **Med** | Adopter 추천 lesson을 4 → 6개로 — `responsible-ai-policy-template`·`prompt-injection-defense`를 추천에 정식 편입 | P05 P07 (Adopter 2명) | Adopter 여정 추천이 가장 빈약. 조직 도입의 핵심 lesson이 추천에 없음 | Stage 7 lesson 중 정책·보안 2개를 Adopter 추천에 명시 |
| **Med** | Creator 추천 lesson을 3 → 5개로. SEO·플랫폼 알고리즘 lesson 추가 신설 | P08 P09 P10 (Creator 3명) | "5 Stage · 3 레슨"으로 가장 빈약. 콘텐츠 자동화의 절반 부재 | `seo-with-ai`, `algorithm-aware-publishing` 같은 lesson 신설 검토 |
| **Med** | Explorer 여정에 "학생-교사 보조자료" 별도 트랙 — 슬라이드·워크시트 템플릿 1세트 | P18 P19 P20 (Explorer 3명) | "흡수하면서 가르치는 빌더" 카피와 실제 보조자료 0개의 갭 | `teach-judgment-checklist`(공통역량 학생용 학습지), `present-ai-literacy`(45분 수업 슬라이드) |
| **Med** | Stage 4·L05 `custom-gpt-builder`를 ChatGPT 비결제 대안과 함께 — Claude Projects·Gemini Gems 분기 추가 | P03 P05 P19 (3명) | 회사 보안 정책상 ChatGPT Plus 결제 불가 사용자 다수 | "ChatGPT Plus가 불가능할 때" 박스를 lesson 안에 |
| **Med** | 모바일 코드 블록 가로 스크롤 → wrap 옵션 또는 토글 | P02 P06 P08 P10 P20 (모바일 주 사용자 5명) | 모바일에서 명령어가 잘려 보임 | `<pre>` 요소에 word-wrap 토글 버튼, 50대 페르소나(P20)를 위한 폰트 크기 +1px 옵션 |
| **Med** | Engineer 추천 lesson에 캐싱·async·rate-limit lesson 추가 | P14 P15 (L3 2명) | 본업 운영 인프라와의 매핑 부재 | `caching-and-rate-limit`, `async-batch-llm` lesson 신설 검토 |
| **Low** | L3용 "건너뛰기 권장 경로" — 능력별 추천 진입점 | P11 P14 P15 (L3 3명) | Stage 1~3가 시간 낭비로 느껴짐 | /start에 "이미 알아요 → L3 빠른 진입" 옵션, Stage 1~3 lesson에 "L3는 건너뛰기 OK" 배지 |
| **Low** | `mini-agent-loop` 종료 조건 코드 예시·토큰 폭발 통제 추가 | P11 P14 (2명) | "5–15회 반복"만 적힘. 실무 적용 어려움 | 종료 조건 휴리스틱 4가지(최대 step 수·반복 출력 감지·예산 한도·사용자 중단) 코드 예시 |
| **Low** | lesson 시간 표시에 "최소 / 권장" 두 값으로 — 가용 시간 30분 학습자용 | P04 P19 P20 (3명) | "55분 · 심화" 한 값만 보면 점심 30분에 들어갈 수 없음 | "최소 25분(개념만) / 권장 55분(미션 끝까지)" 식 분리 |

## 10. 한 문단 총평
이 사이트는 **시간 60분 이상·끈기 상·의심 상의 L2~L3 학습자**(P03 P07 P11 P13 P16)에게 가장 잘 맞고, 그들에겐 8 Stage 사다리·7-step 학습 루프·진척 가중치가 정확히 약속을 지킨다. 하지만 자기 카피에서 가장 큰 약속인 "코딩 0, 프롬프트 0이라도 OK"는 현재 절반만 지켜진다 — Stage 1·L03의 API 결제 카드 등록, L01 본문의 12 Phase 표, L02의 Windows 분기 빈약, /start의 Founder 첫 미션 단절이 함께 쌓이면서 L0와 모바일 사용자를 놓치고 있다. Adopter·Creator·Explorer 여정은 추천 lesson 수가 빈약해 "어느 길로 갈지 모르겠다"는 신호가 반복된다. 가장 큰 기회는 **Stage 1을 두 갈래로 — 유료 API 트랙과 무료 한도 트랙 — 으로 가르고**, **Windows·모바일을 Mac과 동등하게** 다루는 것이다. 이 두 가지만 잡으면 완주율 30%는 50% 가까이 올라갈 여지가 충분하다.
