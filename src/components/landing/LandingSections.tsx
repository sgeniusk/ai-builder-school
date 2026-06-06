// 지음 랜딩 — cv-landing.jsx 시안의 7섹션을 실제 여정 데이터 위에 재스킨.
// 헤더·푸터는 전역(SiteHeader/SiteFooter) 재사용. 무지개는 라인·orb·점 액센트로만 절제.
import Link from "next/link";
import type { Journey } from "@/lib/types";
import Image from "next/image";

// 일부 산수화는 내용이 아래쪽에 몰려 있어(파운더=먼 바다, 위가 빈 하늘) 배너 크롭 위치를 따로 잡는다.
const JCARD_IMG_POS: Record<string, string> = { founder: "center 85%" };

const GROUP: Record<string, string> = {
  starter: "입문",
  practitioner: "특화 · 직장",
  creator: "특화 · 콘텐츠",
  founder: "특화 · 사업",
  engineer: "특화 · 시스템",
  "ai-native": "마스터",
};

function LpDot({ id, size = 13 }: { id: string; size?: number }) {
  return (
    <span className={`p-${id}`} style={{ display: "inline-flex", flexShrink: 0 }}>
      <span className="lp-dot" style={{ width: size, height: size }} />
    </span>
  );
}

// ── 히어로 ───────────────────────────────────────────
export function LandingHero({ journeys }: { journeys: Journey[] }) {
  return (
    <section className="lp-section lp-hero">
      <div className="lp-hero__orb lp-hero__orb--a" aria-hidden />
      <div className="lp-hero__orb lp-hero__orb--b" aria-hidden />
      <div className="wrap">
        <div className="lp-hero__grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              JIEUM · 知音 — 나를 알아주는 AI
            </div>
            <h1 className="lp-h1">
              쓰는 사람에서,
              <br />
              짓는 사람으로
            </h1>
            <p className="lp-hero__lede">
              AI와 함께 무엇이든 짓는 법. 나를 알아주는 AI 곁에서 글·서비스·자동화를 한 채씩 지어요.
            </p>
            <div className="lp-hero__ctas">
              <Link href="/build" className="btn">
                무엇을 지을지 고르기 <span className="arrow">→</span>
              </Link>
              <Link href="/start" className="btn ghost">
                30초 진단으로 길 찾기
              </Link>
            </div>
            <div className="lp-cap" style={{ marginTop: 26 }}>
              선행 지식 0 · 짓다가 배웁니다
            </div>
          </div>
          <div className="lp-emblem">
            <span className="lp-emblem__tag mono">知音 · 一채를 짓다</span>
            <Image
              src="/landing/hero.jpg"
              alt="무지개 지붕 한옥을 한 채씩 지어 올리는 수묵담채 그림"
              width={960}
              height={1200}
              className="lp-emblem__img"
              priority
            />
            <span className="lp-emblem__rainbow" aria-hidden />
            <div className="lp-emblem__title">한 채를 짓다</div>
            <div className="lp-emblem__dots">
              {journeys.map((j) => (
                <LpDot key={j.id} id={j.id} size={12} />
              ))}
            </div>
            <div className="lp-cap">여섯 갈래가 모여 한 무지개로</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 왜 지음인가 ──────────────────────────────────────
const VALUE = [
  { t: "나를 알아주는 벗", k: "知音", d: "AI가 내 수준·목표·말투를 안다. 곁에서 다음 한 수를 함께 고른다." },
  { t: "짓는 법을 배운다", k: "建", d: "이론이 아니라 결과물. 글·서비스·자동화를 직접 한 채씩 지어 손에 남긴다." },
  { t: "여섯 갈래의 길", k: "六", d: "어디서 시작하든 막히지 않는다. 입문에서 갈라져 마스터로 모인다." },
];

export function LandingValue() {
  return (
    <section className="lp-section lp-section--tint">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 12 }}>왜 지음인가</div>
        <h2 className="lp-h2">혼자 짓지 않습니다.</h2>
        <div className="lp-grid3">
          {VALUE.map((it) => (
            <div key={it.t} className="lp-card">
              <div className="lp-card__bar" />
              <div className="lp-card__head">
                <span className="lp-card__t">{it.t}</span>
                <span className="lp-card__k">{it.k}</span>
              </div>
              <p className="lp-card__d">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 여정 지도 ────────────────────────────────────────
function JourneyNode({ j, big }: { j: Journey; big?: boolean }) {
  return (
    <Link href={`/journeys/${j.id}`} className={"lp-jnode" + (big ? " lp-jnode--big" : "")}>
      <LpDot id={j.id} size={big ? 16 : 12} />
      <div style={{ minWidth: 0 }}>
        <div className="lp-jnode__ko">{j.titleKo}</div>
        <div className="lp-jnode__en mono">{j.title}</div>
      </div>
    </Link>
  );
}

export function LandingJourneyMap({ journeys }: { journeys: Journey[] }) {
  const byId = Object.fromEntries(journeys.map((j) => [j.id, j])) as Record<string, Journey>;
  const mid = ["practitioner", "creator", "founder", "engineer"]
    .map((id) => byId[id])
    .filter(Boolean);
  return (
    <section className="lp-section">
      <div className="wrap">
        <div className="lp-journeymap__head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>여정 지도</div>
            <h2 className="lp-h2" style={{ marginBottom: 0 }}>입문 → 특화 4갈래 → 마스터</h2>
          </div>
          <p className="lp-journeymap__sub">
            여섯 여정이 곧 서사예요. 출발점이 어디든 — <b>결국 짓는 사람이 됩니다.</b>
          </p>
        </div>
        <div className="lp-journeymap">
          <div className="lp-jm-col">
            <div className="lp-jm-coll mono">입문 · 새싹</div>
            {byId.starter && <JourneyNode j={byId.starter} big />}
          </div>
          <div className="lp-jm-arrow" aria-hidden>→</div>
          <div className="lp-jm-col lp-jm-col--mid">
            <div className="lp-jm-coll mono">특화 · 4갈래</div>
            <div className="lp-jm-grid">
              {mid.map((j) => (
                <JourneyNode key={j.id} j={j} />
              ))}
            </div>
          </div>
          <div className="lp-jm-arrow" aria-hidden>→</div>
          <div className="lp-jm-col">
            <div className="lp-jm-coll mono">마스터 · 큰 나무</div>
            {byId["ai-native"] && <JourneyNode j={byId["ai-native"]} big />}
          </div>
        </div>
        <div className="lp-promise-line">
          <span className="mono">학교의 약속</span>
          <span className="lp-promise-line__bar" aria-hidden />
          <span className="mono" style={{ color: "var(--jic)" }}>결국, 짓는 사람</span>
        </div>
      </div>
    </section>
  );
}

// ── 여섯 여정 카드 ───────────────────────────────────
export function LandingJourneyCards({ journeys }: { journeys: Journey[] }) {
  return (
    <section className="lp-section lp-section--tint">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 12 }}>여섯 여정</div>
        <h2 className="lp-h2">가까이서 본 서사</h2>
        <div className="lp-jcards">
          {journeys.map((j) => (
            <Link key={j.id} href={`/journeys/${j.id}`} className="lp-jcard">
              <Image
                src={`/landing/journey-${j.id}.jpg`}
                alt={`${j.titleKo} 여정`}
                width={800}
                height={800}
                sizes="(max-width: 920px) 100vw, 360px"
                className="lp-jcard__img"
                style={{ objectPosition: JCARD_IMG_POS[j.id] }}
              />
              <div className="lp-jcard__head">
                <LpDot id={j.id} size={15} />
                <div style={{ minWidth: 0 }}>
                  <div className="lp-jcard__ko">{j.titleKo}</div>
                  <div className="lp-jcard__grp mono">{GROUP[j.id] ?? ""}</div>
                </div>
              </div>
              <div className="lp-jcard__identity">{j.identity}</div>
              <div className="lp-jcard__foot">
                <span className="lp-jcard__tag">손에 남는 것</span>
                <span className="lp-jcard__promise">{j.promise}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 어떻게 배우나 ────────────────────────────────────
const STEPS = [
  { n: "01", t: "진단한다", d: "30초 진단으로 지금 내 자리와 다음 한 채를 찾아요." },
  { n: "02", t: "함께 짓는다", d: "지음(知音)이 곁에서 길을 맞춰가며, 매 레슨마다 한 채를 올려요." },
  { n: "03", t: "내 것이 된다", d: "산출물이 손에 남고, 다음 여정으로 자연스럽게 이어져요." },
];

export function LandingHow() {
  return (
    <section className="lp-section">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 12 }}>어떻게 배우나</div>
        <h2 className="lp-h2">한 채씩, 손으로 짓는다</h2>
        <div className="lp-how">
          {STEPS.map((s, i) => (
            <div key={s.n} className={"lp-how__step" + (i > 0 ? " lp-how__step--div" : "")}>
              <div className="lp-how__n mono">{s.n}</div>
              <div className="lp-how__t">{s.t}</div>
              <p className="lp-how__d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA 밴드 ─────────────────────────────────────────
export function LandingCta() {
  return (
    <section className="lp-section lp-cta-wrap">
      <div className="wrap">
        <div className="lp-cta">
          <div className="lp-cta__glow" aria-hidden />
          <div className="lp-cta__inner">
            <div>
              <div className="mono lp-cta__eyebrow">知音 · 지음</div>
              <div className="lp-cta__title">
                오늘, 짓는 사람이
                <br />
                되세요.
              </div>
            </div>
            <div className="lp-cta__action">
              <Link href="/start" className="lp-cta__btn">30초 진단 시작 →</Link>
              <span className="mono lp-cta__note">가입 없이 · 30초면 충분</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
