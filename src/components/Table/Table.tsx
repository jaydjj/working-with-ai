import type { ReactNode } from 'react';
import './Table.css';

export interface Column<T> {
  key: string;
  header: ReactNode;
  /** Short qualifier under the header, e.g. "self-reported". */
  note?: string;
  render: (row: T) => ReactNode;
  /** Columns that hold primary text wrap; everything else stays on one line. */
  wrap?: boolean;
  width?: string;
}

interface Props<T> {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
}

export function Table<T>({ caption, columns, rows, rowKey }: Props<T>) {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="visually-hidden">{caption}</caption>
        <colgroup>
          {columns.map((c) => <col key={c.key} style={c.width ? { width: c.width } : undefined} />)}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col">
                {c.header}
                {c.note && <span className="table__note">{c.note}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.wrap ? 'table__cell--wrap' : 'table__cell--nowrap'}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
