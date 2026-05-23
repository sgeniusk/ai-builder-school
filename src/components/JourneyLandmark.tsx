// 여정 히어로의 픽셀 랜드마크 — 여정마다 풍경 속에 하나씩 놓이는 32×32 픽셀 오브젝트.
// 능선만 있던 풍경에 "이 여정다움"을 더한다. 색은 여정 색(--p-from/--p-to)을 따른다.
"use client";

export function JourneyLandmark({ journey }: { journey: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      width="100%"
      height="100%"
      aria-hidden
    >
      {journey === "native" && <Seedling />}
      {journey === "practitioner" && <Signpost />}
      {journey === "creator" && <Easel />}
      {journey === "founder" && <Flag />}
      {journey === "engineer" && <Tower />}
    </svg>
  );
}

/** Native — 새싹. 처음 솟아오르는 빌더의 첫 잎. */
function Seedling() {
  return (
    <>
      {/* 흙 두덩 */}
      <rect x="6" y="26" width="20" height="3" fill="#8A6F4F" />
      <rect x="8" y="24" width="16" height="2" fill="#A8895F" />
      {/* 줄기 */}
      <rect x="15" y="13" width="2" height="11" fill="var(--p-to)" />
      {/* 왼쪽 잎 */}
      <rect x="8" y="14" width="7" height="3" fill="var(--p-from)" />
      <rect x="10" y="12" width="5" height="2" fill="var(--p-from)" />
      <rect x="12" y="11" width="3" height="1" fill="var(--p-from)" />
      {/* 오른쪽 잎 */}
      <rect x="17" y="15" width="7" height="3" fill="var(--p-from)" />
      <rect x="17" y="13" width="5" height="2" fill="var(--p-from)" />
      <rect x="17" y="12" width="3" height="1" fill="var(--p-from)" />
      {/* 꼭대기 새순 */}
      <rect x="14" y="8" width="4" height="2" fill="var(--p-from)" />
      <rect x="15" y="6" width="2" height="2" fill="var(--p-from)" />
    </>
  );
}

/** Practitioner — 이정표. 매일의 길을 가리키는 표지판. */
function Signpost() {
  return (
    <>
      {/* 나무 기둥 */}
      <rect x="14" y="7" width="3" height="22" fill="#A8895F" />
      <rect x="14" y="7" width="1" height="22" fill="#8A7048" opacity="0.6" />
      {/* 위 표지판 — 오른쪽을 가리킴 */}
      <rect x="8" y="10" width="13" height="6" fill="var(--p-from)" />
      <rect x="21" y="11" width="2" height="4" fill="var(--p-from)" />
      <rect x="23" y="12" width="2" height="2" fill="var(--p-from)" />
      {/* 아래 표지판 */}
      <rect x="11" y="19" width="12" height="5" fill="var(--p-to)" />
      <rect x="9" y="20" width="2" height="3" fill="var(--p-to)" />
      {/* 풀 */}
      <rect x="11" y="29" width="9" height="1" fill="var(--p-to)" opacity="0.5" />
    </>
  );
}

/** Creator — 이젤. 만드는 사람의 캔버스. */
function Easel() {
  return (
    <>
      {/* 캔버스 */}
      <rect x="8" y="5" width="15" height="13" fill="#F4EFE3" />
      <rect x="8" y="5" width="15" height="13" fill="none" stroke="#9A8A6A" strokeWidth="1" />
      {/* 물감 자국 */}
      <rect x="11" y="8" width="4" height="4" fill="var(--p-from)" />
      <rect x="16" y="11" width="5" height="4" fill="var(--p-to)" />
      <rect x="13" y="13" width="3" height="3" fill="var(--p-to)" opacity="0.7" />
      {/* 삼각대 다리 */}
      <rect x="9" y="18" width="2" height="4" fill="#9A8A6A" />
      <rect x="8" y="22" width="2" height="4" fill="#9A8A6A" />
      <rect x="7" y="26" width="2" height="3" fill="#9A8A6A" />
      <rect x="20" y="18" width="2" height="4" fill="#9A8A6A" />
      <rect x="21" y="22" width="2" height="4" fill="#9A8A6A" />
      <rect x="22" y="26" width="2" height="3" fill="#9A8A6A" />
      {/* 가운데 받침 */}
      <rect x="15" y="18" width="2" height="9" fill="#9A8A6A" />
    </>
  );
}

/** Founder — 깃발. 정상에 꽂는 하나의 깃발. */
function Flag() {
  return (
    <>
      {/* 언덕 */}
      <rect x="6" y="27" width="20" height="3" fill="var(--p-to)" opacity="0.5" />
      <rect x="10" y="25" width="12" height="2" fill="var(--p-to)" opacity="0.5" />
      {/* 깃대 */}
      <rect x="15" y="4" width="2" height="23" fill="#8A8A92" />
      {/* 페넌트 깃발 — 끝으로 갈수록 좁아짐 */}
      <rect x="17" y="5" width="9" height="3" fill="var(--p-from)" />
      <rect x="17" y="8" width="7" height="3" fill="var(--p-from)" />
      <rect x="17" y="11" width="5" height="3" fill="var(--p-from)" />
    </>
  );
}

/** Engineer — 탑. 차곡차곡 쌓아 올린 시스템. */
function Tower() {
  return (
    <>
      {/* 안테나 */}
      <rect x="15" y="2" width="2" height="5" fill="#8A8A92" />
      <rect x="14" y="2" width="4" height="1" fill="#8A8A92" />
      {/* 위 블록 */}
      <rect x="12" y="7" width="8" height="7" fill="var(--p-from)" />
      <rect x="14" y="9" width="2" height="2" fill="#F4E9C8" />
      <rect x="17" y="9" width="2" height="2" fill="#F4E9C8" />
      {/* 가운데 블록 */}
      <rect x="10" y="14" width="12" height="7" fill="var(--p-to)" />
      <rect x="12" y="16" width="2" height="2" fill="#F4E9C8" />
      <rect x="15" y="16" width="2" height="2" fill="#F4E9C8" />
      <rect x="18" y="16" width="2" height="2" fill="#F4E9C8" />
      {/* 아래 블록 */}
      <rect x="8" y="21" width="16" height="8" fill="var(--p-from)" />
      <rect x="8" y="21" width="16" height="8" fill="#000000" opacity="0.1" />
      <rect x="11" y="23" width="2" height="2" fill="#F4E9C8" />
      <rect x="15" y="23" width="2" height="2" fill="#F4E9C8" />
      <rect x="19" y="23" width="2" height="2" fill="#F4E9C8" />
    </>
  );
}

