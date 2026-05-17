// 첫 진입 시 한 번만 뜨는 캐릭터 생성 모달. 익명 핸들 자동 생성 + 변경 가능.
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  generateHandle,
  useCharacter,
  type Animal,
} from "@/hooks/useCharacter";
import { CharacterAvatar } from "./CharacterAvatar";
import { AnimalPicker } from "./AnimalPicker";

const HANDLE_MAX = 20;

export function CharacterOnboarding({ onDone }: { onDone: () => void }) {
  const { create } = useCharacter();
  const [handle, setHandle] = useState(() => generateHandle());
  const [animal, setAnimal] = useState<Animal>("puppy");
  const [editing, setEditing] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const handleStart = () => {
    const trimmed = handle.trim().slice(0, HANDLE_MAX);
    if (trimmed.length === 0) return;
    create({ handle: trimmed, animal });
    onDone();
  };

  const modal = (
    <div className="char-modal-backdrop" role="dialog" aria-modal="true">
      <div className="char-modal">
        <div className="char-modal__hero">
          <div className="char-modal__avatar-wrap">
            <CharacterAvatar
              size={80}
              animal={animal}
              ariaLabel="새 캐릭터 미리보기"
            />
          </div>
          <h2 className="char-modal__title">반가워요</h2>
          <p className="char-modal__sub">
            AI Builder School 의 첫 캐릭터를 만들어 학습 여정을 함께 갈 친구를
            정해주세요.
          </p>
        </div>

        <div className="char-modal__field">
          <label className="kicker" htmlFor="char-handle">
            캐릭터 이름
          </label>
          {editing ? (
            <input
              id="char-handle"
              className="char-modal__input"
              value={handle}
              maxLength={HANDLE_MAX}
              autoFocus
              onChange={(e) => setHandle(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditing(false);
              }}
            />
          ) : (
            <div className="char-modal__handle-row">
              <span className="char-modal__handle">{handle}</span>
              <button
                type="button"
                className="char-modal__handle-action"
                onClick={() => setHandle(generateHandle())}
              >
                다시
              </button>
              <button
                type="button"
                className="char-modal__handle-action"
                onClick={() => setEditing(true)}
              >
                직접 입력
              </button>
            </div>
          )}
        </div>

        <div className="char-modal__field">
          <span className="kicker">동물 친구</span>
          <AnimalPicker value={animal} onChange={setAnimal} />
        </div>

        <p className="char-modal__note">
          이름·동물·진행 상태는 이 브라우저에만 저장돼요. 언제든 헤더의
          캐릭터를 눌러 바꿀 수 있습니다.
        </p>

        <button
          type="button"
          className="btn char-modal__cta"
          onClick={handleStart}
        >
          시작하기 <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );

  if (!portalTarget) return null;
  return createPortal(modal, portalTarget);
}
