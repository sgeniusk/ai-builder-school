#!/usr/bin/env python3
# AI Builder School · Lesson ID renumbering (1단위 → 100단위, phase-aware)
# 본문 "Lesson NN" → "Lesson X.Y" (Phase.순서) 동시 변환

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# 32개 lesson 의 phase 매핑 — lessons.ts 실제 데이터 기준
LESSON_PHASE = {
    1: 1, 2: 1, 3: 1, 4: 1,
    5: 2, 6: 2, 7: 2, 8: 2,
    9: 3, 10: 3, 11: 3, 12: 3,
    13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4,
    19: 5, 20: 5, 21: 5, 22: 5,
    23: 6, 24: 6, 25: 6, 26: 6,
    27: 7, 28: 7, 29: 7, 30: 7,
    31: 11,
    32: 12,
}

def build_maps():
    # phase 안 순서 계산
    phase_count = {}
    id_old_to_new = {}        # "lesson-01" -> "lesson-101"
    id_old_to_dotted = {}     # 1 -> "1.1"
    for old in sorted(LESSON_PHASE):
        phase = LESSON_PHASE[old]
        phase_count[phase] = phase_count.get(phase, 0) + 1
        ordinal = phase_count[phase]
        new_num = phase * 100 + ordinal
        id_old_to_new[f"lesson-{old:02d}"] = f"lesson-{new_num}"
        id_old_to_dotted[old] = f"{phase}.{ordinal}"
    return id_old_to_new, id_old_to_dotted

ID_MAP, DOTTED_MAP = build_maps()

# 변환할 텍스트 파일 패턴
BODY_TARGETS = [
    "src/content/lessons.ts",
    "src/content/lessons/*.mdx",
    "src/content/lessons/*/outputs/*.md",
]

def convert_ids_in_lessons_ts(text: str) -> tuple[str, int]:
    """lessons.ts: id: "lesson-NN" → id: "lesson-XYZ" (32곳)"""
    count = 0
    def sub(m):
        nonlocal count
        old = m.group(1)
        new = ID_MAP.get(f"lesson-{old}")
        if not new:
            return m.group(0)
        count += 1
        return f'id: "{new}"'
    new_text = re.sub(r'id:\s*"lesson-(\d{2})"', sub, text)
    return new_text, count

def convert_lesson_prose(text: str) -> tuple[str, int]:
    """본문 'Lesson NN' → 'Lesson X.Y'"""
    count = 0
    def sub(m):
        nonlocal count
        n = int(m.group(1))
        if n in DOTTED_MAP:
            count += 1
            return f"Lesson {DOTTED_MAP[n]}"
        return m.group(0)
    new_text = re.sub(r'Lesson (\d{1,2})(?!\d)', sub, text)
    return new_text, count

def process_file(path: Path, dry_run: bool):
    text = path.read_text(encoding="utf-8")
    original = text
    id_changes = 0
    if path.name == "lessons.ts":
        text, id_changes = convert_ids_in_lessons_ts(text)
    text, prose_changes = convert_lesson_prose(text)
    if text == original:
        return None
    if not dry_run:
        path.write_text(text, encoding="utf-8")
    return (id_changes, prose_changes)

def collect_files() -> list[Path]:
    files = []
    for pat in BODY_TARGETS:
        files.extend(ROOT.glob(pat))
    return sorted(set(files))

def main():
    dry_run = "--apply" not in sys.argv
    files = collect_files()
    total_id = 0
    total_prose = 0
    print(f"{'DRY-RUN' if dry_run else 'APPLY'} mode · {len(files)} files\n")
    for f in files:
        result = process_file(f, dry_run=dry_run)
        if result is None:
            continue
        ids, prose = result
        rel = f.relative_to(ROOT)
        print(f"  {rel}: id-rename={ids}, prose={prose}")
        total_id += ids
        total_prose += prose
    print(f"\nTotal: {total_id} id renames, {total_prose} prose updates")
    if dry_run:
        print("\n(dry-run — re-run with --apply to write)")

if __name__ == "__main__":
    main()
