"use client";
// 아코디언 — 접히는 FAQ. answer는 \n\n로 단락 분리.
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionProps {
  allowMultiple?: boolean;
  items: { question: string; answer: string }[];
}

export function AccordionBlock({ allowMultiple = false, items }: AccordionProps) {
  const [open, setOpen] = useState<number[]>([0]);

  function toggle(i: number) {
    setOpen((cur) => {
      const isOpen = cur.includes(i);
      if (allowMultiple) return isOpen ? cur.filter((x) => x !== i) : [...cur, i];
      return isOpen ? [] : [i];
    });
  }

  return (
    <div className="sb-accordion">
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i} className={`sb-accordion__item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="sb-accordion__head"
            >
              <span className="sb-accordion__q">{it.question}</span>
              <span className="sb-accordion__chev">
                <ChevronDown width={16} height={16} />
              </span>
            </button>
            {isOpen && (
              <div className="sb-accordion__body">
                {it.answer.split("\n\n").map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
