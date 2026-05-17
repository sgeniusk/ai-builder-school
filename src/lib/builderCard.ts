// 빌더 카드 — 학습 진척을 1080×1080 PNG로 그린다 (canvas).
// SNS 공유·학습 인증샷용. 항상 라이트(paper/ink) 톤으로 — 공유 이미지는
// 사용자 테마와 무관하게 일관돼야 한다.

export type BuilderCardData = {
  handle: string;
  journeyLabel: string;
  pct: number;
  done: number;
  total: number;
  completedStages: number;
  streak: number;
};

const FONT = "'Pretendard Variable', 'Apple SD Gothic Neo', sans-serif";

export function drawBuilderCard(
  canvas: HTMLCanvasElement,
  d: BuilderCardData,
): void {
  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ink = "#1A1A1A";
  const paper = "#FAF9F6";
  const gray = "#6B6B6B";
  const line = "#E0DDD4";

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, S, S);
  ctx.textBaseline = "alphabetic";

  // 상단 라벨
  ctx.fillStyle = gray;
  ctx.font = `500 26px ${FONT}`;
  ctx.fillText("AI BUILDER SCHOOL", 90, 132);

  // 핸들
  ctx.fillStyle = ink;
  ctx.font = `700 76px ${FONT}`;
  ctx.fillText(d.handle, 90, 244);

  // 여정
  ctx.fillStyle = gray;
  ctx.font = `400 30px ${FONT}`;
  ctx.fillText(d.journeyLabel, 90, 296);

  // 진척 링
  const cx = S / 2;
  const cy = 560;
  const r = 150;
  ctx.lineWidth = 26;
  ctx.strokeStyle = line;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = ink;
  ctx.lineCap = "round";
  const start = -Math.PI / 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, start + Math.PI * 2 * (d.pct / 100));
  ctx.stroke();

  // 링 안 퍼센트
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.font = `700 96px ${FONT}`;
  ctx.fillText(`${d.pct}%`, cx, cy + 34);

  // 통계 줄
  ctx.fillStyle = ink;
  ctx.font = `600 38px ${FONT}`;
  ctx.fillText(`${d.total}개 레슨 중 ${d.done}개 완료`, cx, 812);
  ctx.fillStyle = gray;
  ctx.font = `400 30px ${FONT}`;
  ctx.fillText(
    `8 Stage 중 ${d.completedStages}개 완주   ·   🔥 ${d.streak}일 연속`,
    cx,
    862,
  );
  ctx.textAlign = "left";

  // 하단 구분선 + 태그라인
  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(90, 958);
  ctx.lineTo(S - 90, 958);
  ctx.stroke();
  ctx.fillStyle = gray;
  ctx.font = `400 25px ${FONT}`;
  ctx.fillText("AI를 쓰는 사람에서, AI로 만드는 사람으로", 90, 1012);
}
