// 헤더에 박히는 클라이언트 컨트롤러 — 아바타 + 온보딩 + 프로필 모달 오케스트레이션.
"use client";

import { useState } from "react";
import type { Journey, Lesson, Stage } from "@/lib/types";
import { useCharacter } from "@/hooks/useCharacter";
import { CharacterAvatar } from "./CharacterAvatar";
import { CharacterOnboarding } from "./CharacterOnboarding";
import { CharacterProfile } from "./CharacterProfile";

type Props = {
  stages: Stage[];
  journeys: Journey[];
  lessonsByStage: Record<string, Lesson[]>;
};

export function CharacterShell({ stages, journeys, lessonsByStage }: Props) {
  const { mounted, character } = useCharacter();
  const [profileOpen, setProfileOpen] = useState(false);

  // SSR/첫 렌더 — 자리만 잡아두고 마운트 후 결정.
  if (!mounted) {
    return <div className="character-shell-placeholder" aria-hidden />;
  }

  // 캐릭터 없음 — 온보딩 모달 (강제 1회)
  if (!character) {
    return <CharacterOnboarding onDone={() => undefined} />;
  }

  return (
    <>
      <CharacterAvatar
        onClick={() => setProfileOpen(true)}
        ariaLabel={`${character.handle} — 프로필 열기`}
      />
      {profileOpen && (
        <CharacterProfile
          stages={stages}
          journeys={journeys}
          lessonsByStage={lessonsByStage}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </>
  );
}
