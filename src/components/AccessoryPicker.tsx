// 캐릭터 액세서리 선택기 — 업적으로 잠금 해제한 것만 고를 수 있다. 잠긴 건 흐리게 미리보기.
// 동물 선택기(AnimalPicker)와 같은 그리드 스타일(.animal-picker)을 재사용.
"use client";

import {
  ACCESSORIES,
  ACCESSORY_LABEL,
  ACCESSORY_UNLOCK,
  type Accessory,
} from "@/lib/accessories";
import { ACHIEVEMENTS } from "@/lib/achievements";
import type { Animal } from "@/hooks/useCharacter";
import { AnimalSvg } from "./CharacterAvatar";

export function AccessoryPicker({
  value,
  onChange,
  earned,
  animal,
}: {
  value: Accessory | undefined;
  onChange: (accessory: Accessory | undefined) => void;
  /** 달성한 업적 id 집합 — 액세서리 잠금 해제 판정. */
  earned: Set<string>;
  /** 미리보기에 쓸 동물. */
  animal: Animal;
}) {
  return (
    <div className="animal-picker" role="radiogroup" aria-label="액세서리 선택">
      <button
        type="button"
        role="radio"
        aria-checked={!value}
        className={`animal-picker__item${!value ? " is-selected" : ""}`}
        onClick={() => onChange(undefined)}
      >
        <span className="animal-picker__art" aria-hidden>
          <AnimalSvg animal={animal} />
        </span>
        <span className="animal-picker__label">없음</span>
      </button>

      {ACCESSORIES.map((accessory) => {
        const unlocked = earned.has(ACCESSORY_UNLOCK[accessory]);
        const selected = accessory === value;
        const unlockAch = ACHIEVEMENTS.find(
          (a) => a.id === ACCESSORY_UNLOCK[accessory],
        );

        if (!unlocked) {
          return (
            <div
              key={accessory}
              className="animal-picker__item is-locked"
              aria-disabled="true"
              title={
                unlockAch
                  ? `'${unlockAch.label}' 업적을 달성하면 열려요`
                  : undefined
              }
            >
              <span className="animal-picker__art" aria-hidden>
                <AnimalSvg animal={animal} accessory={accessory} />
              </span>
              <span className="animal-picker__label">
                {ACCESSORY_LABEL[accessory]} · 잠김
              </span>
            </div>
          );
        }

        return (
          <button
            key={accessory}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`animal-picker__item${selected ? " is-selected" : ""}`}
            onClick={() => onChange(accessory)}
          >
            <span className="animal-picker__art" aria-hidden>
              <AnimalSvg animal={animal} accessory={accessory} />
            </span>
            <span className="animal-picker__label">
              {ACCESSORY_LABEL[accessory]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
