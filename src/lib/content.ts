import { phases } from "@/content/phases";
import { lessons as rawLessons } from "@/content/lessons";
import { journeys } from "@/content/journeys";
import { projects } from "@/content/projects";
import { templates } from "@/content/templates";
import { stages } from "@/content/stages";
import {
  lessonStageMapping,
  EXPECTED_STAGE_DISTRIBUTION,
  EXPECTED_TOTAL_LESSONS,
} from "@/content/lesson-stage-mapping";
import type {
  Journey,
  JourneyId,
  Lesson,
  Phase,
  Project,
  Stage,
  ContentTemplate,
} from "./types";

/**
 * `lessons.ts` 원본에 `lesson-stage-mapping.ts`를 머지해 stage 필드가 채워진 lesson 배열을 반환.
 * 매핑이 없는 lesson은 stage 필드가 비어 있어 validate 게이트에서 잡힌다.
 */
const lessons: Lesson[] = rawLessons.map((lesson) => {
  const mapping = lessonStageMapping[lesson.slug];
  if (!mapping) return lesson;
  return {
    ...lesson,
    stageId: mapping.stageId,
    stageOrdinal: mapping.stageOrdinal,
    stageSubGroupId: mapping.stageSubGroupId,
  };
});

export function getPhases(): Phase[] {
  return [...phases].sort((a, b) => a.order - b.order);
}

export function getPhaseBySlug(slug: string): Phase | undefined {
  return phases.find((p) => p.slug === slug);
}

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByPhaseId(phaseId: string): Lesson[] {
  return lessons.filter((l) => l.phaseId === phaseId);
}

export function getLessonsByJourney(journeyId: JourneyId): Lesson[] {
  return lessons.filter((l) => l.targetJourneys.includes(journeyId));
}

// ─── Stage 헬퍼 (v0.4) ──────────────────────────────────────────

export function getStages(): Stage[] {
  return [...stages].sort((a, b) => a.order - b.order);
}

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

export function getStageById(id: string): Stage | undefined {
  return stages.find((s) => s.id === id);
}

export function getLessonsByStageId(stageId: string): Lesson[] {
  const stage = getStageById(stageId);
  if (!stage) return [];
  // stage.lessonSlugs 순서를 그대로 유지해 학습 순서를 보존.
  return stage.lessonSlugs
    .map((slug) => lessons.find((l) => l.slug === slug))
    .filter((l): l is Lesson => l !== undefined);
}

export function getLessonsByStageSubGroup(
  stageId: string,
  subGroupId: string,
): Lesson[] {
  const stage = getStageById(stageId);
  const sub = stage?.subGroups?.find((g) => g.id === subGroupId);
  if (!sub) return [];
  return sub.lessonSlugs
    .map((slug) => lessons.find((l) => l.slug === slug))
    .filter((l): l is Lesson => l !== undefined);
}

export function getJourneysByStageSlug(slug: string): Journey[] {
  return journeys.filter((j) => j.recommendedStages?.includes(slug) ?? false);
}

/**
 * Journey 헬퍼 — 기본은 "출발 5개"를 노출. Explorer는 별도 진입점이라
 * 일반 그리드(홈 / 여정 인덱스)에서는 제외하고 별도 컴포넌트로 다룬다.
 */
export function getJourneys(): Journey[] {
  return journeys;
}

export function getStartingJourneys(): Journey[] {
  return journeys.filter((j) => j.id !== "explorer");
}

export function getExplorerJourney(): Journey | undefined {
  return journeys.find((j) => j.id === "explorer");
}

export function getJourneyBySlug(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}

export function getJourneyById(id: JourneyId): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

export function getProjects(): Project[] {
  return projects;
}

export function getProjectsByJourney(journeyId: JourneyId): Project[] {
  return projects.filter((p) => p.targetJourneys.includes(journeyId));
}

export function getJourneysByPhaseSlug(slug: string): Journey[] {
  return journeys.filter((j) => j.recommendedPhases.includes(slug));
}

export function getProjectsByPhaseSlug(slug: string): Project[] {
  return projects.filter((p) => p.requiredPhases.includes(slug));
}

export function getTemplates(): ContentTemplate[] {
  return templates;
}

export function getMvpWeeks(): Array<{ week: number; phase: Phase }> {
  return getPhases()
    .filter((p) => typeof p.weekInMvpPath === "number")
    .map((p) => ({ week: p.weekInMvpPath as number, phase: p }))
    .sort((a, b) => a.week - b.week);
}

export interface ContentIntegrityIssue {
  kind: string;
  ref: string;
  message: string;
}

export function validateContent(): ContentIntegrityIssue[] {
  const issues: ContentIntegrityIssue[] = [];
  const phaseIds = new Set(phases.map((p) => p.id));
  const phaseSlugs = new Set(phases.map((p) => p.slug));
  const lessonSlugs = new Set(lessons.map((l) => l.slug));

  for (const lesson of lessons) {
    if (!phaseIds.has(lesson.phaseId)) {
      issues.push({
        kind: "lesson.phaseId",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references missing phase "${lesson.phaseId}"`,
      });
    }
  }

  for (const phase of phases) {
    for (const slug of phase.lessonSlugs) {
      if (!lessonSlugs.has(slug)) {
        issues.push({
          kind: "phase.lessonSlug",
          ref: phase.slug,
          message: `Phase "${phase.slug}" references missing lesson "${slug}"`,
        });
      }
    }
    if (phase.nextPhaseSlug && !phaseSlugs.has(phase.nextPhaseSlug)) {
      issues.push({
        kind: "phase.nextPhaseSlug",
        ref: phase.slug,
        message: `Phase "${phase.slug}" references missing next phase "${phase.nextPhaseSlug}"`,
      });
    }
  }

  for (const journey of journeys) {
    for (const slug of journey.recommendedPhases) {
      if (!phaseSlugs.has(slug)) {
        issues.push({
          kind: "journey.phase",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing phase "${slug}"`,
        });
      }
    }
    for (const slug of journey.recommendedLessons) {
      if (!lessonSlugs.has(slug)) {
        issues.push({
          kind: "journey.lesson",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing lesson "${slug}"`,
        });
      }
    }
  }

  for (const project of projects) {
    for (const slug of project.requiredPhases) {
      if (!phaseSlugs.has(slug)) {
        issues.push({
          kind: "project.phase",
          ref: project.slug,
          message: `Project "${project.slug}" requires missing phase "${slug}"`,
        });
      }
    }
  }

  // ─── v0.4 Stage 모델 검증 ──────────────────────────────────────
  const stageIds = new Set(stages.map((s) => s.id));
  const stageSlugs = new Set(stages.map((s) => s.slug));

  // 1) 모든 lesson에 stageId가 부여됐는지 (매핑 커버리지)
  for (const lesson of lessons) {
    if (!lesson.stageId) {
      issues.push({
        kind: "lesson.stageId.missing",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" has no stage mapping in lesson-stage-mapping.ts`,
      });
      continue;
    }
    if (!stageIds.has(lesson.stageId)) {
      issues.push({
        kind: "lesson.stageId.invalid",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references unknown stage "${lesson.stageId}"`,
      });
    }
  }

  // 2) Stage.lessonSlugs ↔ lesson.slug 양방향 일치
  const lessonSlugList = new Set(lessons.map((l) => l.slug));
  for (const stage of stages) {
    for (const slug of stage.lessonSlugs) {
      if (!lessonSlugList.has(slug)) {
        issues.push({
          kind: "stage.lessonSlug.missing",
          ref: stage.slug,
          message: `Stage "${stage.slug}" references missing lesson "${slug}"`,
        });
      }
    }
    if (stage.nextStageSlug && !stageSlugs.has(stage.nextStageSlug)) {
      issues.push({
        kind: "stage.nextStageSlug",
        ref: stage.slug,
        message: `Stage "${stage.slug}" references missing next stage "${stage.nextStageSlug}"`,
      });
    }

    // 3) Stage 4·6 subGroups[].lessonSlugs 합 = stage.lessonSlugs (set equality)
    if (stage.subGroups) {
      const subUnion = new Set<string>();
      for (const sub of stage.subGroups) {
        for (const slug of sub.lessonSlugs) {
          if (subUnion.has(slug)) {
            issues.push({
              kind: "stage.subGroup.duplicate",
              ref: `${stage.slug}/${sub.id}`,
              message: `Lesson "${slug}" appears in multiple sub-groups of stage "${stage.slug}"`,
            });
          }
          subUnion.add(slug);
        }
      }
      const stageSet = new Set(stage.lessonSlugs);
      for (const slug of subUnion) {
        if (!stageSet.has(slug)) {
          issues.push({
            kind: "stage.subGroup.outsideStage",
            ref: stage.slug,
            message: `Lesson "${slug}" in sub-group but not in stage.lessonSlugs`,
          });
        }
      }
      for (const slug of stageSet) {
        if (!subUnion.has(slug)) {
          issues.push({
            kind: "stage.subGroup.uncovered",
            ref: stage.slug,
            message: `Lesson "${slug}" in stage but not assigned to any sub-group`,
          });
        }
      }
    }
  }

  // 4) lesson.stageId ↔ stage.lessonSlugs 양방향
  for (const lesson of lessons) {
    if (!lesson.stageId) continue;
    const stage = stages.find((s) => s.id === lesson.stageId);
    if (stage && !stage.lessonSlugs.includes(lesson.slug)) {
      issues.push({
        kind: "lesson.stageId.notInStageList",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" claims stageId "${lesson.stageId}" but stage does not list it`,
      });
    }
  }

  // 5) lesson.stageSubGroupId가 실제 stage.subGroups에 있는지
  for (const lesson of lessons) {
    if (!lesson.stageSubGroupId) continue;
    const stage = stages.find((s) => s.id === lesson.stageId);
    const sub = stage?.subGroups?.find((g) => g.id === lesson.stageSubGroupId);
    if (!sub) {
      issues.push({
        kind: "lesson.stageSubGroupId.invalid",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references unknown sub-group "${lesson.stageSubGroupId}" in stage "${lesson.stageId}"`,
      });
    }
  }

  // 6) 분포 표 일치 (4-5-4-14-8-13-6-7 = 61)
  for (const [stageId, expected] of Object.entries(EXPECTED_STAGE_DISTRIBUTION)) {
    const actual = lessons.filter((l) => l.stageId === stageId).length;
    if (actual !== expected) {
      issues.push({
        kind: "stage.distribution",
        ref: stageId,
        message: `Stage "${stageId}" expected ${expected} lessons, found ${actual}`,
      });
    }
  }
  if (lessons.length !== EXPECTED_TOTAL_LESSONS) {
    issues.push({
      kind: "stage.distribution.total",
      ref: "lessons",
      message: `Expected ${EXPECTED_TOTAL_LESSONS} total lessons, found ${lessons.length}`,
    });
  }

  // 7) journey.recommendedStages가 실제 stage를 가리키는지
  for (const journey of journeys) {
    if (!journey.recommendedStages) continue;
    for (const slug of journey.recommendedStages) {
      if (!stageSlugs.has(slug)) {
        issues.push({
          kind: "journey.stage",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing stage "${slug}"`,
        });
      }
    }
  }

  return issues;
}
