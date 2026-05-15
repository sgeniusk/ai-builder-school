# AI Builder School 레슨 근거 자료 조사 결과

조사일: 2026-05-02  
범위: 발행 레슨 5개 (`lesson-01`~`lesson-05`)의 MDX 본문 및 `src/content/lessons.ts` 메타에서 출처가 필요한 기술적·학습과학적 주장만 매핑.  
원칙: 실제로 열어 확인한 공식 문서·논문·권위 자료만 사용. 확인하지 못한 주장에는 `NONE`을 표시.

---

## Lesson 01 · common-skills-of-future-proof-people

### Claim: "AI 산출물의 품질은 결국 사람의 검토 지점에서 결정됩니다. 어디에 사람을 끼울지 미리 정해둡니다."
- **MDX 위치**: `src/content/lessons/common-skills-of-future-proof-people.mdx:30`
- **Type**: PAPER
- **Title**: Human-in-the-loop machine learning: a state of the art
- **Authors / Org**: Eduardo Mosqueira-Rey et al.
- **Year**: 2022 / 2023
- **URL**: https://link.springer.com/article/10.1007/s10462-022-10246-w
- **Quote** (≤200 chars, 원문 발췌):
  > "interactions between humans and machine learning algorithms"
- **Confidence**: high
- **Note**: HITL을 "사람-ML 상호작용"의 우산 개념으로 설명하는 데 적합해요.

### Claim: "\"답의 각 주장에 출처를 함께 표기해 주세요. 확신이 없으면 '모르겠다'고 답하세요.\""
- **MDX 위치**: `src/content/lessons/common-skills-of-future-proof-people.mdx:42`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "Allow Claude to say \"I don't know\""
- **Confidence**: high
- **Note**: "모르면 모른다고 말하게 하라"는 프롬프트 패턴의 공식 근거.

### Claim: "답마다 출처를 요구하면 모호한 답을 실무에 섞는 상황이 사라집니다."
- **MDX 위치**: `src/content/lessons/common-skills-of-future-proof-people.mdx:48`
- **Type**: DOC
- **Title**: Citations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/build-with-claude/citations
- **Quote** (≤200 chars, 원문 발췌):
  > "track and verify information sources"
- **Confidence**: high
- **Note**: "출처 요구"가 검증 가능성을 높인다는 근거로 적합해요.

### Claim: "주 1회 AI 회고를 한 달만 쌓아두면, 프롬프트는 당신 업무에 맞게 진화합니다."
- **MDX 위치**: `src/content/lessons/common-skills-of-future-proof-people.mdx:50`
- **Type**: PAPER
- **Title**: Metacognition, Self Regulation, and Self-regulated Learning: A Rose by any other Name?
- **Authors / Org**: Susanne P. Lajoie
- **Year**: 2008
- **URL**: https://link.springer.com/article/10.1007/s10648-008-9088-1
- **Quote** (≤200 chars, 원문 발췌):
  > "metacognition, self-regulation, and self-regulated learning"
- **Confidence**: medium
- **Note**: 회고 루틴 자체보다는 메타인지·자기조절 학습의 이론적 근거로 연결 가능해요.

### Claim: "\"AI 시대에 뒤쳐지지 않는 사람들\"을 몇 십 명 인터뷰했을 때 공통점은 세 가지였습니다."
- **MDX 위치**: `src/content/lessons/common-skills-of-future-proof-people.mdx:28`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] 저자 자체 인터뷰라면 내부 근거 또는 표현 완화가 필요해요.

---

## Lesson 02 · what-llms-are-good-and-bad-at

### Claim: "모델은 본질적으로 다음에 올 토큰을 확률로 예측하는 기계입니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:7`
- **Type**: DOC
- **Title**: What are tokens and how to count them?
- **Authors / Org**: OpenAI Help Center
- **Year**: 2026 page access / living docs
- **URL**: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
- **Quote** (≤200 chars, 원문 발췌):
  > "convert the predicted tokens back"
- **Confidence**: high
- **Note**: 토큰 단위 처리와 생성 설명의 공식 근거.

### Claim: "LLM은 학습한 텍스트의 패턴을 잇는 데 강합니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:13`
- **Type**: PAPER
- **Title**: Language Models are Few-Shot Learners
- **Authors / Org**: Tom B. Brown et al.
- **Year**: 2020
- **URL**: https://arxiv.org/abs/2005.14165
- **Quote** (≤200 chars, 원문 발췌):
  > "few-shot demonstrations specified purely via text"
- **Confidence**: high
- **Note**: 예시와 문맥만으로 새 작업을 수행하는 in-context/few-shot 능력의 대표 논문.

### Claim: "컨텍스트 창에는 한계가 있고, 초과하면 품질이 떨어질 수 있습니다."
- **MDX 위치**: `src/content/lessons.ts:110`
- **Type**: DOC
- **Title**: Context windows
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/build-with-claude/context-windows
- **Quote** (≤200 chars, 원문 발췌):
  > "context window limit"
- **Confidence**: high
- **Note**: 최신 Claude 계열은 한도 초과 시 오류를 반환한다는 설명도 있어요.

### Claim: "주요 모델의 컨텍스트 창은 모델마다 다릅니다. 예: GPT-5.5 1M, GPT-5.4 1M, GPT-5.4 mini 400K."
- **MDX 위치**: `src/content/lessons.ts:110`
- **Type**: DOC
- **Title**: Models
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://developers.openai.com/api/docs/models
- **Quote** (≤200 chars, 원문 발췌):
  > "Context window 1M"
- **Confidence**: high
- **Note**: 2026-05-02 기준 공식 모델 페이지 확인. 숫자는 변경될 수 있어 날짜 주석 권장.

### Claim: "Claude Opus 4.7은 1M token context window를 지원합니다."
- **MDX 위치**: `src/content/lessons.ts:110`
- **Type**: DOC
- **Title**: What's new in Claude Opus 4.7
- **Authors / Org**: Anthropic
- **Year**: 2026
- **URL**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7
- **Quote** (≤200 chars, 원문 발췌):
  > "1M token context window"
- **Confidence**: high
- **Note**: 2026-05-02 기준 최신 Claude Opus 공개 모델의 컨텍스트 근거.

### Claim: "Gemini 2.0 Flash / 2.5 계열은 1M급 긴 컨텍스트를 제공합니다."
- **MDX 위치**: `src/content/lessons.ts:110`
- **Type**: DOC
- **Title**: Gemini models
- **Authors / Org**: Google AI for Developers
- **Year**: 2026 page access / living docs
- **URL**: https://ai.google.dev/gemini-api/docs/models
- **Quote** (≤200 chars, 원문 발췌):
  > "1M token context window"
- **Confidence**: high
- **Note**: 모델별 세부 수치는 같은 공식 페이지에서 재확인 필요.

### Claim: "LLM은 다음 토큰을 확률로 고르며, 같은 질문에 매번 다른 답이 나올 수 있습니다."
- **MDX 위치**: `src/content/lessons.ts:114`
- **Type**: DOC
- **Title**: Chat Completions API Reference
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://platform.openai.com/docs/api-reference/chat/create#chat-createtemperature
- **Quote** (≤200 chars, 원문 발췌):
  > "make the output more random"
- **Confidence**: high
- **Note**: temperature/top_p가 샘플링 무작위성에 미치는 영향을 설명하는 공식 근거.

### Claim: "Knowledge cutoff 이후의 사실은 외부 자료 없이는 안전하게 말하기 어렵습니다."
- **MDX 위치**: `src/content/lessons.ts:118`
- **Type**: DOC
- **Title**: Models
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://developers.openai.com/api/docs/models
- **Quote** (≤200 chars, 원문 발췌):
  > "Knowledge cutoff"
- **Confidence**: high
- **Note**: OpenAI는 모델 카드에 컷오프를 표시합니다. 예: GPT-5.5는 Dec 1, 2025, GPT-5.4는 Aug 31, 2025.

### Claim: "Claude 모델은 reliable knowledge cutoff와 training data cutoff를 구분합니다."
- **MDX 위치**: `src/content/lessons.ts:118`
- **Type**: DOC
- **Title**: Models overview
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/about-claude/models/overview
- **Quote** (≤200 chars, 원문 발췌):
  > "Reliable knowledge cutoff"
- **Confidence**: high
- **Note**: 4.5 계열 기준 공식 표 확인. Opus 4.7의 cutoff는 같은 표에서 아직 확인되지 않아 별도 재확인 필요.

### Claim: "Gemini 모델의 knowledge cutoff 공식 날짜"
- **MDX 위치**: `src/content/lessons.ts:118`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] Google Gemini API 모델 페이지에서 컨텍스트·토큰 한도는 확인했지만 knowledge cutoff 날짜는 확인하지 못했어요.

### Claim: "정확한 산수·결정적 다단계 계산은 LLM이 아니라 계산기/코드가 풀어야 할 문제입니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:27`
- **Type**: PAPER
- **Title**: Arithmetic Without Algorithms: Language Models Solve Math With a Bag of Heuristics
- **Authors / Org**: Yaniv Nikankin, Anja Reusch, Aaron Mueller, Yonatan Belinkov
- **Year**: 2024 / 2025 revision
- **URL**: https://arxiv.org/abs/2410.21272
- **Quote** (≤200 chars, 원문 발췌):
  > "neither robust algorithms nor memorization"
- **Confidence**: high
- **Note**: 산수 약점 설명에 잘 맞는 최신 해석 가능성 연구.

### Claim: "수치가 학습 데이터에서 더 자주 등장할수록 모델의 numerical reasoning 정확도가 달라질 수 있습니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:27`
- **Type**: PAPER
- **Title**: Impact of Pretraining Term Frequencies on Few-Shot Reasoning
- **Authors / Org**: Yasaman Razeghi, Robert L. Logan IV, Matt Gardner, Sameer Singh
- **Year**: 2022
- **URL**: https://arxiv.org/abs/2202.07206
- **Quote** (≤200 chars, 원문 발췌):
  > "frequency of terms"
- **Confidence**: high
- **Note**: "계산을 하는 듯 보이지만 패턴 빈도에 영향받는다"는 설명 보강용.

### Claim: "코드 생성·리팩터링은 LLM이 상대적으로 강한 영역입니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:41`
- **Type**: PAPER
- **Title**: Evaluating Large Language Models Trained on Code
- **Authors / Org**: Mark Chen et al. / OpenAI
- **Year**: 2021
- **URL**: https://arxiv.org/abs/2107.03374
- **Quote** (≤200 chars, 원문 발췌):
  > "study its Python code-writing capabilities"
- **Confidence**: high
- **Note**: 코드 능력의 초기 대표 논문. 최신 모델 수치와 함께 쓰면 더 안전해요.

### Claim: "분기마다 분류표를 다시 보면 모델 발전에 따라 약함/보조 가능/강함 칸이 이동합니다."
- **MDX 위치**: `src/content/lessons/what-llms-are-good-and-bad-at.mdx:55`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] 실천 조언으로는 자연스럽지만 외부 근거보다는 저자 프레임워크에 가까워요.

---

## Lesson 03 · hallucination-verification

### Claim: "AI가 존재하지 않거나 부정확한 정보를 사실처럼 만들어내는 현상."
- **MDX 위치**: `src/content/lessons.ts:191`
- **Type**: PAPER
- **Title**: Survey of Hallucination in Natural Language Generation
- **Authors / Org**: Ziwei Ji et al.
- **Year**: 2022 / ACM CSUR 2023
- **URL**: https://arxiv.org/abs/2202.03629
- **Quote** (≤200 chars, 원문 발췌):
  > "hallucinate unintended text"
- **Confidence**: high
- **Note**: 환각 정의·분류의 대표 서베이.

### Claim: "환각은 intrinsic/extrinsic 등으로 분류할 수 있습니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:25`
- **Type**: PAPER
- **Title**: Survey of Hallucination in Natural Language Generation
- **Authors / Org**: Ziwei Ji et al.
- **Year**: 2022 / ACM CSUR 2023
- **URL**: https://arxiv.org/abs/2202.03629
- **Quote** (≤200 chars, 원문 발췌):
  > "research progress and challenges"
- **Confidence**: medium
- **Note**: arXiv abstract는 전체 분류명을 직접 노출하지 않지만, 본 논문 본문에서 intrinsic/extrinsic 분류를 확인해 인용 가능해요.

### Claim: "모델은 '그럴듯한 다음 토큰'을 골라 잇기 때문에 존재하지 않는 논문 인용을 만들 수 있습니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:15`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "factually incorrect"
- **Confidence**: high
- **Note**: 환각이 사실 오류와 문맥 불일치를 만들 수 있다는 공식 설명.

### Claim: "AI는 '모른다'라고 말하는 능력이 약하므로, '모름'이라는 출구를 프롬프트에 만들어야 합니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:21`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "admit uncertainty"
- **Confidence**: high
- **Note**: Lesson 03의 핵심 문장과 직접 연결돼요.

### Claim: "출처를 못 찾으면 답을 거부하게 하는 Citation-required 프롬프트는 환각을 줄이는 기본 방어 패턴입니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:39`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "Verify with citations"
- **Confidence**: high
- **Note**: "출처 없으면 철회/거부" 패턴의 공식 근거.

### Claim: "이 두 줄이 환각의 70%를 막습니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:46`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] Anthropic은 “drastically reduce”라고 설명하지만 70% 수치는 확인하지 못했어요.

### Claim: "Chain of Verification은 답→검증 질문→독립 답변→최종 수정의 자기 검증 패턴입니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:48`
- **Type**: PAPER
- **Title**: Chain-of-Verification Reduces Hallucination in Large Language Models
- **Authors / Org**: Shehzaad Dhuliawala et al.
- **Year**: 2023
- **URL**: https://arxiv.org/abs/2309.11495
- **Quote** (≤200 chars, 원문 발췌):
  > "plans verification questions"
- **Confidence**: high
- **Note**: 레슨의 4단 루프 구조와 거의 직접 대응해요.

### Claim: "CoVe는 단일 호출보다 환각을 줄입니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:59`
- **Type**: PAPER
- **Title**: Chain-of-Verification Reduces Hallucination in Large Language Models
- **Authors / Org**: Shehzaad Dhuliawala et al.
- **Year**: 2023
- **URL**: https://arxiv.org/abs/2309.11495
- **Quote** (≤200 chars, 원문 발췌):
  > "decreases hallucinations"
- **Confidence**: high
- **Note**: CoVe 효과 주장에 직접 사용 가능.

### Claim: "모델에게 0~100 신뢰도와 근거를 함께 요청하면 낮은 신뢰도 답을 분리하는 데 도움이 됩니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:61`
- **Type**: PAPER
- **Title**: Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores from Language Models Fine-Tuned with Human Feedback
- **Authors / Org**: Katherine Tian et al.
- **Year**: 2023
- **URL**: https://arxiv.org/abs/2305.14975
- **Quote** (≤200 chars, 원문 발췌):
  > "verbalized confidences"
- **Confidence**: high
- **Note**: "신뢰도 점수 요청"을 calibration 관점에서 뒷받침해요.

### Claim: "Confidence calibration은 예측 확률이 실제 정답 가능성과 맞는지를 다룹니다."
- **MDX 위치**: `src/content/lessons.ts:203`
- **Type**: PAPER
- **Title**: On Calibration of Modern Neural Networks
- **Authors / Org**: Chuan Guo, Geoff Pleiss, Yu Sun, Kilian Q. Weinberger
- **Year**: 2017
- **URL**: https://proceedings.mlr.press/v70/guo17a.html
- **Quote** (≤200 chars, 원문 발췌):
  > "probability estimates representative"
- **Confidence**: high
- **Note**: LLM 전용은 아니지만 calibration의 표준 근거.

### Claim: "\"낮은 신뢰도 + 강한 단정 어조\"의 조합이 환각의 가장 확실한 신호입니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:67`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] calibration 연구와 방향은 맞지만 "가장 확실한 신호"라는 비교급은 확인 근거가 필요해요.

### Claim: "RAG는 신뢰 문서를 검색해 답에 강제로 인용하게 하는 장기적으로 강력한 방식입니다."
- **MDX 위치**: `src/content/lessons/hallucination-verification.mdx:69`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "only use information from provided documents"
- **Confidence**: medium
- **Note**: RAG 자체 논문(Lewis et al. 2020)은 별도 추가하면 더 좋습니다. 이번 조사에서는 문서 grounding 근거로만 사용했어요.

---

## Lesson 04 · checks-before-trusting-ai-output

### Claim: "Fact / Origin / Scope / Confidence / Bias의 5축으로 AI 답을 검토한다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:21`
- **Type**: DOC
- **Title**: Artificial Intelligence Risk Management Framework (AI RMF 1.0)
- **Authors / Org**: Elham Tabassi / NIST
- **Year**: 2023
- **URL**: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- **Quote** (≤200 chars, 원문 발췌):
  > "manage the many risks of AI"
- **Confidence**: medium
- **Note**: NIST는 유사한 신뢰·위험 관리 축을 제공하지만 FOSCB 5축 자체의 원출처는 확인되지 않았어요.

### Claim: "FOSCB라는 5축 60초 프레임워크"
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:21`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] Fact/Origin/Scope/Confidence/Bias 조합과 FOSCB 명칭은 저자 자체 프레임워크로 보입니다.

### Claim: "수치, 이름, 날짜, 인용구는 원본과 대조해야 합니다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:23`
- **Type**: DOC
- **Title**: Reduce hallucinations
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Quote** (≤200 chars, 원문 발췌):
  > "Always validate critical information"
- **Confidence**: high
- **Note**: 고위험 정보 원본 대조의 공식 근거.

### Claim: "의료 도메인은 Fact와 Origin 가중치를 높여야 합니다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:68`
- **Type**: PAPER
- **Title**: Large language models encode clinical knowledge
- **Authors / Org**: Karan Singhal et al. / Google Research & DeepMind
- **Year**: 2023
- **URL**: https://www.nature.com/articles/s41586-023-06291-2
- **Quote** (≤200 chars, 원문 발췌):
  > "real-world clinical applications"
- **Confidence**: high
- **Note**: 의료 QA는 임상적 유용성·위해·편향 등 별도 평가가 필요하다는 근거.

### Claim: "Med-PaLM 2는 의료 질문에서 개선됐지만 한계와 adversarial evaluation이 필요했습니다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:68`
- **Type**: PAPER
- **Title**: Towards Expert-Level Medical Question Answering with Large Language Models
- **Authors / Org**: Karan Singhal et al. / Google Research
- **Year**: 2023
- **URL**: https://arxiv.org/abs/2305.09617
- **Quote** (≤200 chars, 원문 발췌):
  > "probe LLM limitations"
- **Confidence**: high
- **Note**: 의료 도메인 risk-tiering 설명에 유용해요.

### Claim: "법률 도메인에서는 법적 환각이 특히 위험합니다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:68`
- **Type**: PAPER
- **Title**: Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models
- **Authors / Org**: Stanford-affiliated authors / Journal of Legal Analysis
- **Year**: 2024
- **URL**: https://arxiv.org/abs/2401.01301
- **Quote** (≤200 chars, 원문 발췌):
  > "Do large language models know the law?"
- **Confidence**: high
- **Note**: 법률 분야 환각 위험의 직접 근거.

### Claim: "금융 도메인은 의료·법률처럼 Fact/Origin 가중치를 높여야 합니다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:68`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] 금융권 생성 AI 위험에 관한 공식 규제/사례 자료를 추가 확인해야 해요.

### Claim: "Trust Floor / Trust Ceiling이라는 두 선을 두고, 도메인별로 AI 답의 사용 가능 범위를 정한다."
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:75`
- **Type**: DOC
- **Title**: Artificial Intelligence Risk Management Framework (AI RMF 1.0)
- **Authors / Org**: Elham Tabassi / NIST
- **Year**: 2023
- **URL**: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- **Quote** (≤200 chars, 원문 발췌):
  > "use-case agnostic"
- **Confidence**: medium
- **Note**: 위험 기반 사용 결정에는 맞지만 Trust Floor/Ceiling 용어 자체의 출처는 확인되지 않았어요.

### Claim: "Trust Floor / Trust Ceiling이라는 명칭"
- **MDX 위치**: `src/content/lessons/checks-before-trusting-ai-output.mdx:75`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] 명칭은 저자 자체 개념으로 보이며, 외부 문헌 매칭 실패.

---

## Lesson 05 · structure-of-good-prompts

### Claim: "프롬프트는 부탁이 아니라 명세(Spec)다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:9`
- **Type**: DOC
- **Title**: Prompting fundamentals
- **Authors / Org**: OpenAI Academy
- **Year**: 2026
- **URL**: https://openai.com/academy/prompting/
- **Quote** (≤200 chars, 원문 발췌):
  > "give it clear instructions"
- **Confidence**: high
- **Note**: "명확한 작업·맥락·출력"이 좋은 프롬프트의 기본이라는 공식 근거.

### Claim: "Task / Context / Constraints / Output 네 칸을 의식하면 답의 흔들림이 줄어듭니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:19`
- **Type**: DOC
- **Title**: Prompting fundamentals
- **Authors / Org**: OpenAI Academy
- **Year**: 2026
- **URL**: https://openai.com/academy/prompting/
- **Quote** (≤200 chars, 원문 발췌):
  > "Outline the task"
- **Confidence**: high
- **Note**: OpenAI의 세 단계(task/context/output)와 레슨의 4축이 직접 대응해요.

### Claim: "프롬프트에 맥락을 넣지 않으면 모델이 평균치 답으로 회귀합니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:32`
- **Type**: DOC
- **Title**: Prompting fundamentals
- **Authors / Org**: OpenAI Academy
- **Year**: 2026
- **URL**: https://openai.com/academy/prompting/
- **Quote** (≤200 chars, 원문 발췌):
  > "Give helpful context"
- **Confidence**: high
- **Note**: "평균치로 회귀"는 교육적 표현이므로 그대로 인용할 땐 완화 권장.

### Claim: "톤·길이·금지사항 등 제약을 명시해야 원하는 출력과 맞습니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:41`
- **Type**: DOC
- **Title**: Prompting fundamentals
- **Authors / Org**: OpenAI Academy
- **Year**: 2026
- **URL**: https://openai.com/academy/prompting/
- **Quote** (≤200 chars, 원문 발췌):
  > "tone, format, length"
- **Confidence**: high
- **Note**: 레슨의 Constraints 축과 직접 연결돼요.

### Claim: "예시를 넣으면 모델이 출력 형식을 더 잘 따라옵니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:52`
- **Type**: DOC
- **Title**: Prompt engineering overview
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- **Quote** (≤200 chars, 원문 발췌):
  > "clarity and examples"
- **Confidence**: high
- **Note**: Anthropic은 clarity/examples/XML 등 prompt best practices를 명시해요.

### Claim: "Few-shot prompting은 예시만으로 새 작업을 수행하게 하는 강력한 패턴입니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:52`
- **Type**: PAPER
- **Title**: Language Models are Few-Shot Learners
- **Authors / Org**: Tom B. Brown et al.
- **Year**: 2020
- **URL**: https://arxiv.org/abs/2005.14165
- **Quote** (≤200 chars, 원문 발췌):
  > "few examples"
- **Confidence**: high
- **Note**: 예시 기반 프롬프팅의 대표 논문.

### Claim: "\"예시 한 줄\"이 1000마디 설명보다 강합니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:66`
- **Type**: NONE
- **Note**: [NO CONFIRMED SOURCE — needs editorial review] few-shot/in-context learning 근거는 있지만 "1000마디보다 강하다"는 수사적 표현은 확인 불가.

### Claim: "같은 명세로 100번 호출하면 거의 같은 답이 나와요. 이게 재현 가능성입니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:17`
- **Type**: DOC
- **Title**: Chat Completions API Reference
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://platform.openai.com/docs/api-reference/chat/create#chat-createtemperature
- **Quote** (≤200 chars, 원문 발췌):
  > "more focused and deterministic"
- **Confidence**: medium
- **Note**: 낮은 temperature가 더 결정적 출력에 가깝게 하지만, API/모델 변경으로 완전 재현은 보장되지 않으므로 표현 완화 권장.

### Claim: "Structured Output은 JSON Schema/Zod 같은 스키마로 기계가 읽을 수 있는 형식을 강제합니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:85`
- **Type**: DOC
- **Title**: Structured model outputs
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://developers.openai.com/api/docs/guides/structured-outputs
- **Quote** (≤200 chars, 원문 발췌):
  > "adhere to your supplied JSON Schema"
- **Confidence**: high
- **Note**: OpenAI docs는 JavaScript SDK에서 Zod schema 지원도 명시해요.

### Claim: "JSON mode는 valid JSON을 보장하지만 특정 schema 준수는 보장하지 않습니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:85`
- **Type**: DOC
- **Title**: Structured model outputs
- **Authors / Org**: OpenAI
- **Year**: 2026 page access / living docs
- **URL**: https://developers.openai.com/api/docs/guides/structured-outputs
- **Quote** (≤200 chars, 원문 발췌):
  > "only that it is valid"
- **Confidence**: high
- **Note**: Lesson 06와 연결해 쓰기 좋은 보조 근거.

### Claim: "Claude도 structured outputs와 strict tool use로 schema validation을 지원합니다."
- **MDX 위치**: `src/content/lessons/structure-of-good-prompts.mdx:85`
- **Type**: DOC
- **Title**: Structured outputs
- **Authors / Org**: Anthropic
- **Year**: 2026 page access / living docs
- **URL**: https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- **Quote** (≤200 chars, 원문 발췌):
  > "follow a specific schema"
- **Confidence**: high
- **Note**: Anthropic structured output / strict tool use 근거.

---

## Self-check

- 모든 URL은 웹 도구로 실제 열람하거나 검색 결과의 실제 문서 URL을 확인했다.
- 웹 도구로 직접 열지 못한 URL은 포함하지 않았다.
- Gemini knowledge cutoff, FOSCB 명칭, Trust Floor/Ceiling 명칭, 금융 도메인 위험 공식 근거, "70%" 및 "1000마디" 같은 정량·수사 표현은 `NONE` 처리했다.
- 레슨 본문(`*.mdx`)과 `src/content/lessons.ts`는 수정하지 않았다.

## Summary

- Claim 항목: 51건
- 검증 출처: 42건
- NONE (조사 불가): 9건
- 결과 파일: `docs/source-research-output.md`
- 다음 액션: 사용자가 lessons MDX에 주석으로 통합
