import { Reveal } from "@/components/Reveal";

type Props = {
  /** First entry labels the row-name column. */
  columns: readonly string[];
  rows: readonly { name: string; cells: readonly string[] }[];
  className?: string;
};

/**
 * Results table, styled as in AgentReview.dc.html. Scrolls sideways inside
 * its own box on narrow screens so the page never does.
 */
export function ResultsTable({ columns, rows, className }: Props) {
  const lastIndex = columns.length - 1;
  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <table className="w-full min-w-[720px] border-collapse tabular-nums">
        <thead>
          <tr className="border-b-2 border-ink text-left">
            {columns.map((label, i) => (
              <th
                key={label}
                scope="col"
                className={
                  i === 0
                    ? "py-3 pr-4 pl-0 font-semibold"
                    : i === lastIndex
                      ? "py-3 pr-0 pl-4 font-semibold"
                      : "px-4 py-3 font-semibold"
                }
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Reveal as="tr" key={row.name} className="border-b border-line">
              <th
                scope="row"
                className="py-4 pr-4 pl-0 text-left font-display text-[19px] font-semibold"
              >
                {row.name}
              </th>
              {row.cells.map((cell, i) => (
                <td
                  key={columns[i + 1]}
                  className={i + 1 === lastIndex ? "py-4 pr-0 pl-4" : "p-4"}
                >
                  {cell}
                </td>
              ))}
            </Reveal>
          ))}
        </tbody>
      </table>
    </div>
  );
}
