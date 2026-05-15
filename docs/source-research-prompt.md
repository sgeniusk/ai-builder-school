# Codex Mission: AI Builder School 레슨 근거 자료 조사

> 이 문서는 다른 코딩 에이전트(특히 Codex CLI)에게 그대로 건네는 작업지시서다.
> 작업 결과는 `docs/source-research-output.md`로 저장되어, AI Builder School 본 작업자가 레슨에 인용·주석으로 통합한다.

---

## 0. 큰 그림

AI Builder School 의 5개 발행 레슨은 현재 **저자(Claude)의 합성 본문**으로 작성되어 있다.
권위 부여 + 학습자 검증 가능성 확보를 위해 각 기술적 주장에 외부 출처를 매핑해야 한다.

당신(Codex)의 임무: **리서치 + 출처 매핑만**. 본문 수정 금지.

---

## 1. 컨텍스트

- **Repo path** (사용자 로컬): `/Users/taewookkim/Library/Mobile Documents/com~apple~CloudDocs/Creative OS/AI Builder School`
- **Stack**: Next.js 15 + MDX 3, 정적 사이트
- **레슨 데이터**:
  - 메타: `src/content/lessons.ts` (32개 lesson 객체 배열)
  - 본문: `src/content/lessons/<slug>.mdx`
- **이번 조사 대상 5개 레슨** (이미 발행됨):
  1. `common-skills-of-future-proof-people` (Phase 1, lesson-01)
  2. `what-llms-are-good-and-bad-at` (Phase 1, lesson-02)
  3. `hallucination-verification` (Phase 1, lesson-03)
  4. `checks-before-trusting-ai-output` (Phase 1, lesson-04)
  5. `structure-of-good-prompts` (Phase 2, lesson-05)

각 레슨의 본문(MDX)와 메타(lessons.ts)를 먼저 읽어서 **검증해야 할 주장 목록**을 추출한 뒤 조사를 시작한다.

---

## 2. 환각 절대 금지 (가장 중요한 규약)

이 학교가 가르치는 핵심 주제 자체가 환각 검증이다. 그 학교의 출처를 만들면서 환각을 만들면 자기모순이다.

**STRICT rules**:

- 출처 URL을 추측하지 마라. **반드시 실제로 열어 본** URL만 인용한다 (Codex 환경의 web 도구로 fetch).
- 논문 제목·저자·연도를 짜내지 마라. Google Scholar 또는 arXiv로 **실제 검색**해 첫 결과를 인용한다.
- 검증 못 한 주장에 출처를 만들지 마라. 다음 마커를 사용한다:

```
[NO CONFIRMED SOURCE — needs editorial review]
```

- 한국어 자료가 있으면 그 자료를 우선 (학습자 한국인 기준).
- "Smith & Lee (2021) ..." 같은 형식의 가짜 인용을 만들지 마라 (Lesson 03이 다루는 환각의 정확한 사례다).

---

## 3. 우선 출처 (ranked)

신뢰도 순:

1. **공식 문서 (DOC)** — Anthropic docs, OpenAI cookbook, Google AI docs 등
2. **학술 논문 (PAPER)** — arXiv preprint OK, peer-reviewed 우선
3. **공식 엔지니어링 블로그 (BLOG)** — Anthropic Engineering, OpenAI Engineering, Google DeepMind blog
4. **신뢰 가능한 개인 블로그** — Simon Willison, Andrej Karpathy, Latent Space 등 명시 인물
5. **출판된 책 (BOOK)** — DOI 또는 ISBN 명기
6. **위키피디아 (WIKI)** — 정의 한정, 주장 근거로는 부적합

**금지**: 익명 미디엄 글, 개인 노션 페이지, GPT 생성 글.

---

## 4. 조사할 주장 — 레슨별

### Lesson 01 · common-skills-of-future-proof-people
- "Human-in-the-loop" 개념 정의·기원
- "근거 요구 (cite-required)" 프롬프트 패턴
- AI 사용 회고 / 메타인지 학습 루프 — 학습 과학 근거

### Lesson 02 · what-llms-are-good-and-bad-at
- LLM 작동 원리 — next-token prediction, 패턴 일반화
- 컨텍스트 창 (Context Window) — 주요 모델별 한계 (Claude / GPT / Gemini 최신 수치)
- 확률적 생성 — temperature, sampling 메커니즘
- Knowledge cutoff — 모델별 컷오프 날짜 / 공식 발표
- 강한/약한 작업 분류 — 학술/산업 사례 (산수 약함, 코드 강함 등)

### Lesson 03 · hallucination-verification
- Hallucination 정의 + intrinsic/extrinsic 분류 (학술적 정의)
- **Chain of Verification (CoVe)** — Meta AI 2023 논문 (Dhuliawala et al.)
- Citation-required prompting — Anthropic 공식 가이드 또는 prompt engineering 자료
- Confidence calibration — temperature scaling, "verbalized confidence" 논문
- "AI는 모른다고 말하는 능력이 약하다" — refusal training, RLHF 관련 자료

### Lesson 04 · checks-before-trusting-ai-output
- 5-axis trust framework (Fact / Origin / Scope / Confidence / Bias) — 유사 프레임워크 있는지
- 도메인별 LLM 위험 — 의료 (Med-PaLM 평가), 법률 (Stanford CodeX), 금융 사례
- Trust Floor / Ceiling 개념 — 신뢰 위계 / risk tiering 사례 (실무·학술)

### Lesson 05 · structure-of-good-prompts
- Prompt structure (Task / Context / Constraints / Output) — Anthropic prompt engineering guide
- Few-shot prompting — Brown et al. 2020 (GPT-3 논문)
- Reproducibility in LLMs — temperature 0 / seed 옵션 / 공식 docs
- Structured output — OpenAI JSON mode, Anthropic tool use, Zod 패턴
- "예시 한 줄이 가장 강하다" — instruction tuning / in-context learning 학술 근거

---

## 5. 출력 형식

**`docs/source-research-output.md`** 파일을 새로 생성한다 (덮어쓰기 금지 — 같은 파일이 있으면 `-v2` 등 suffix).

각 레슨마다 다음 구조:

```
## Lesson <NN> · <slug>

### Claim: "<원문에서 발췌한 주장 한 문장>"
- **MDX 위치**: src/content/lessons/<slug>.mdx (선택: 라인/문단)
- **Type**: DOC | PAPER | BLOG | BOOK | WIKI | NONE
- **Title**: <자료 제목>
- **Authors / Org**: <저자 또는 조직>
- **Year**: <YYYY>
- **URL**: <실제 검증된 URL>
- **Quote** (≤200 chars, 원문 발췌):
  > ...
- **Confidence**: high | medium | low
- **Note**: <필요 시 한국어 주석 1줄>
```

각 주장에 가능하면 **2개 이상 출처**를 나열 (공식 1 + 학술 1 권장).

검증 불가 시:
```
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review]
```

---

## 6. 절차 (Codex가 따를 순서)

1. **Inspect** — 다음 파일을 읽는다:
   - `src/content/lessons.ts` (lesson-01~05의 메타 객체)
   - `src/content/lessons/common-skills-of-future-proof-people.mdx`
   - `src/content/lessons/what-llms-are-good-and-bad-at.mdx`
   - `src/content/lessons/hallucination-verification.mdx`
   - `src/content/lessons/checks-before-trusting-ai-output.mdx`
   - `src/content/lessons/structure-of-good-prompts.mdx`

2. **Extract claims** — 각 MDX/메타에서 출처가 필요한 사실 주장을 추출. 이 문서 §4의 목록을 출발점으로 하되, 본문에서 추가 발견되는 주장도 포함.

3. **Research** — 우선 §3 ranked 순서대로. 각 주장당 ≥1개 출처. 검증 불가는 NONE 표시.

4. **Compose output** — `docs/source-research-output.md`에 §5 형식으로 저장.

5. **Self-check** — 출력 파일을 본인이 다시 읽고:
   - 모든 URL이 200을 반환하는지 확인
   - 가짜로 만들어낸 인용이 없는지 재확인
   - 한 주장당 최소 1개 출처가 있는지 또는 NONE 표시가 있는지

---

## 7. 작업 외 제약 (Stop points)

- **본문 수정 금지** — `*.mdx` / `lessons.ts` / 다른 코드 파일 일체 손대지 마라. output md 한 개만 생성.
- **`npm install` 실행 금지** — 새 의존성 추가 안 함.
- **`git commit` 금지** — 사용자가 결과를 확인 후 별도로 커밋한다.
- **environments / secrets 접근 금지**.

---

## 8. 시간 / 분량 가이드

- 레슨당 약 30~60분 분량의 리서치 (전체 ~3~5시간)
- 한 주장당 출처 1~3개 (너무 많으면 주된 1개 + 추가 보조)
- 인용문(Quote)는 영문이라도 OK — 통합 시 한국어로 옮길 것은 사용자가 결정

---

## 9. 완료 신호

작업 끝에 다음을 한국어로 출력하면 완료로 간주:

```
✓ Source research 완료
- 검증 출처: <N>건
- NONE (조사 불가): <M>건
- 결과 파일: docs/source-research-output.md
- 다음 액션: 사용자가 lessons MDX에 주석으로 통합
```

---

## 10. 마지막 한 줄

당신이 출처를 만들어내는 순간, 이 학교의 환각 방지 레슨 자체가 무너진다.
모르는 건 모른다고. 출처 없는 주장은 NONE으로.
