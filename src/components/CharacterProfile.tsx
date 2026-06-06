// 헤더 캐릭터를 누르면 뜨는 프로필 모달. 핸들·여정·완료 lesson 수·완주 stage 배지.
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Journey, Lesson, Stage } from "@/lib/types";
import { useCharacter } from "@/hooks/useCharacter";
import {
  useLessonProgress,
  type ProgressLesson,
} from "@/hooks/useLessonProgress";
import { useStreak } from "@/hooks/useStreak";
import { getBuilderRank } from "@/lib/builderRank";
import { ACHIEVEMENTS, evaluateAchievements } from "@/lib/achievements";
import { CharacterAvatar } from "./CharacterAvatar";
import { AnimalPicker } from "./AnimalPicker";
import { AccessoryPicker } from "./AccessoryPicker";

type Props = {
  stages: Stage[];
  journeys: Journey[];
  lessonsByStage: Record<string, Lesson[]>;
  projectKeyLessons: ProgressLesson[][];
  onClose: () => void;
};

const HANDLE_MAX = 20;

export function CharacterProfile({
  stages,
  journeys,
  lessonsByStage,
  projectKeyLessons,
  onClose,
}: Props) {
  const { character, setHandle, setAnimal, setAccessory, reset } =
    useCharacter();
  const { journey, isLessonComplete } = useLessonProgress();
  const streak = useStreak();
  const [editing, setEditing] = useState(false);
  const [draftHandle, setDraftHandle] = useState(character?.handle ?? "");
  const [confirmReset, setConfirmReset] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!character) return null;

  const myJourney = journeys.find((j) => j.id === journey);

  // 전체 / 완료 lesson 수 + stage 별 완료 여부
  let totalLessons = 0;
  let doneLessons = 0;
  const completedStages: Stage[] = [];
  for (const s of stages) {
    const list = lessonsByStage[s.id] ?? [];
    if (list.length === 0) continue;
    totalLessons += list.length;
    let stageAllDone = true;
    for (const l of list) {
      if (isLessonComplete(l)) {
        doneLessons += 1;
      } else {
        stageAllDone = false;
      }
    }
    if (stageAllDone) completedStages.push(s);
  }
  const pct =
    totalLessons === 0 ? 0 : Math.round((doneLessons / totalLessons) * 100);

  // 업적 컨텍스트 — 모두 진척에서 파생, 별도 저장 없음.
  const allLessonsList = Object.values(lessonsByStage).flat();
  const bySlug = new Map(allLessonsList.map((l) => [l.slug, l]));
  const journeyLessons = (myJourney?.recommendedLessons ?? [])
    .map((s) => bySlug.get(s))
    .filter((l): l is Lesson => Boolean(l));
  const journeyDone = journeyLessons.filter((l) => isLessonComplete(l)).length;
  const readyProjects = projectKeyLessons.filter(
    (refs) => refs.length > 0 && refs.every((l) => isLessonComplete(l)),
  ).length;
  const earned = evaluateAchievements({
    doneLessons,
    completedStages: completedStages.length,
    bestStreak: streak?.best ?? 0,
    readyProjects,
    journeyDone,
    journeyTotal: journeyLessons.length,
  });

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
          <p className="char-modal__rank">
            <span aria-hidden>{getBuilderRank(doneLessons, totalLessons).emoji}</span>{" "}
            {getBuilderRank(doneLessons, totalLessons).label}
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

        <Link href="/me" className="btn ghost char-profile__dash" onClick={onClose}>
          빌더 대시보드 열기 <span className="arrow">→</span>
        </Link>

        <div className="char-profile__section">
          <div className="kicker">동물 친구</div>
          <AnimalPicker value={character.animal} onChange={setAnimal} />
        </div>

        <div className="char-profile__section">
          <div className="kicker">액세서리 — 업적으로 잠금 해제</div>
          <AccessoryPicker
            value={character.accessory}
            onChange={setAccessory}
            earned={earned}
            animal={character.animal}
          />
        </div>

        <div className="char-profile__section">
          <div className="kicker">완주한 Stage</div>
          {completedStages.length === 0 ? (
            <p className="char-profile__empty">
              아직 완주한 stage 가 없어요. 한 lesson 의 빌드·검증·회고를 모두
              체크하면 진행률이 차고, stage 전체가 차면 여기 배지가 추가됩니다.
            </p>
          ) : (
            <ul className="char-profile__phases">
              {completedStages.map((s) => (
                <li key={s.id} className="char-profile__phase-badge">
                  <span className="char-profile__phase-num mono">
                    {String(s.order).padStart(2, "0")}
                  </span>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="char-profile__section">
          <div className="kicker">
            업적{" "}
            <span className="ach-count mono" suppressHydrationWarning>
              {earned.size}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <ul className="ach-grid">
            {ACHIEVEMENTS.map((a) => {
              const got = earned.has(a.id);
              return (
                <li
                  key={a.id}
                  className={`ach-item${got ? " is-earned" : ""}`}
                  suppressHydrationWarning
                >
                  <span className="ach-item__label">{a.label}</span>
                  <span className="ach-item__desc">{a.description}</span>
                </li>
              );
            })}
          </ul>
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
