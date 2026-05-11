// 헤더 캐릭터를 누르면 뜨는 프로필 모달. 핸들·여정·완료 lesson 수·완료 phase 배지.
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Journey, Lesson, Phase } from "@/lib/types";
import { useCharacter } from "@/hooks/useCharacter";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { CharacterAvatar } from "./CharacterAvatar";

type Props = {
  phases: Phase[];
  journeys: Journey[];
  lessonsByPhase: Record<string, Lesson[]>;
  onClose: () => void;
};

const HANDLE_MAX = 20;

export function CharacterProfile({
  phases,
  journeys,
  lessonsByPhase,
  onClose,
}: Props) {
  const { character, setHandle, reset } = useCharacter();
  const { journey, isLessonComplete } = useLessonProgress();
  const [editing, setEditing] = useState(false);
  const [draftHandle, setDraftHandle] = useState(character?.handle ?? "");
  const [confirmReset, setConfirmReset] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!character) return null;

  const myJourney = journeys.find((j) => j.id === journey);

  // 전체 / 완료 lesson 수 + phase 별 완료 여부
  let totalLessons = 0;
  let doneLessons = 0;
  const completedPhases: Phase[] = [];
  for (const p of phases) {
    const list = lessonsByPhase[p.id] ?? [];
    if (list.length === 0) continue;
    totalLessons += list.length;
    let phaseAllDone = true;
    for (const l of list) {
      if (isLessonComplete(l)) {
        doneLessons += 1;
      } else {
        phaseAllDone = false;
      }
    }
    if (phaseAllDone) completedPhases.push(p);
  }
  const pct =
    totalLessons === 0 ? 0 : Math.round((doneLessons / totalLessons) * 100);

  const personaClass = myJourney ? `p-${myJourney.id}` : "";
  const createdAt = new Date(character.createdAt);
  const createdStr = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;

  const commitHandle = () => {
    const trimmed = draftHandle.trim().slice(0, HANDLE_MAX);
    if (trimmed.length > 0 && trimmed !== character.handle) {
      setHandle(trimmed);
    }
    setEditing(false);
  };

  const modal = (
    <div
      className={`char-modal-backdrop ${personaClass}`.trim()}
      role="dialog"
      aria-modal="true"
    >
      <div className="char-modal char-modal--profile">
        <button
          type="button"
          className="char-modal__close"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>

        <div className="char-modal__hero">
          <div className="char-modal__avatar-wrap">
            <CharacterAvatar size={80} ariaLabel="내 캐릭터" />
          </div>

          {editing ? (
            <input
              className="char-modal__title-input"
              value={draftHandle}
              maxLength={HANDLE_MAX}
              autoFocus
              onChange={(e) => setDraftHandle(e.target.value)}
              onBlur={commitHandle}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitHandle();
                if (e.key === "Escape") {
                  setDraftHandle(character.handle);
                  setEditing(false);
                }
              }}
            />
          ) : (
            <button
              type="button"
              className="char-modal__title char-modal__title-btn"
              onClick={() => {
                setDraftHandle(character.handle);
                setEditing(true);
              }}
              title="이름 바꾸기"
            >
              {character.handle}
            </button>
          )}

          <p className="char-modal__sub">
            {myJourney ? myJourney.titleKo : "여정 미정"} · 시작 {createdStr}
          </p>
        </div>

        <div className="char-profile__progress">
          <div className="char-profile__pct">
            <span className="p-text" suppressHydrationWarning>
              {pct}
            </span>
            <span className="char-profile__pct-sym">%</span>
          </div>
          <div className="char-profile__pct-meta tnum">
            <span suppressHydrationWarning>{doneLessons}</span>
            <span> / {totalLessons} lesson 완료</span>
          </div>
          <div className="char-profile__bar" aria-hidden>
            <span
              className="char-profile__fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="char-profile__section">
          <div className="kicker">완주한 Phase</div>
          {completedPhases.length === 0 ? (
            <p className="char-profile__empty">
              아직 완주한 phase 가 없어요. 한 lesson 의 빌드·검증·회고를 모두
              체크하면 진행률이 차고, phase 전체가 차면 여기 배지가 추가됩니다.
            </p>
          ) : (
            <ul className="char-profile__phases">
              {completedPhases.map((p) => (
                <li key={p.id} className="char-profile__phase-badge">
                  <span className="char-profile__phase-num mono">
                    {String(p.order).padStart(2, "0")}
                  </span>
                  <span>{p.titleKo}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="char-modal__note">
          모든 데이터는 이 브라우저의 localStorage 에만 있습니다. 디바이스가
          바뀌면 초기화됩니다.
        </p>

        <div className="char-profile__reset">
          {confirmReset ? (
            <div className="char-profile__reset-row">
              <span className="char-profile__reset-msg">
                정말 캐릭터를 삭제하고 처음부터 다시 시작할까요? (진행률은
                유지됩니다)
              </span>
              <button
                type="button"
                className="char-modal__handle-action"
                onClick={() => setConfirmReset(false)}
              >
                아니오
              </button>
              <button
                type="button"
                className="char-modal__handle-action char-profile__reset-confirm"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                네, 삭제
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="char-profile__reset-btn"
              onClick={() => setConfirmReset(true)}
            >
              캐릭터 초기화
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (!portalTarget) return null;
  return createPortal(modal, portalTarget);
}
