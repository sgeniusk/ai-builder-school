// Plausible 커스텀 이벤트 헬퍼 — 운영자 학습 분석용.
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN 이 설정됐을 때만 layout 에서 스크립트가 로드된다.
// 미설정이면 window.plausible 가 없어 trackEvent 는 무동작 → 무백엔드 원칙 유지.
// 운영자 설정법: .env.local 에 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=내도메인` 추가 후 Plausible 계정에 같은 도메인 등록.

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

/** Plausible 커스텀 이벤트 전송. 스크립트 미로드(도메인 미설정)면 조용히 무동작. */
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    // 분석 실패는 학습 흐름을 방해하지 않도록 조용히 무시한다.
  }
}
