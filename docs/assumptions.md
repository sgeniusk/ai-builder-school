# Assumptions — AI Builder School MVP

> 작성일: 2026-04-19

요구사항이 명시되지 않은 지점에서 내린 합리적 가정을 기록한다. 향후 요구사항이 확정되면 이 문서를 업데이트한다.

## 1. 기술 스택
- **Framework**: Next.js 15 App Router + React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Variables 기반 디자인 토큰
- **Runtime**: Node.js 20+ (개발 환경은 Node 25 확인됨)
- **Package manager**: npm (pnpm 미설치 확인)
- **Deploy target**: 정적 생성 중심. Vercel 또는 Netlify 배포 가능

## 2. 콘텐츠 형식
- MVP v0.1은 **순수 TypeScript 데이터 파일**(`src/content/*.ts`)로 콘텐츠를 관리. MDX는 v0.2에서 도입.
- 레슨 본문은 "문제 → 개념 → 미션 → 빌드 → 검증 → 산출물 → 회고"의 고정 필드 구조.
- 장문 마크다운은 문자열 리터럴에 담고, 줄바꿈은 `\n`으로 처리하는 대신 포맷터에서 줄바꿈 유지.

## 3. 언어 & 톤
- UI 카피: 한국어 기본. 트래킹용 UTM/SEO 메타도 한국어.
- 기술 용어: 한국어 + 괄호 내 영문 병기 (예: "임베딩(Embedding)").
- 에이전트용 지침(AGENTS.md, CLAUDE.md)은 **영문**으로 작성 (에이전트 호환성과 토큰 효율 때문).
- 코드/파일명/변수명은 영어.

## 4. 학습자 가정
- 대상 5개 페르소나: office, planner, developer, creator, engineer.
- 한국 직장인·기획자·개발자·크리에이터가 주 고객. 해외 사용자는 v0.2 다국어 대응 시 포함.
- 학습자는 최소한 웹 브라우저와 GitHub 계정은 사용 가능한 수준.

## 5. 커리큘럼
- 전체 **12 Phase**. MVP는 8주 경로(Phase 1~7 + Capstone 축약)를 강조.
- Phase 0(환경 세팅)은 선택 과정으로 간주하되 커리큘럼 인덱스에는 포함.
- 레슨 총 32개 이상. 각 레슨은 하나의 Phase에 귀속.

## 6. 미션 구조
- 모든 레슨은 `codexMission`, `claudeCodeMission` 두 필드를 모두 가진다.
- 미션 본문은 **도구 중립**적으로 표현 가능한 경우 공통 문구를 사용하고, 도구 특이사항이 있을 때만 분기.

## 7. 검증 & 배포
- `npm run build`, `npm run lint`, `npm run typecheck`(`tsc --noEmit`)를 기본 검증으로 간주.
- Playwright/Vitest는 MVP 미도입. v0.2에서 데이터 유틸리티용 Vitest 추가 예정.

## 8. 외부 서비스
- 실제 LLM API 호출 없음. 미션 예시만 제공.
- 분석(Analytics), 인증, 결제, DB, CMS 미사용.
- 이미지/비디오는 외부 호스팅 또는 `public/` 정적 파일에 한정.

## 9. 접근성 & SEO
- WCAG AA 색 대비를 목표. 키보드 포커스 링 유지.
- 페이지 메타는 Next 15 `metadata` API 사용. Open Graph 이미지 생성은 v0.2.

## 10. 파일 경로
- 저장소 루트는 iCloud 경로(`/Users/.../AI Builder School`). 공백이 포함되어 CLI 명령은 반드시 따옴표 처리.

## 11. 비개발자 편집성
- 레슨을 추가하려면 `src/content/lessons.ts`에 새 객체를 추가하고 `phaseId`만 맞추면 라우트가 자동 생성된다.
- Phase, Track, Project, Template도 동일한 패턴.
