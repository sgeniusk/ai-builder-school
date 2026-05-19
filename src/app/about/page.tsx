import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Sections";

export const metadata: Metadata = {
  title: "소개 · 왜 AI Builder School인가",
  description:
    "AI Builder School은 한국어 기반의 실전형 AI 빌더 스쿨입니다. 철학, 학습 방식, 기여 방법을 소개합니다.",
};

const principles = [
  {
    n: "01",
    title: "빌드가 학습이다",
    body: "강의를 소비하는 대신, 매 주 하나의 산출물을 만듭니다. 체크리스트가 끝내는 것이 아니라 작동하는 것이 끝냅니다.",
  },
  {
    n: "02",
    title: "도구 중립",
    body: "Codex, Claude Code, Cursor Agent — 무엇을 쓰든 동작하도록 미션을 설계합니다.",
  },
  {
    n: "03",
    title: "검증이 먼저",
    body: "환각·프롬프트 인젝션·과의존을 학습자가 직접 확인합니다. 신뢰할 수 있는 AI는 만든 사람이 만듭니다.",
  },
  {
    n: "04",
    title: "한국어 중심",
    body: "UI·용어·예시가 한국 직장의 맥락. 번역이 아닌 로컬 네이티브로 씁니다.",
  },
];

const faqs = [
  {
    q: "프로그래밍을 전혀 모르는데 시작해도 될까요?",
    a: "Stage 1~4까지는 프로그래밍 없이 AI를 업무에 연결하는 과정입니다. Stage 5부터 코딩 에이전트를 본격적으로 다루지만, 코드를 직접 쓰는 것이 아니라 AI에게 쓰게 하는 방식입니다.",
  },
  {
    q: "Codex와 Claude Code 중 무엇을 써야 하나요?",
    a: "현재 AI Builder School의 미션은 Claude Code 기준으로 작성되어 있고, Codex 특이사항은 별도 주석으로 제공됩니다. 기본적으로는 Claude Code 하나로 전 과정이 돌아갑니다.",
  },
  {
    q: "8주 안에 정말 끝낼 수 있나요?",
    a: "MVP 경로는 주당 8~16시간을 가정합니다. 이 속도를 유지하기 어렵다면 10~12주로 늘려도 좋습니다. 중요한 건 매 주 하나의 산출물을 남기는 리듬입니다.",
  },
  {
    q: "무료인가요?",
    a: "현재 v1.0 기준 모든 콘텐츠는 공개되어 있습니다. 심화 프로그램 또는 팀 워크숍은 추후 유료로 전환될 수 있지만, 기초 커리큘럼은 유료 벽 없이 유지할 계획입니다.",
  },
];

const visionPillars = [
  {
    n: "01",
    title: "살아있는 지식 그래프",
    body: "AI Builder School은 정적 커리큘럼이 아니라 입력으로 자라는 지식 그래프입니다. 레슨·개념·특강이 노드로, 관계가 엣지로 이어집니다.",
  },
  {
    n: "02",
    title: "항구적 코어 + 휘발성 엣지",
    body: "원리(레슨·개념)는 변하지 않고, 제품에 묶인 특강만 갈립니다. 그래서 6개월마다 뒤집히는 AI 시장에서도 학교의 코어는 흔들리지 않습니다.",
  },
  {
    n: "03",
    title: "성장 엔진",
    body: "새 강의 자료가 들어오면 정제·분류 후 노드로 등록되고, 그래프가 나머지 페이지로 전파합니다. 그 사이에는 항상 사람의 검토가 있습니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title={<>AI는 쓰는 도구가 아니라,<br />만드는 팀원입니다.</>}
        lede="AI Builder School은 한국어 학습자를 위한 실전형 AI 빌더 스쿨입니다. 수동적인 강의가 아니라, Codex와 Claude Code를 파트너로 두고 매 주 하나의 산출물을 만들게 합니다."
      />

      <section className="sec">
        <Container>
          <div className="two-col">
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Mission</div>
              <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, margin: "8px 0 16px" }}>
                AI를 쓰는 사람에서 AI로 만드는 사람으로.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>
                AI 뉴스는 흘러갑니다. 결과물이 남습니다. 이 학교는 결과물을 만드는 빌더를 양성하는 곳이지, 최신 모델을 소비하는 독자를 만드는 곳이 아닙니다.
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Why now</div>
              <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, margin: "8px 0 16px" }}>
                도구가 폭발하는 시기일수록, 원칙이 필요합니다.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>
                6개월마다 뒤집히는 베스트 프랙티스 사이에서, 오래 남는 것은 원리와 습관뿐입니다. 이 학교는 그 습관을 만드는 연습장입니다.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Principles</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>우리의 약속</h2>

          <div
            className="principles-list"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            {principles.map((p) => (
              <article key={p.n}>
                <div className="n">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>FAQ</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>자주 묻는 질문</h2>

          <div className="faq" style={{ marginTop: 24 }}>
            {faqs.map((f, i) => (
              <details key={i}>
                <summary>{f.q}</summary>
                <div className="ans">{f.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>2.0 Vision</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>
            급변하는 시장에서 항상성을 지키는 학교
          </h2>
          <p className="section-lede">
            AI Builder School 2.0은 한 번 만들고 끝나는 커리큘럼이 아닙니다. 입력으로 자라고, 원리는 남기고, 낡은 것만 갈아 끼우는 시스템입니다.
          </p>

          <div
            className="principles-list"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 24 }}
          >
            {visionPillars.map((p) => (
              <article key={p.n}>
                <div className="n">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Contribute</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>비개발자도 레슨을 추가할 수 있습니다</h2>
          <p className="section-lede">
            레슨은 TypeScript 데이터 파일 + MDX 본문 조합으로 관리되지만, 양식이 고정되어 있어 문서처럼 편집할 수 있습니다.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginTop: 16,
            }}
            className="step-cols"
          >
            {[
              {
                n: "01",
                t: "파일 열기",
                b: "src/content/lessons.ts 에서 기존 레슨 객체를 복사합니다.",
              },
              {
                n: "02",
                t: "필드 수정",
                b: "slug, titleKo, hook, mission, 체크리스트, 산출물 등을 수정합니다.",
              },
              {
                n: "03",
                t: "MDX 본문",
                b: "src/content/lessons/{slug}.mdx 에 블로그 말투의 연결 본문을 작성합니다.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="eyebrow">{s.n}</div>
                <h3 style={{ margin: "12px 0 8px", fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>{s.t}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.65, margin: 0 }}>{s.b}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--ink-3)" }}>
            자세한 규칙은{" "}
            <Link href="/stages" className="link-reset" style={{ textDecoration: "underline" }}>
              커리큘럼
            </Link>
            ,{" "}
            <Link href="/templates" className="link-reset" style={{ textDecoration: "underline" }}>
              템플릿
            </Link>{" "}
            페이지에서 확인하세요.
          </p>
        </Container>
      </section>
    </>
  );
}
