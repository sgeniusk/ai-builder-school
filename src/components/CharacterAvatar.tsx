// 헤더에 박히는 픽셀 아트 캐릭터 아바타. 옷·악세서리 색은 현재 여정 persona 색을 따른다.
// M1 — 강아지 한 종만 SVG 인라인. M3 에서 고양이·돌고래·AI 생성 PNG 로 확장.
"use client";

import { useCharacter } from "@/hooks/useCharacter";

type Props = {
  size?: number;
  onClick?: () => void;
  ariaLabel?: string;
};

export function CharacterAvatar({
  size = 32,
  onClick,
  ariaLabel = "내 캐릭터",
}: Props) {
  const { mounted, character } = useCharacter();

  // SSR/첫 렌더 — 깜박임 방지 위해 같은 강아지를 그대로 보여줌.
  // mounted 후 character.animal 에 맞춰 변경 (M3 에서 활성화).
  const animal = mounted && character ? character.animal : "puppy";

  return (
    <button
      type="button"
      className="character-avatar"
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {animal === "puppy" && <PuppySvg />}
      {animal === "kitten" && <PuppySvg /> /* M3: KittenSvg */}
      {animal === "dolphin" && <PuppySvg /> /* M3: DolphinSvg */}
    </button>
  );
}

function PuppySvg() {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      width="100%"
      height="100%"
      aria-hidden
    >
      {/* 왼쪽 귀 (드리운 모양) */}
      <rect x="3" y="3" width="2" height="2" fill="#A88060" />
      <rect x="3" y="5" width="4" height="2" fill="#A88060" />
      <rect x="3" y="7" width="4" height="3" fill="#A88060" />
      <rect x="5" y="10" width="2" height="2" fill="#A88060" />

      {/* 오른쪽 귀 */}
      <rect x="27" y="3" width="2" height="2" fill="#A88060" />
      <rect x="25" y="5" width="4" height="2" fill="#A88060" />
      <rect x="25" y="7" width="4" height="3" fill="#A88060" />
      <rect x="25" y="10" width="2" height="2" fill="#A88060" />

      {/* 머리 (얼굴 베이스) */}
      <rect x="7" y="6" width="18" height="2" fill="#F0D2A5" />
      <rect x="5" y="8" width="22" height="14" fill="#F0D2A5" />
      <rect x="7" y="22" width="18" height="2" fill="#F0D2A5" />

      {/* 눈 (왼) */}
      <rect x="10" y="13" width="2" height="2" fill="#0D0D0D" />
      <rect x="10" y="12" width="1" height="1" fill="#FFFFFF" />

      {/* 눈 (오) */}
      <rect x="20" y="13" width="2" height="2" fill="#0D0D0D" />
      <rect x="20" y="12" width="1" height="1" fill="#FFFFFF" />

      {/* 볼 (살짝 핑크) */}
      <rect x="8" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />
      <rect x="22" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />

      {/* 코 */}
      <rect x="14" y="17" width="4" height="3" fill="#3A2A1F" />
      <rect x="15" y="17" width="1" height="1" fill="#5A4030" />

      {/* 입 (세로 짧은 선) */}
      <rect x="15" y="20" width="2" height="1" fill="#3A2A1F" />

      {/* 목 (얼굴 보다 약간 좁은 짧은 띠) */}
      <rect x="9" y="24" width="14" height="1" fill="#E8C896" />

      {/* 목줄 (페르소나 색) */}
      <rect
        x="6"
        y="25"
        width="20"
        height="3"
        fill="var(--p-from, #6B6B6B)"
      />
      <rect
        x="6"
        y="28"
        width="20"
        height="1"
        fill="var(--p-to, #2A2A2A)"
      />

      {/* 목줄 태그 (가운데 작은 사각형) */}
      <rect x="15" y="28" width="2" height="3" fill="var(--p-to, #2A2A2A)" />
      <rect x="15" y="29" width="2" height="1" fill="var(--p-from, #6B6B6B)" />
    </svg>
  );
}
