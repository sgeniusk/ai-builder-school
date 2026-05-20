"use client";
// 특강 슬라이드를 키보드·버튼으로 넘기는 인터랙티브 덱 컨테이너
// — 목차 슬라이드오버 + CSS 페이드 전환 + 'use client' 경계 안전한 자식 필터링
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { List as ListIcon, X } from "lucide-react";

/** 슬라이드 한 장. SlideDeck이 가시성·전환을 제어한다.
 *  - `title` 은 목차(TOC)에서 라벨로 쓰인다. 없으면 "슬라이드 N"으로 폴백.
 */
export function Slide({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string;
}) {
  return (
    <section className="slide" data-slide-title={title}>
      {children}
    </section>
  );
}

/** 입력 요소·contentEditable에 포커스가 있으면 화살표 키를 슬라이드 이동에 쓰지 않는다. */
function isTypingTarget(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el as HTMLElement).isContentEditable
  );
}

/** 슬라이드 내부 컴포넌트(예: Tabs)가 화살표 키를 미리 처리했으면 슬라이드 이동을 막는다. */
function isHandledByChild(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  return !!el.closest('[role="tablist"]');
}

export function SlideDeck({ children }: { children?: ReactNode }) {
  // `<Slide>`만 슬라이드로 센다. `c.type === Slide` 식별자 비교는 'use client'
  // 경계 너머에서 깨진다(SSR 시 child.type은 client reference라 로컬 함수와 같지 않다).
  // 대신 "문자열 타입이 아닌 컴포넌트 엘리먼트"만 추린다 — MDX가 끼우는 빈 줄·텍스트·
  // `<p>` 같은 intrinsic 태그는 type이 문자열이라 빠진다.
  const slideChildren = Children.toArray(children).filter(
    (c): c is ReactElement<{ title?: string }> =>
      isValidElement(c) && typeof c.type !== "string",
  );
  const total = slideChildren.length;

  const [index, setIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  const next = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const first = useCallback(() => setIndex(0), []);
  const last = useCallback(() => setIndex(Math.max(0, total - 1)), [total]);
  const goto = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(total - 1, i))),
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented) return;
      if (isTypingTarget()) return;
      if (tocOpen && e.key === "Escape") {
        e.preventDefault();
        setTocOpen(false);
        return;
      }
      if (isHandledByChild()) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        first();
      } else if (e.key === "End") {
        e.preventDefault();
        last();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, first, last, tocOpen]);

  if (total === 0) {
    return (
      <div className="slide-deck slide-deck--empty">슬라이드가 없습니다.</div>
    );
  }

  const current = Math.min(index, total - 1);
  const currentTitle =
    slideChildren[current]?.props?.title ?? `슬라이드 ${current + 1}`;

  return (
    <div className="slide-deck">
      <div className="slide-deck__stage">
        {/* key가 바뀌면 CSS @keyframes slide-fade-in이 다시 돌아 전환 효과가 난다. */}
        <div className="slide-deck__slide-anim" key={current}>
          {slideChildren[current]}
        </div>
      </div>

      <div className="slide-deck__controls">
        <button
          type="button"
          className="slide-deck__nav"
          onClick={prev}
          disabled={current === 0}
          aria-label="이전 슬라이드"
        >
          <span className="arrow">←</span>
        </button>
        <div className="slide-deck__dots" role="tablist" aria-label="슬라이드 이동">
          {slideChildren.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`slide-deck__dot${i === current ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`슬라이드 ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            />
          ))}
        </div>
        <span className="slide-deck__counter mono">
          {current + 1} / {total}
        </span>
        <button
          type="button"
          className="slide-deck__nav"
          onClick={next}
          disabled={current === total - 1}
          aria-label="다음 슬라이드"
        >
          <span className="arrow">→</span>
        </button>
        <button
          type="button"
          className="slide-deck__toc-btn"
          onClick={() => setTocOpen(true)}
          aria-label="목차 열기"
          aria-haspopup="dialog"
        >
          <ListIcon width={14} height={14} />
          <span>목차</span>
        </button>
      </div>

      <p className="slide-deck__hint">
        키보드 <kbd>←</kbd> <kbd>→</kbd> 로도 넘길 수 있어요 · 현재 — {currentTitle}
      </p>

      {tocOpen && (
        <>
          <div
            className="slide-deck__toc-scrim"
            onClick={() => setTocOpen(false)}
            aria-hidden
          />
          <aside
            className="slide-deck__toc"
            role="dialog"
            aria-label="슬라이드 목차"
          >
            <div className="slide-deck__toc-head">
              <span>목차</span>
              <button
                type="button"
                className="slide-deck__toc-close"
                onClick={() => setTocOpen(false)}
                aria-label="목차 닫기"
              >
                <X width={16} height={16} />
              </button>
            </div>
            <nav className="slide-deck__toc-list">
              {slideChildren.map((s, i) => {
                const title = s.props?.title ?? `슬라이드 ${i + 1}`;
                const active = i === current;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      goto(i);
                      setTocOpen(false);
                    }}
                    className={`slide-deck__toc-item${active ? " is-active" : ""}`}
                  >
                    <span className="mono slide-deck__toc-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="slide-deck__toc-title">{title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
