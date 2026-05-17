// 동물 캐릭터 선택 그리드 — 온보딩·프로필 공용. 6종 중 하나를 고른다.
"use client";

import { ANIMALS, ANIMAL_LABEL, type Animal } from "@/hooks/useCharacter";
import { AnimalSvg } from "./CharacterAvatar";

export function AnimalPicker({
  value,
  onChange,
}: {
  value: Animal;
  onChange: (animal: Animal) => void;
}) {
  return (
    <div className="animal-picker" role="radiogroup" aria-label="동물 캐릭터 선택">
      {ANIMALS.map((animal) => {
        const selected = animal === value;
        return (
          <button
            key={animal}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`animal-picker__item${selected ? " is-selected" : ""}`}
            onClick={() => onChange(animal)}
          >
            <span className="animal-picker__art" aria-hidden>
              <AnimalSvg animal={animal} />
            </span>
            <span className="animal-picker__label">{ANIMAL_LABEL[animal]}</span>
          </button>
        );
      })}
    </div>
  );
}
