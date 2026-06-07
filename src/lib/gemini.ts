// Gemini REST API 를 브라우저에서 직접 호출하는 클라이언트 (BYO 키, 서버 프록시 없음).
// 정적 사이트 제약상 프록시가 없어 학습자 본인 키로 직접 호출한다. Gemini 는 CORS 친화적.
// 모델명은 변동될 수 있으니 상수로 둔다 — 최신·무료 티어 모델은 aistudio.google.com 에서 확인.

const MODEL = "gemini-2.0-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export type GeminiResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

/** 브라우저에서 Gemini 를 직접 호출. 키·프롬프트 검증 + 사람이 읽을 한국어 에러. */
export async function callGemini(
  apiKey: string,
  prompt: string,
): Promise<GeminiResult> {
  if (!apiKey.trim()) return { ok: false, error: "먼저 Gemini API 키를 넣어주세요." };
  if (!prompt.trim()) return { ok: false, error: "프롬프트를 입력해주세요." };

  try {
    const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey.trim())}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!res.ok) {
      if (res.status === 400 || res.status === 403) {
        return { ok: false, error: "키가 올바르지 않거나 권한이 없어요. aistudio.google.com 에서 키를 확인해주세요." };
      }
      if (res.status === 429) {
        return { ok: false, error: "무료 한도를 잠시 넘었어요. 잠깐 뒤 다시 시도해주세요." };
      }
      return { ok: false, error: `요청이 실패했어요 (HTTP ${res.status}).` };
    }

    const data: unknown = await res.json();
    const parts =
      (data as { candidates?: { content?: { parts?: { text?: string }[] } }[] })
        ?.candidates?.[0]?.content?.parts ?? [];
    const text = parts.map((p) => p.text ?? "").join("").trim();
    if (!text) return { ok: false, error: "응답이 비어 있어요. 프롬프트를 바꿔 다시 시도해보세요." };
    return { ok: true, text };
  } catch {
    return { ok: false, error: "네트워크 오류예요. 연결을 확인하고 다시 시도해주세요." };
  }
}
