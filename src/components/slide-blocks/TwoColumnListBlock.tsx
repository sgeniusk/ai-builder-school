// 2단 리스트 — 좌우 대비. 정리·비교에 쓴다.
import { Icon } from "./Icon";

export interface ListColumn {
  heading: string;
  icon?: string;
  items: { text: string; emphasis?: boolean }[];
}
export interface TwoColumnListProps {
  left: ListColumn;
  right: ListColumn;
}

export function TwoColumnListBlock({ left, right }: TwoColumnListProps) {
  return (
    <div className="sb-twocol">
      <Column column={left} />
      <Column column={right} />
    </div>
  );
}

function Column({ column }: { column: ListColumn }) {
  return (
    <div className="sb-twocol__col sb-fadein">
      <div className="sb-twocol__head">
        {column.icon && (
          <span className="sb-icon-circle">
            <Icon name={column.icon} size={18} />
          </span>
        )}
        <h3 className="sb-twocol__title">{column.heading}</h3>
      </div>
      <ul className="sb-twocol__list">
        {column.items.map((it, i) => (
          <li
            key={i}
            className={`sb-twocol__item${it.emphasis ? " is-emph" : ""}`}
          >
            <span className="sb-twocol__bullet">
              <Icon name="check-circle" size={14} />
            </span>
            <span>{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
