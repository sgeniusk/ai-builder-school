// 사이트 검색 — 헤더 트리거 + 커맨드 팔레트 모달.
// 정적 사이트라 서버 검색 API가 없다. SiteHeader(서버)가 경량 인덱스를
// 만들어 prop으로 넘기고, 여기서 클라이언트 substring 검색을 한다.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export type SearchItem = {
  /** "레슨" · "Stage" · "프로젝트" · "템플릿" · "여정" */
  type: string;
  title: string;
  subtitle: string;
  href: string;
  /** 소문자로 합친 검색 대상 텍스트 */
  keywords: string;
};

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="7.3" cy="7.3" r="5.3" />
      <path d="M11.2 11.2 15 15" />
    </svg>
  );
}

export function SiteSearch({ index }: { index: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  // 전역 단축키 — ⌘K / Ctrl+K 로 열고 닫기
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 모달이 열리면 입력에 포커스 + 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const words = term.split(/\s+/);
    return index
      .filter((item) => words.every((w) => item.keywords.includes(w)))
      .slice(0, 24);
  }, [query, index]);

  function go(item: SearchItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const item = results[active];
      if (item) go(item);
    }
  }

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="검색"
        title="검색 (⌘K)"
      >
        <SearchIcon />
      </button>

      {open &&
        portalEl &&
        createPortal(
          <div
            className="search-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="사이트 검색"
            onClick={() => setOpen(false)}
          >
            <div
              className="search-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                className="search-input"
                type="search"
                placeholder="레슨·프로젝트·Stage 검색…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
              />
              <div className="search-results">
                {query.trim() && results.length === 0 && (
                  <p className="search-empty">검색 결과가 없어요.</p>
                )}
                {!query.trim() && (
                  <p className="search-empty">
                    레슨·Stage·프로젝트·템플릿·여정을 한 번에 찾아요.
                  </p>
                )}
                {results.map((item, i) => (
                  <button
                    key={`${item.href}-${item.title}`}
                    type="button"
                    className={`search-result${i === active ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item)}
                  >
                    <span className="search-result__type">{item.type}</span>
                    <span className="search-result__body">
                      <span className="search-result__title">{item.title}</span>
                      <span className="search-result__sub">{item.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          portalEl,
        )}
    </>
  );
}
