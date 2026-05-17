// MDX 코드 블록 — 우상단에 줄바꿈 토글 + 복사 버튼을 붙인 <pre> 래퍼.
// mdx-components.tsx 에서 `pre` 엘리먼트가 이 컴포넌트로 매핑된다.
"use client";

import {
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/** Clipboard API 시도 — 비보안 컨텍스트나 권한 거부 시 false. */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Clipboard API가 막힌 환경용 fallback — 임시 textarea + execCommand. */
function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** React 노드 트리에서 텍스트만 재귀로 뽑아낸다 (코드 블록 원문 복원). */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export function CodeBlock({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const [wrapped, setWrapped] = useState(false);
  const text = extractText(children);

  async function handleCopy() {
    const ok = (await writeClipboard(text)) || legacyCopy(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  const preClass =
    [className, wrapped ? "is-wrapped" : ""].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="code-block">
      <div className="code-actions">
        <button
          type="button"
          className={`code-wrap-btn${wrapped ? " is-active" : ""}`}
          onClick={() => setWrapped((w) => !w)}
          aria-pressed={wrapped}
          aria-label={wrapped ? "줄바꿈 끄기" : "긴 줄 줄바꿈"}
        >
          줄바꿈
        </button>
        <button
          type="button"
          className={`code-copy-btn${copied ? " is-copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "복사됨" : "코드 복사"}
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre {...props} className={preClass}>
        {children}
      </pre>
    </div>
  );
}
