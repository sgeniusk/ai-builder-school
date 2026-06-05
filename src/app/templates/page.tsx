import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Sections";
import { TemplateCard } from "@/components/Cards";
import { getTemplates } from "@/lib/content";

export const metadata: Metadata = {
  title: "템플릿 · 프롬프트·미션·체크리스트",
  description:
    "지음 레슨에서 바로 재사용할 수 있는 프롬프트, 미션, 체크리스트 템플릿 모음.",
};

export default function TemplatesPage() {
  const templates = getTemplates();
  const prompts = templates.filter((t) => t.kind === "prompt");
  const missions = templates.filter((t) => t.kind === "mission");
  const checklists = templates.filter((t) => t.kind === "checklist");

  return (
    <>
      <PageHead
        eyebrow={<>Templates · {templates.length}</>}
        title={<>바로 복사해 쓰는<br />템플릿.</>}
        lede="프롬프트, Codex/Claude Code 미션, 체크리스트를 한 곳에 모았습니다. 코드 블록에서 그대로 복사할 수 있게 구성했습니다."
      />

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Prompt</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>프롬프트 템플릿</h2>
          <div className="proj-grid" style={{ marginTop: 24 }}>
            {prompts.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Mission</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>코딩 에이전트 미션 템플릿</h2>
          <div className="proj-grid" style={{ marginTop: 24 }}>
            {missions.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Checklist</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>검증·안전 체크리스트</h2>
          <div className="proj-grid" style={{ marginTop: 24 }}>
            {checklists.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
