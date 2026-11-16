import { Reveal } from "@/components/Reveal";

type LedgerRow = {
  heading: string;
  body: string;
  /** Third column, drawn with a highlight fill (Insightex "what stayed"). */
  kept?: string;
};

type Props = {
  rows: readonly LedgerRow[];
  /** Minimum column width before the row collapses to one column. */
  minColumn?: 240 | 260;
};

/**
 * Ruled list of rows under a 2px ink line, each row rising in on scroll.
 * Used for the Insightex decisions and the "how it is built" lists.
 */
export function DecisionLedger({ rows, minColumn = 240 }: Props) {
  const grid =
    minColumn === 240
      ? "grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-10"
      : "grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-12";
  return (
    <div className="mt-7 border-t-2 border-ink">
      {rows.map((row) => (
        <Reveal key={row.heading} className={`grid ${grid} gap-y-2 border-b border-line py-[22px]`}>
          <h3 className="m-0 text-[20px] leading-[1.25] font-semibold">{row.heading}</h3>
          <p className="m-0 text-ink-soft">{row.body}</p>
          {row.kept && (
            <p className="m-0 font-semibold">
              <span className="rounded bg-highlight px-1.5 py-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {row.kept}
              </span>
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
