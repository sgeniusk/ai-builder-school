// 헤더·모달에 쓰는 픽셀 아트 캐릭터 아바타. 목줄·악세서리 색은 현재 여정 persona 색을 따른다.
// 6종 — 강아지·고양이·돌고래·토끼·여우·펭귄. animal prop 을 주면 그 동물을, 없으면 내 캐릭터를 그린다.
"use client";

import { useCharacter, type Animal } from "@/hooks/useCharacter";

type Props = {
  size?: number;
  onClick?: () => void;
  ariaLabel?: string;
  /** 특정 동물을 강제로 그릴 때 (선택 UI 미리보기용). 없으면 내 캐릭터. */
  animal?: Animal;
};

export function CharacterAvatar({
  size = 32,
  onClick,
  ariaLabel = "내 캐릭터",
  animal,
}: Props) {
  const { mounted, character } = useCharacter();

  // prop 우선 → 없으면 내 캐릭터 → SSR/첫 렌더는 강아지로 깜박임 방지.
  const shown: Animal =
    animal ?? (mounted && character ? character.animal : "puppy");

  return (
    <button
      type="button"
      className="character-avatar"
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <AnimalSvg animal={shown} />
    </button>
  );
}

/** 동물 한 종을 그리는 픽셀 아트 SVG. 32×32 그리드, crispEdges. */
export function AnimalSvg({ animal }: { animal: Animal }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      width="100%"
      height="100%"
      aria-hidden
    >
      {animal === "puppy" && <PuppyArt />}
      {animal === "kitten" && <KittenArt />}
      {animal === "dolphin" && <DolphinArt />}
      {animal === "rabbit" && <RabbitArt />}
      {animal === "fox" && <FoxArt />}
      {animal === "penguin" && <PenguinArt />}
    </svg>
  );
}

/** 목줄 — 모든 동물 공통, persona 색. */
function Collar() {
  return (
    <>
      <rect x="6" y="25" width="20" height="3" fill="var(--p-from, #6B6B6B)" />
      <rect x="6" y="28" width="20" height="1" fill="var(--p-to, #2A2A2A)" />
      <rect x="15" y="28" width="2" height="3" fill="var(--p-to, #2A2A2A)" />
      <rect x="15" y="29" width="2" height="1" fill="var(--p-from, #6B6B6B)" />
    </>
  );
}

function PuppyArt() {
  return (
    <>
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
      {/* 머리 */}
      <rect x="7" y="6" width="18" height="2" fill="#F0D2A5" />
      <rect x="5" y="8" width="22" height="14" fill="#F0D2A5" />
      <rect x="7" y="22" width="18" height="2" fill="#F0D2A5" />
      {/* 눈 */}
      <rect x="10" y="13" width="2" height="2" fill="#0D0D0D" />
      <rect x="10" y="12" width="1" height="1" fill="#FFFFFF" />
      <rect x="20" y="13" width="2" height="2" fill="#0D0D0D" />
      <rect x="20" y="12" width="1" height="1" fill="#FFFFFF" />
      {/* 볼 */}
      <rect x="8" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />
      <rect x="22" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />
      {/* 코·입 */}
      <rect x="14" y="17" width="4" height="3" fill="#3A2A1F" />
      <rect x="15" y="17" width="1" height="1" fill="#5A4030" />
      <rect x="15" y="20" width="2" height="1" fill="#3A2A1F" />
      {/* 목 */}
      <rect x="9" y="24" width="14" height="1" fill="#E8C896" />
      <Collar />
    </>
  );
}

function KittenArt() {
  return (
    <>
      {/* 왼쪽 귀 (뾰족) */}
      <rect x="6" y="3" width="4" height="2" fill="#9AA0AC" />
      <rect x="6" y="5" width="5" height="3" fill="#9AA0AC" />
      <rect x="8" y="5" width="2" height="2" fill="#E8A0A8" />
      {/* 오른쪽 귀 */}
      <rect x="22" y="3" width="4" height="2" fill="#9AA0AC" />
      <rect x="21" y="5" width="5" height="3" fill="#9AA0AC" />
      <rect x="22" y="5" width="2" height="2" fill="#E8A0A8" />
      {/* 머리 */}
      <rect x="7" y="7" width="18" height="2" fill="#BFC4CE" />
      <rect x="5" y="9" width="22" height="13" fill="#BFC4CE" />
      <rect x="7" y="22" width="18" height="2" fill="#BFC4CE" />
      {/* 이마 줄무늬 */}
      <rect x="14" y="7" width="1" height="3" fill="#9AA0AC" />
      <rect x="17" y="7" width="1" height="3" fill="#9AA0AC" />
      {/* 눈 */}
      <rect x="10" y="13" width="2" height="3" fill="#1C3A2A" />
      <rect x="10" y="13" width="1" height="1" fill="#FFFFFF" />
      <rect x="20" y="13" width="2" height="3" fill="#1C3A2A" />
      <rect x="20" y="13" width="1" height="1" fill="#FFFFFF" />
      {/* 코 */}
      <rect x="15" y="17" width="2" height="2" fill="#E8929A" />
      {/* 입 */}
      <rect x="13" y="19" width="2" height="1" fill="#7A7E88" />
      <rect x="17" y="19" width="2" height="1" fill="#7A7E88" />
      {/* 수염 */}
      <rect x="0" y="16" width="5" height="1" fill="#9AA0AC" />
      <rect x="0" y="19" width="5" height="1" fill="#9AA0AC" />
      <rect x="27" y="16" width="5" height="1" fill="#9AA0AC" />
      <rect x="27" y="19" width="5" height="1" fill="#9AA0AC" />
      <Collar />
    </>
  );
}

function DolphinArt() {
  return (
    <>
      {/* 등지느러미 */}
      <rect x="14" y="1" width="3" height="2" fill="#5E86A6" />
      <rect x="13" y="3" width="5" height="2" fill="#5E86A6" />
      {/* 머리 */}
      <rect x="8" y="5" width="16" height="2" fill="#7FA6C4" />
      <rect x="6" y="7" width="20" height="13" fill="#7FA6C4" />
      <rect x="8" y="20" width="16" height="2" fill="#7FA6C4" />
      {/* 배 (밝은 부분) */}
      <rect x="9" y="17" width="14" height="3" fill="#CDDDE8" />
      {/* 눈 */}
      <rect x="11" y="11" width="2" height="2" fill="#0D0D0D" />
      <rect x="11" y="11" width="1" height="1" fill="#FFFFFF" />
      <rect x="19" y="11" width="2" height="2" fill="#0D0D0D" />
      <rect x="19" y="11" width="1" height="1" fill="#FFFFFF" />
      {/* 미소 */}
      <rect x="12" y="16" width="8" height="1" fill="#4A6378" />
      <rect x="11" y="15" width="1" height="1" fill="#4A6378" />
      <rect x="20" y="15" width="1" height="1" fill="#4A6378" />
      {/* 주둥이 */}
      <rect x="12" y="22" width="8" height="2" fill="#7FA6C4" />
      <rect x="13" y="24" width="6" height="1" fill="#9CBBD2" />
      <Collar />
    </>
  );
}

function RabbitArt() {
  return (
    <>
      {/* 왼쪽 귀 (길쭉) */}
      <rect x="9" y="0" width="3" height="10" fill="#F0E8DC" />
      <rect x="10" y="2" width="1" height="6" fill="#E8A8AE" />
      {/* 오른쪽 귀 */}
      <rect x="20" y="0" width="3" height="10" fill="#F0E8DC" />
      <rect x="21" y="2" width="1" height="6" fill="#E8A8AE" />
      {/* 머리 */}
      <rect x="8" y="9" width="16" height="2" fill="#F0E8DC" />
      <rect x="6" y="11" width="20" height="11" fill="#F0E8DC" />
      <rect x="8" y="22" width="16" height="2" fill="#F0E8DC" />
      {/* 눈 */}
      <rect x="10" y="14" width="2" height="2" fill="#0D0D0D" />
      <rect x="10" y="14" width="1" height="1" fill="#FFFFFF" />
      <rect x="20" y="14" width="2" height="2" fill="#0D0D0D" />
      <rect x="20" y="14" width="1" height="1" fill="#FFFFFF" />
      {/* 볼 */}
      <rect x="8" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />
      <rect x="22" y="17" width="2" height="1" fill="#F4B8B0" opacity="0.6" />
      {/* 코·입 */}
      <rect x="15" y="17" width="2" height="2" fill="#E8929A" />
      <rect x="14" y="19" width="1" height="1" fill="#9A8A7A" />
      <rect x="17" y="19" width="1" height="1" fill="#9A8A7A" />
      {/* 앞니 */}
      <rect x="15" y="20" width="2" height="1" fill="#FFFFFF" />
      <Collar />
    </>
  );
}

function FoxArt() {
  return (
    <>
      {/* 왼쪽 귀 (뾰족·검은 끝) */}
      <rect x="5" y="2" width="4" height="2" fill="#1C1C1C" />
      <rect x="5" y="4" width="5" height="4" fill="#E08440" />
      {/* 오른쪽 귀 */}
      <rect x="23" y="2" width="4" height="2" fill="#1C1C1C" />
      <rect x="22" y="4" width="5" height="4" fill="#E08440" />
      {/* 머리 (주황) */}
      <rect x="7" y="7" width="18" height="2" fill="#E08440" />
      <rect x="5" y="9" width="22" height="13" fill="#E08440" />
      <rect x="7" y="22" width="18" height="2" fill="#E08440" />
      {/* 흰 주둥이·볼 */}
      <rect x="8" y="15" width="16" height="5" fill="#F4EDE2" />
      <rect x="11" y="20" width="10" height="2" fill="#F4EDE2" />
      {/* 눈 */}
      <rect x="10" y="12" width="2" height="2" fill="#0D0D0D" />
      <rect x="10" y="12" width="1" height="1" fill="#FFFFFF" />
      <rect x="20" y="12" width="2" height="2" fill="#0D0D0D" />
      <rect x="20" y="12" width="1" height="1" fill="#FFFFFF" />
      {/* 코 */}
      <rect x="14" y="16" width="4" height="3" fill="#1C1C1C" />
      <rect x="15" y="16" width="1" height="1" fill="#3A3A3A" />
      <Collar />
    </>
  );
}

function PenguinArt() {
  return (
    <>
      {/* 머리 (검정) */}
      <rect x="8" y="3" width="16" height="2" fill="#2E2E36" />
      <rect x="6" y="5" width="20" height="17" fill="#2E2E36" />
      <rect x="8" y="22" width="16" height="2" fill="#2E2E36" />
      {/* 흰 얼굴 */}
      <rect x="9" y="11" width="14" height="9" fill="#F4F4EE" />
      <rect x="11" y="9" width="10" height="2" fill="#F4F4EE" />
      {/* 눈 */}
      <rect x="12" y="12" width="2" height="2" fill="#0D0D0D" />
      <rect x="12" y="12" width="1" height="1" fill="#FFFFFF" />
      <rect x="18" y="12" width="2" height="2" fill="#0D0D0D" />
      <rect x="18" y="12" width="1" height="1" fill="#FFFFFF" />
      {/* 부리 (주황) */}
      <rect x="14" y="15" width="4" height="2" fill="#F0A032" />
      <rect x="15" y="17" width="2" height="1" fill="#D8881E" />
      {/* 볼 */}
      <rect x="10" y="15" width="1" height="1" fill="#F4B8B0" opacity="0.6" />
      <rect x="21" y="15" width="1" height="1" fill="#F4B8B0" opacity="0.6" />
      <Collar />
    </>
  );
}
