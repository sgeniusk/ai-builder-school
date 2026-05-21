"use client";
// 클립보드 복사 + "복사됨" 피드백 — PromptGenerator·텍스트 블록 공용
import { useState } from "react";
import { Check, Copy } from "lucide-react";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
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

export function CopyButton({
  getText,
  label = "복사하기",
  className = "",
}: {
  getText: () => string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function handleClick() {
    const ok = await copyText(getText());
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`sb-copy-btn${copied ? " is-copied" : ""} ${className}`.trim()}
    >
      {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
      <span>{copied ? "복사됨" : label}</span>
    </button>
  );
}
