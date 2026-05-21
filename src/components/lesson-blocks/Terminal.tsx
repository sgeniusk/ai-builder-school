// 터미널 mockup — 레슨 MDX에서 진짜 터미널처럼 연출.
// 윈도우 chrome(빨강·노랑·초록 점 + 타이틀)과 다크 배경. 사이트 테마 무관하게 항상 다크.
// `lines` 배열의 각 줄이 `$ `, `> `, `# `로 시작하면 자동으로 prompt 스타일 적용.
//
// 사용 예
//   <Terminal title="Mac · zsh" lines={[
//     "$ pwd",
//     "/Users/me/my-ai-builder-lab",
//     "$ ls -la",
//     "total 0",
//   ]} />

export interface TerminalProps {
  /** 윈도우 chrome에 표시할 타이틀. 기본 "terminal". */
  title?: string;
  /** 한 줄씩 끊은 터미널 출력. `$ `, `> `, `# `로 시작하면 prompt 색상. */
  lines: string[];
}

const PROMPT_RE = /^([$>#])(\s|$)/;

export function Terminal({ title = "terminal", lines }: TerminalProps) {
  return (
    <div className="lesson-terminal" role="img" aria-label={`터미널 화면 — ${title}`}>
      <div className="lesson-terminal__chrome">
        <span className="lesson-terminal__dot lesson-terminal__dot--red" aria-hidden />
        <span className="lesson-terminal__dot lesson-terminal__dot--yellow" aria-hidden />
        <span className="lesson-terminal__dot lesson-terminal__dot--green" aria-hidden />
        <span className="lesson-terminal__title">{title}</span>
      </div>
      <pre className="lesson-terminal__body">
        {lines.map((line, i) => {
          const m = line.match(PROMPT_RE);
          if (m) {
            const rest = line.slice(m[0].length);
            return (
              <div key={i} className="lesson-terminal__line lesson-terminal__line--prompt">
                <span className="lesson-terminal__sigil">{m[1]}</span>
                <span>{rest || " "}</span>
              </div>
            );
          }
          return (
            <div key={i} className="lesson-terminal__line">
              {line || " "}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
