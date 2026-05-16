---
persona: 백지호
slug: 2026-05-16-fullstack-to-ai
journey: Engineer
level: L2
test-days: 10
verdict: "부분 완주"
nps: 7
---

## 페르소나 프로필

백지호, 37세. 10년차 풀스택. 자바·노드·파이썬·인프라까지 두루 다뤘고 최근 2년은 Next.js·Postgres·AWS 조합으로 SaaS를 굴렸다. 회사가 AI 기능 도입을 검토하면서 본인이 먼저 한 바퀴 돌아본다는 동기다. 의심도 높다. "정말 빌더 중심인가, 결국 ChatGPT 사용법 모음 아닌가"를 10일 내내 들고 들어왔다. 매일 60분, 데스크톱 한 대로 진지하게 검증했다.

## 10일 일지

- D1, 랜딩·각 Journey 페이지 정독. Engineer 추천 6 lesson 카피 검수.
- D2, Stage 1 통째로. L01·L02는 본인엔 너무 기초라 빠르게 스킵.
- D3, Stage 2~3 압축 통과. 할루시네이션·프롬프트 구조는 회사 가이드로 재사용 메모.
- D4, Stage 4 본인 도구 박스 정비. Cursor·Claude Code·Codex CLI 비교 노트 작성.
- D5, Stage 5 진입. `coding-agent-setup`·`claude-md-four-principles` 통과. 회의적이지만 인용 출처 부재가 거슬림.
- D6, Stage 5·L08 `harness-engineering-roadmap`. 본인 회사 백엔드 파이프라인과 매핑 시도.
- D7, Stage 6·6a `connect-ai-api`. env·요금 알림 흐름이 깔끔하다고 평가.
- D8, 6a `conversation-storage-design`. Postgres + pgvector 안내가 친숙.
- D9, 6a `auth-and-user-sessions`. NextAuth·Clerk·Supabase Auth 선택지 비교 부재에서 멈춤.
- D10, 6a `long-term-memory-state`. "55분 · 심화" 시간 가정이 비현실이라 판단, Stage 6·6a 종료 시점에서 테스트 종료.

## 진척 결과

- 진행률 가중 평균 약 55%.
- 완료 lesson 약 46/84, Stage 7 시작 전.
- 산출물 — 도구 비교 메모, API 연결 데모, 대화 저장 스키마(Postgres), 권한 설계 초안.
- 회고 노트 9개, 검증 체크리스트 6개. 검증 비중이 평균 페르소나보다 높다.

## 막힌 지점 인용(3+)

1. Stage 6·6a L05 `auth-and-user-sessions` 카드 "로그인·세션 유지·사용자별 데이터 격리의 기본 구조" — NextAuth, Clerk, Supabase Auth, Lucia 같은 실제 선택지를 비교하지 않고 "기본 구조"만 추상으로 설명. 풀스택 학습자가 가장 원하는 게 선택지 비교다.
2. Stage 6·6a L06 `long-term-memory-state` 카드 "55분 · 심화" — pgvector·요약 메모리·툴 호출 캐시까지 55분이면 끝나기 어렵다. 시간 표기를 신뢰하기 어려워졌다.
3. Stage 7 lesson 9개에 운영 단계 lesson(관측·평가 루프·비용 가시화 등)이 흩어져 있어 Stage 6 끝낸 사람이 다음 단계로 이어가는 흐름이 약하다. Stage 사다리 카피("운영하다")가 약속하는 만큼의 응집이 부족.
4. Engineer 추천 lesson "AI와 함께 구현 계획 세우기 · Codex/Claude Code로 테스트 만들기 · 근거가 있는 RAG 답변 만들기 · 미니 에이전트 루프 만들기 · 도구 권한과 안전장치 설계하기 · Prompt Injection 방어 기초" — 6개가 다 좋은데 "운영 후 평가" 한 줄이 없어 시니어가 따라갈 끝맺음이 안 보인다.

## UI/UX 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정보 구조 | 4.0 | 8 Stage 사다리는 강함, Stage 7 응집은 약함 |
| 시각 디자인 | 3.8 | 카드 톤 일관, lesson 메타데이터(난이도·시간) 폰트 작음 |
| 모바일 반응형 | 3.6 | 본인은 데스크톱이지만 출퇴근 점검에서 사이드바 가중치 깨짐 확인 |
| 네비게이션 | 4.0 | 사다리·6 Journey 더블 네비가 직관적 |
| 진척 표시 | 3.8 | 가중 평균 표시는 좋으나 Stage 단위 진척과 lesson 단위 진척 합산 기준 불투명 |
| 로딩·성능 | 3.8 | 마크다운 본문 첫 페인트가 살짝 늦다 |

평균 3.83.

## 콘텐츠 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 실용성 | 4.0 | 6a 전반은 실무에 즉시 이식 가능 |
| 깊이 | 3.6 | 시니어 입장에서 선택지 비교 부재로 얕다 느낌 |
| 코드 정확성 | 4.0 | 보여준 코드는 동작, 단 버전 명시 부재 |
| 학습 순서 | 3.8 | 빌드→운영 전환 다리(Stage 6→7)가 약함 |
| 산출물 명확성 | 3.8 | 산출물 파일명은 좋고, 검증 기준 체크리스트는 부족 |

평균 3.84.

## lesson 미시 피드백(6+)

- `connect-ai-api` — env 분리·요금 알림 흐름 정석. 멀티 프로바이더 추상 한 단락 추가 권장.
- `conversation-storage-design` — Postgres 스키마 예제 명료. 멀티테넌시 한 줄 보강 필요.
- `auth-and-user-sessions` — 라이브러리 비교표 한 장이 필수.
- `long-term-memory-state` — 55분 가정 비현실, 두 lesson으로 분할 권장.
- `function-calling` — 권한·감사 로깅까지 묶여 시니어가 만족.
- `claude-md-four-principles` — Karpathy 65줄 인용 출처를 본문 각주로.
- `harness-engineering-roadmap` — 6단계 각각을 mini-lesson으로 분기, 시니어용 "skip to 4단계" 링크 제공.

## 종합 의견

10년차 풀스택이 의심을 안고 들어왔는데, 학교가 약속한 "AI를 쓰는 사람에서, AI로 만드는 사람으로"가 진짜 빌드 lesson에서는 잘 지켜진다고 봤다. Stage 6·6a "AI API를 안전하게 앱에 연결하고 스트리밍·구조화 UX를 구현한다"는 카피는 거짓이 아니다. 그러나 시니어 시점에서 두 가지가 약하다. 첫째, 선택지 비교가 빠져 있다. 풀스택은 이미 만들 수 있는 사람이라 "어떻게 만드는가"보다 "무엇을 골라 만드는가"가 가치다. 둘째, Stage 6→7 다리가 약하다. 학교의 사다리 8단 중 "운영하다·공유하다"는 시니어에게 핵심인데 lesson이 흩어져 있어 다음 단계로 이어가기 망설여진다. 결과적으로 6a 끝에서 멈췄다.

## 개선 제안 3개

1. Stage 6·6a L05·L06을 각각 "선택지 비교 카드"와 "심화 분할(2 lesson)"로 재편. 라이브러리 비교는 표 1개만 있어도 시니어 신뢰가 확 오른다.
2. Stage 7 안에 "운영 트랙 마이크로 사다리"를 둬 9 lesson을 관측·평가·비용·릴리스 4묶음으로 묶고, Engineer 여정 추천에 "Stage 7 운영 트랙 1 lesson"을 끼워 끝맺음을 만들어 준다.
3. lesson 카드의 "55분 · 심화" 표기 옆에 "실제 빌드 시간 90~120분 (참고)" 보조 라벨을 시니어용 옵션으로 표기, 시간 기대 관리.
