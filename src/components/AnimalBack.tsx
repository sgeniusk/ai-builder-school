// 동물 캐릭터 뒷모습 — 여정 히어로에서 "산을 바라보며 출발선에 선" 장면용.
// 정면 아바타(CharacterAvatar)와 같은 32×32 crispEdges 픽셀 스타일. 얼굴 없음, 실루엣·귀·꼬리로 구분.
"use client";

import type { Animal } from "@/hooks/useCharacter";

export function AnimalBack({ animal }: { animal: Animal }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      width="100%"
      height="100%"
      aria-hidden
    >
      {animal === "puppy" && <PuppyBack />}
      {animal === "kitten" && <KittenBack />}
      {animal === "dolphin" && <DolphinBack />}
      {animal === "rabbit" && <RabbitBack />}
      {animal === "fox" && <FoxBack />}
      {animal === "penguin" && <PenguinBack />}
    </svg>
  );
}

/** 등 한가운데 살짝 어두운 솔기 — 뒷모습 입체감. */
function Seam({ fill }: { fill: string }) {
  return <rect x="15" y="9" width="2" height="13" fill={fill} opacity="0.55" />;
}

function PuppyBack() {
  return (
    <>
      {/* 드리운 귀 */}
      <rect x="5" y="6" width="4" height="3" fill="#A88060" />
      <rect x="4" y="9" width="4" height="6" fill="#A88060" />
      <rect x="23" y="6" width="4" height="3" fill="#A88060" />
      <rect x="24" y="9" width="4" height="6" fill="#A88060" />
      {/* 머리·등 */}
      <rect x="11" y="4" width="10" height="2" fill="#F0D2A5" />
      <rect x="9" y="6" width="14" height="19" fill="#F0D2A5" />
      <rect x="10" y="25" width="12" height="2" fill="#F0D2A5" />
      <Seam fill="#D9B584" />
      {/* 꼬리 — 오른쪽 위로 말림 */}
      <rect x="22" y="19" width="3" height="3" fill="#A88060" />
      <rect x="24" y="15" width="3" height="5" fill="#A88060" />
    </>
  );
}

function KittenBack() {
  return (
    <>
      {/* 뾰족 귀 */}
      <rect x="7" y="2" width="4" height="2" fill="#9AA0AC" />
      <rect x="7" y="4" width="5" height="3" fill="#9AA0AC" />
      <rect x="21" y="2" width="4" height="2" fill="#9AA0AC" />
      <rect x="20" y="4" width="5" height="3" fill="#9AA0AC" />
      {/* 머리·등 */}
      <rect x="11" y="6" width="10" height="2" fill="#BFC4CE" />
      <rect x="9" y="8" width="14" height="17" fill="#BFC4CE" />
      <rect x="10" y="25" width="12" height="2" fill="#BFC4CE" />
      <Seam fill="#A6ABB6" />
      {/* 긴 꼬리 — 오른쪽으로 휨 */}
      <rect x="22" y="22" width="3" height="3" fill="#BFC4CE" />
      <rect x="24" y="18" width="3" height="5" fill="#BFC4CE" />
      <rect x="25" y="15" width="3" height="4" fill="#BFC4CE" />
    </>
  );
}

function DolphinBack() {
  return (
    <>
      {/* 등지느러미 */}
      <rect x="14" y="2" width="3" height="2" fill="#5E86A6" />
      <rect x="13" y="4" width="5" height="3" fill="#5E86A6" />
      {/* 머리·등 */}
      <rect x="11" y="7" width="10" height="2" fill="#7FA6C4" />
      <rect x="9" y="9" width="14" height="14" fill="#7FA6C4" />
      <rect x="10" y="23" width="12" height="2" fill="#7FA6C4" />
      <Seam fill="#6791B0" />
      {/* 꼬리 지느러미 */}
      <rect x="12" y="25" width="3" height="3" fill="#7FA6C4" />
      <rect x="17" y="25" width="3" height="3" fill="#7FA6C4" />
      <rect x="10" y="28" width="4" height="2" fill="#5E86A6" />
      <rect x="18" y="28" width="4" height="2" fill="#5E86A6" />
    </>
  );
}

function RabbitBack() {
  return (
    <>
      {/* 긴 귀 */}
      <rect x="9" y="0" width="3" height="9" fill="#F0E8DC" />
      <rect x="20" y="0" width="3" height="9" fill="#F0E8DC" />
      {/* 머리·등 */}
      <rect x="11" y="8" width="10" height="2" fill="#F0E8DC" />
      <rect x="9" y="10" width="14" height="14" fill="#F0E8DC" />
      <rect x="10" y="24" width="12" height="2" fill="#F0E8DC" />
      <Seam fill="#DDD3C2" />
      {/* 솜꼬리 */}
      <rect x="13" y="24" width="6" height="4" fill="#F8F5EF" />
      <rect x="14" y="28" width="4" height="2" fill="#F8F5EF" />
    </>
  );
}

function FoxBack() {
  return (
    <>
      {/* 뾰족 귀 (검은 끝) */}
      <rect x="6" y="2" width="4" height="2" fill="#1C1C1C" />
      <rect x="6" y="4" width="5" height="3" fill="#E08440" />
      <rect x="22" y="2" width="4" height="2" fill="#1C1C1C" />
      <rect x="21" y="4" width="5" height="3" fill="#E08440" />
      {/* 머리·등 */}
      <rect x="11" y="6" width="10" height="2" fill="#E08440" />
      <rect x="9" y="8" width="14" height="16" fill="#E08440" />
      <rect x="10" y="24" width="12" height="2" fill="#E08440" />
      <Seam fill="#C26E2E" />
      {/* 풍성한 꼬리 — 흰 끝 */}
      <rect x="21" y="18" width="4" height="4" fill="#E08440" />
      <rect x="23" y="21" width="4" height="4" fill="#E08440" />
      <rect x="24" y="25" width="4" height="3" fill="#F4EDE2" />
    </>
  );
}

function PenguinBack() {
  return (
    <>
      {/* 머리·등 (검정) */}
      <rect x="11" y="3" width="10" height="2" fill="#2E2E36" />
      <rect x="9" y="5" width="14" height="20" fill="#2E2E36" />
      <rect x="10" y="25" width="12" height="2" fill="#2E2E36" />
      {/* 날개 — 양옆 */}
      <rect x="7" y="11" width="2" height="9" fill="#22222A" />
      <rect x="23" y="11" width="2" height="9" fill="#22222A" />
      <Seam fill="#43434E" />
      {/* 짧은 꼬리 */}
      <rect x="13" y="27" width="6" height="2" fill="#2E2E36" />
    </>
  );
}
