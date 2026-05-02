// Content data for AI Builder School
// Single source of truth for phases, lessons, tracks, projects, templates

window.ABS_CONTENT = {
  phases: [
    { id:'phase-0', slug:'phase-0-setup', num:'00', titleKo:'AI 학습 환경 세팅', titleEn:'Setup', hours:4, level:'beginner', personas:['all'], week:null, summary:'코딩 에이전트·저장소·키까지 한 번에 세팅.', deliverables:['작동하는 Codex/Claude Code 환경', '개인 저장소 템플릿'] },
    { id:'phase-1', slug:'phase-1-ai-literacy', num:'01', titleKo:'AI Literacy', titleEn:'AI Literacy', hours:6, level:'beginner', personas:['all'], week:1, summary:'맹신 없이, 두려움 없이 AI를 쓰는 감각.', deliverables:['판단 체크리스트', '환각 사례 노트'] },
    { id:'phase-2', slug:'phase-2-prompt-engineering', num:'02', titleKo:'Prompt & Context Engineering', titleEn:'Prompting', hours:8, level:'beginner', personas:['all'], week:2, summary:'모호한 지시를 작업지시서로.', deliverables:['개인 프롬프트 라이브러리'] },
    { id:'phase-3', slug:'phase-3-ai-work-os', num:'03', titleKo:'AI Work OS', titleEn:'Work OS', hours:10, level:'intermediate', personas:['office','planner'], week:3, summary:'반복 업무를 AI로 감싸는 OS.', deliverables:['업무 플레이북', '자동화 워크플로우'] },
    { id:'phase-4', slug:'phase-4-coding-agents', num:'04', titleKo:'Codex / Claude Code Workflow', titleEn:'Coding Agents', hours:12, level:'intermediate', personas:['developer','engineer'], week:4, summary:'페어 프로그래머·리뷰어·테스터로.', deliverables:['코딩 에이전트 루틴', 'AGENTS.md'] },
    { id:'phase-5', slug:'phase-5-ai-app-dev', num:'05', titleKo:'AI App Development', titleEn:'AI App Dev', hours:16, level:'intermediate', personas:['developer'], week:5, summary:'작은 AI 웹앱을 실제 배포까지.', deliverables:['배포된 AI 웹앱'] },
    { id:'phase-6', slug:'phase-6-rag', num:'06', titleKo:'Data, Embedding & RAG', titleEn:'RAG', hours:14, level:'intermediate', personas:['developer','engineer'], week:6, summary:'내 문서에 근거 있게 답하는 AI.', deliverables:['문서 Q&A 봇'] },
    { id:'phase-7', slug:'phase-7-agents-mcp', num:'07', titleKo:'Tool Use, Agents & MCP', titleEn:'Agents', hours:14, level:'advanced', personas:['developer','engineer'], week:7, summary:'도구를 쓰는 AI 워크플로우.', deliverables:['미니 에이전트'] },
    { id:'phase-8', slug:'phase-8-multimodal', num:'08', titleKo:'Multimodal & Content Automation', titleEn:'Multimodal', hours:10, level:'intermediate', personas:['creator'], week:null, summary:'텍스트·이미지·오디오·비디오 파이프라인.', deliverables:['콘텐츠 파이프라인'] },
    { id:'phase-9', slug:'phase-9-data-decision', num:'09', titleKo:'Data Analysis & Decision AI', titleEn:'Decision AI', hours:10, level:'intermediate', personas:['planner','office'], week:null, summary:'분석과 의사결정 보조.', deliverables:['분석 리포트 템플릿'] },
    { id:'phase-10', slug:'phase-10-evals-security', num:'10', titleKo:'Evals, Security & Responsible AI', titleEn:'Evals & Security', hours:10, level:'advanced', personas:['all'], week:null, summary:'신뢰할 수 있는 AI를 만든다.', deliverables:['평가 스위트', '보안 체크리스트'] },
    { id:'phase-11', slug:'phase-11-product', num:'11', titleKo:'AI Product & Monetization', titleEn:'Product', hours:10, level:'advanced', personas:['planner','developer','creator'], week:null, summary:'제품화와 수익화.', deliverables:['가격 모델', '런치 플랜'] },
    { id:'phase-12', slug:'phase-12-capstone', num:'12', titleKo:'Capstone Projects', titleEn:'Capstone', hours:20, level:'advanced', personas:['all'], week:8, summary:'포트폴리오 프로젝트로 완주.', deliverables:['공개 배포된 프로젝트'] },
  ],

  lessons: [
    // Phase 1
    { id:'l-01', slug:'ai-era-skills', phaseId:'phase-1', num:'L01', titleKo:'AI 시대에 뒤쳐지지 않는 사람들의 공통 역량', minutes:35, level:'beginner', tags:['literacy','mindset'] },
    { id:'l-02', slug:'llm-capabilities', phaseId:'phase-1', num:'L02', titleKo:'LLM이 잘하는 일과 못하는 일', minutes:30, level:'beginner', tags:['literacy'] },
    { id:'l-03', slug:'hallucination-verification', phaseId:'phase-1', num:'L03', titleKo:'환각(Hallucination)을 잡는 검증법', minutes:45, level:'beginner', tags:['literacy','verification'] },
    { id:'l-04', slug:'trust-before-use', phaseId:'phase-1', num:'L04', titleKo:'AI 결과를 신뢰하기 전 확인할 것', minutes:30, level:'beginner', tags:['literacy'] },
    // Phase 2
    { id:'l-05', slug:'prompt-structure', phaseId:'phase-2', num:'L05', titleKo:'좋은 프롬프트의 구조', minutes:40, level:'beginner', tags:['prompt'] },
    { id:'l-06', slug:'output-format', phaseId:'phase-2', num:'L06', titleKo:'출력 형식(Output Format)을 강제하는 법', minutes:35, level:'beginner', tags:['prompt'] },
    { id:'l-07', slug:'long-docs', phaseId:'phase-2', num:'L07', titleKo:'긴 문서를 AI에게 먹이는 법', minutes:50, level:'intermediate', tags:['context'] },
    { id:'l-08', slug:'prompt-library', phaseId:'phase-2', num:'L08', titleKo:'개인 프롬프트 라이브러리 만들기', minutes:45, level:'beginner', tags:['prompt','deliverable'] },
    // Phase 3
    { id:'l-09', slug:'report-draft', phaseId:'phase-3', num:'L09', titleKo:'보고서 초안 자동화', minutes:60, level:'intermediate', tags:['work-os'] },
    { id:'l-10', slug:'meeting-notes', phaseId:'phase-3', num:'L10', titleKo:'회의록 자동 정리', minutes:45, level:'beginner', tags:['work-os'] },
    { id:'l-11', slug:'research-workflow', phaseId:'phase-3', num:'L11', titleKo:'리서치 워크플로우 만들기', minutes:60, level:'intermediate', tags:['work-os'] },
    { id:'l-12', slug:'blog-pipeline', phaseId:'phase-3', num:'L12', titleKo:'블로그 글쓰기 파이프라인', minutes:60, level:'intermediate', tags:['work-os','creator'] },
    // Phase 4
    { id:'l-13', slug:'agent-setup', phaseId:'phase-4', num:'L13', titleKo:'Codex / Claude Code 작업 환경 세팅', minutes:50, level:'intermediate', tags:['coding-agent'] },
    { id:'l-14', slug:'issue-to-brief', phaseId:'phase-4', num:'L14', titleKo:'GitHub Issue를 AI 작업지시서로 바꾸기', minutes:60, level:'intermediate', tags:['coding-agent'] },
    { id:'l-15', slug:'codebase-reading', phaseId:'phase-4', num:'L15', titleKo:'기존 코드베이스를 AI에게 읽히기', minutes:60, level:'intermediate', tags:['coding-agent'] },
    { id:'l-16', slug:'plan-with-ai', phaseId:'phase-4', num:'L16', titleKo:'AI와 함께 구현 계획 세우기', minutes:50, level:'intermediate', tags:['coding-agent'] },
    { id:'l-17', slug:'tests-with-ai', phaseId:'phase-4', num:'L17', titleKo:'Codex / Claude Code로 테스트 만들기', minutes:70, level:'intermediate', tags:['coding-agent','verify'] },
    { id:'l-18', slug:'bug-repro-loop', phaseId:'phase-4', num:'L18', titleKo:'버그 재현과 수정 루프', minutes:60, level:'intermediate', tags:['coding-agent'] },
    // Phase 5
    { id:'l-19', slug:'llm-api', phaseId:'phase-5', num:'L19', titleKo:'AI API 붙이기', minutes:60, level:'intermediate', tags:['app-dev'] },
    { id:'l-20', slug:'streaming-ui', phaseId:'phase-5', num:'L20', titleKo:'스트리밍 응답 UI 만들기', minutes:70, level:'intermediate', tags:['app-dev'] },
    { id:'l-21', slug:'structured-output', phaseId:'phase-5', num:'L21', titleKo:'구조화 출력(Structured Output) 다루기', minutes:60, level:'intermediate', tags:['app-dev'] },
    { id:'l-22', slug:'chat-history', phaseId:'phase-5', num:'L22', titleKo:'대화 기록 저장 구조 설계', minutes:55, level:'intermediate', tags:['app-dev'] },
    // Phase 6
    { id:'l-23', slug:'embeddings', phaseId:'phase-6', num:'L23', titleKo:'임베딩(Embedding) 이해하기', minutes:50, level:'intermediate', tags:['rag'] },
    { id:'l-24', slug:'chunking', phaseId:'phase-6', num:'L24', titleKo:'문서 청킹(Chunking) 전략 세우기', minutes:50, level:'intermediate', tags:['rag'] },
    { id:'l-25', slug:'vector-search', phaseId:'phase-6', num:'L25', titleKo:'벡터 검색(Vector Search) 기본', minutes:55, level:'intermediate', tags:['rag'] },
    { id:'l-26', slug:'grounded-rag', phaseId:'phase-6', num:'L26', titleKo:'근거가 있는 RAG 답변 만들기', minutes:70, level:'intermediate', tags:['rag','verify'] },
    // Phase 7
    { id:'l-27', slug:'function-calling', phaseId:'phase-7', num:'L27', titleKo:'Function Calling 이해하기', minutes:50, level:'advanced', tags:['agent'] },
    { id:'l-28', slug:'mini-agent-loop', phaseId:'phase-7', num:'L28', titleKo:'미니 에이전트 루프 만들기', minutes:80, level:'advanced', tags:['agent'] },
    { id:'l-29', slug:'tool-permission', phaseId:'phase-7', num:'L29', titleKo:'도구 권한과 안전장치 설계하기', minutes:55, level:'advanced', tags:['agent','security'] },
    { id:'l-30', slug:'prompt-injection', phaseId:'phase-7', num:'L30', titleKo:'Prompt Injection 방어 기초', minutes:55, level:'advanced', tags:['agent','security'] },
    // Phase 11
    { id:'l-31', slug:'ai-cost', phaseId:'phase-11', num:'L31', titleKo:'AI 앱 비용과 사용량 계산', minutes:50, level:'advanced', tags:['product'] },
    // Phase 12
    { id:'l-32', slug:'capstone-plan', phaseId:'phase-12', num:'L32', titleKo:'Capstone 프로젝트 기획과 배포', minutes:120, level:'advanced', tags:['capstone'] },
  ],

  tracks: [
    { id:'t-office', slug:'office', persona:'office', title:'일반 직장인', learner:'보고서·회의록·리서치에 시간을 쓰는 사람', promise:'반복 업무를 AI Work OS로 감싼다', required:['phase-0','phase-1','phase-2','phase-3','phase-9'], optional:['phase-10'], outcome:'팀에 공유 가능한 AI 업무 플레이북', weeks:6 },
    { id:'t-planner', slug:'planner', persona:'planner', title:'기획자·관리자', learner:'조직에 AI를 어떻게 도입할지 고민하는 사람', promise:'도입 전략과 평가 체계를 가진다', required:['phase-0','phase-1','phase-2','phase-3','phase-9','phase-10','phase-11'], optional:['phase-6'], outcome:'도입 제안서 + 평가 루브릭', weeks:8 },
    { id:'t-developer', slug:'developer', persona:'developer', title:'개발자·앱 빌더', learner:'Codex/Claude Code로 빠르게 만드는 사람', promise:'페어 프로그래머와 함께 실제 배포', required:['phase-0','phase-1','phase-2','phase-4','phase-5','phase-6','phase-7','phase-10','phase-12'], optional:['phase-11'], outcome:'배포된 AI 웹앱 + RAG/Agent 템플릿', weeks:10 },
    { id:'t-creator', slug:'creator', persona:'creator', title:'콘텐츠 크리에이터', learner:'글·영상 파이프라인을 자동화하려는 사람', promise:'멀티모달 파이프라인을 운영한다', required:['phase-0','phase-1','phase-2','phase-3','phase-8','phase-11'], optional:['phase-9'], outcome:'개인 콘텐츠 파이프라인', weeks:8 },
    { id:'t-engineer', slug:'engineer', persona:'engineer', title:'AI 엔지니어 심화', learner:'RAG/Agents/Evals를 직접 설계하는 사람', promise:'실습 중심으로 심화 주제를 관통', required:['phase-0','phase-2','phase-4','phase-5','phase-6','phase-7','phase-10','phase-12'], optional:['phase-11'], outcome:'포트폴리오급 RAG/Agent 시스템', weeks:10 },
  ],

  projects: [
    { id:'p-01', slug:'team-playbook', title:'우리 팀 AI 업무 플레이북', difficulty:'beginner', persona:'office', output:'공유 문서 + 자동화 스니펫', stack:['Notion','Codex'], summary:'팀이 반복하는 5가지 업무를 AI로 감싸는 플레이북을 만든다.' },
    { id:'p-02', slug:'doc-qa-bot', title:'내 문서에 답하는 Q&A 봇', difficulty:'intermediate', persona:'developer', output:'배포된 웹앱', stack:['Next.js','OpenAI','pgvector'], summary:'개인 지식 베이스를 임베딩하고 근거가 있는 답을 주는 RAG 챗봇.' },
    { id:'p-03', slug:'content-pipeline', title:'콘텐츠 자동 파이프라인', difficulty:'intermediate', persona:'creator', output:'스크립트+이미지 파이프라인', stack:['Claude','Midjourney','ffmpeg'], summary:'하나의 주제에서 블로그·쇼츠·썸네일까지 이어지는 파이프라인.' },
    { id:'p-04', slug:'mini-agent', title:'작은 워크플로우 에이전트', difficulty:'advanced', persona:'engineer', output:'도구를 호출하는 에이전트', stack:['MCP','TypeScript'], summary:'Function Calling으로 일정·검색·문서 도구를 조합하는 미니 에이전트.' },
    { id:'p-05', slug:'launch-proposal', title:'조직용 AI 도입 제안서', difficulty:'intermediate', persona:'planner', output:'제안서 + 평가 루브릭', stack:['Docs','Evals'], summary:'리스크·비용·평가 체계까지 포함한 현업에 통하는 제안서.' },
    { id:'p-06', slug:'decision-report', title:'AI 보조 의사결정 리포트', difficulty:'intermediate', persona:'planner', output:'의사결정 리포트 템플릿', stack:['Claude','Sheets'], summary:'데이터를 읽고 옵션과 리스크를 정리해주는 분석 리포트.' },
  ],

  templates: [
    { id:'tm-01', slug:'prompt-frame', title:'역할·맥락·출력 프롬프트 프레임', kind:'prompt', personas:['all'], summary:'작업지시서 스타일의 프롬프트 골격.' },
    { id:'tm-02', slug:'codex-mission', title:'Codex 미션 템플릿', kind:'mission', personas:['developer'], summary:'Issue → Codex 미션으로 옮기는 표준 양식.' },
    { id:'tm-03', slug:'claude-mission', title:'Claude Code 미션 템플릿', kind:'mission', personas:['developer'], summary:'계획·실행·리뷰 단계를 명시한 미션.' },
    { id:'tm-04', slug:'verify-checklist', title:'검증 체크리스트 8문항', kind:'checklist', personas:['all'], summary:'환각·누락·권한·근거 확인 항목.' },
    { id:'tm-05', slug:'reflection-3q', title:'3문 회고 템플릿', kind:'checklist', personas:['all'], summary:'AI가 한 것 / 내가 판단한 것 / 바꿀 것.' },
    { id:'tm-06', slug:'rag-prompt', title:'RAG 답변 프롬프트', kind:'prompt', personas:['developer','engineer'], summary:'근거 인용과 모른다고 말하기를 강제.' },
    { id:'tm-07', slug:'agent-guardrail', title:'에이전트 가드레일 체크', kind:'checklist', personas:['developer','engineer'], summary:'권한·반복·비용 상한을 점검.' },
    { id:'tm-08', slug:'launch-rubric', title:'AI 도입 평가 루브릭', kind:'checklist', personas:['planner'], summary:'도입 전/후 비교 가능한 평가 기준.' },
  ],

  loop: [
    { num:'01', title:'문제 이해', sub:'왜 지금 이 문제를 푸는가', verb:'PROBLEM' },
    { num:'02', title:'최소 개념', sub:'필요한 만큼만 배운다', verb:'CONCEPT' },
    { num:'03', title:'미션', sub:'Codex / Claude Code에게 작업지시', verb:'MISSION' },
    { num:'04', title:'빌드', sub:'작은 것을 만든다', verb:'BUILD' },
    { num:'05', title:'검증', sub:'체크리스트로 확인한다', verb:'VERIFY' },
    { num:'06', title:'배포', sub:'공개/공유한다', verb:'SHIP' },
    { num:'07', title:'회고', sub:'사람과 AI의 역할을 분리해 기록', verb:'REFLECT' },
  ],

  personas: [
    { id:'office', label:'일반 직장인', desc:'보고서·회의·리서치를 더 빠르게' },
    { id:'planner', label:'기획자·관리자', desc:'조직에 AI를 도입하려는 사람' },
    { id:'developer', label:'개발자·앱 빌더', desc:'Codex/Claude Code로 만드는 사람' },
    { id:'creator', label:'콘텐츠 크리에이터', desc:'글·영상을 자동화하려는 사람' },
    { id:'engineer', label:'AI 엔지니어 심화', desc:'RAG·Agents·Evals를 설계' },
  ],
};
