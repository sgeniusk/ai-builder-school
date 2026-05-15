#!/usr/bin/env bash
# 미커밋 + 변경이 12시간 이상 쌓였으면 경고 출력
set -e
REPO="/Users/taewookkim/AI Builder School"
[ ! -d "$REPO/.git" ] && [ ! -f "$REPO/.git" ] && exit 0
COUNT=$(git -C "$REPO" status --porcelain | wc -l | tr -d ' ')
[ "$COUNT" -eq 0 ] && exit 0
LATEST=$(find "$REPO/src" "$REPO/docs" -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.mdx' -o -name '*.md' \) -newer "$REPO/.git/HEAD" 2>/dev/null | head -1)
[ -z "$LATEST" ] && exit 0
AGE_HOURS=$(( ($(date +%s) - $(stat -f %m "$LATEST")) / 3600 ))
if [ "$AGE_HOURS" -ge 12 ]; then
  echo "⚠️  AI Builder School: $COUNT 변경, 최신 수정 $AGE_HOURS 시간 전 — 커밋하세요."
fi
