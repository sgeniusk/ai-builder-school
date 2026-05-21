"use client";
// 프롬프트 생성기 — 입력값을 템플릿 패턴({fieldId})에 끼워 클립보드로 복사
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CopyButton } from "./CopyButton";

export interface PromptGeneratorProps {
  copyButtonLabel?: string;
  fields: {
    id: string;
    label: string;
    placeholder?: string;
    rows?: number;
    defaultValue?: string;
  }[];
  templates?: { id: string; label: string; pattern: string }[];
}

export function PromptGeneratorBlock({
  copyButtonLabel,
  fields,
  templates,
}: PromptGeneratorProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, f.defaultValue ?? ""])),
  );
  const [templateId, setTemplateId] = useState(templates?.[0]?.id ?? "");

  function buildPrompt(): string {
    const tpl = templates?.find((t) => t.id === templateId);
    if (tpl) {
      return tpl.pattern.replace(/\{(\w+)\}/g, (_m, id: string) => {
        const f = fields.find((x) => x.id === id);
        const v = values[id]?.trim();
        return v && v.length > 0 ? v : `[${f?.label ?? id} 입력 필요]`;
      });
    }
    return fields
      .map((f) => `## ${f.label}\n${values[f.id]?.trim() || "(미입력)"}`)
      .join("\n\n");
  }

  return (
    <div className="sb-prompt">
      <div className="sb-prompt__head">
        <h3 className="sb-prompt__title">프롬프트 생성기</h3>
        <CopyButton getText={buildPrompt} label={copyButtonLabel ?? "프롬프트 복사하기"} />
      </div>

      {templates && templates.length > 0 && (
        <div className="sb-prompt__row">
          <label className="sb-prompt__label">템플릿 선택</label>
          <div className="sb-prompt__select">
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown width={14} height={14} className="sb-prompt__caret" />
          </div>
        </div>
      )}

      <div className="sb-prompt__fields">
        {fields.map((f) => (
          <div key={f.id}>
            <label className="sb-prompt__label">{f.label}</label>
            <textarea
              value={values[f.id]}
              placeholder={f.placeholder}
              rows={f.rows ?? 3}
              onChange={(e) =>
                setValues((cur) => ({ ...cur, [f.id]: e.target.value }))
              }
              className="sb-prompt__ta"
            />
          </div>
        ))}
      </div>

      <p className="sb-prompt__hint">
        모든 항목을 입력한 뒤 상단 버튼으로 전체 프롬프트를 복사하세요.
      </p>
    </div>
  );
}
