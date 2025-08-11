import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  cols: number;
  rows: number;
  size: (typeof SIZES)[number];
};

export const Table = ({ cols, rows, size }: Props) => {
  const headerTitles = Array(cols).fill("Title");
  const rowsData = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill("Cell"));
  return (
    <table className={joinClassnames(["moon-table", getClasses(size)])}>
      <thead>
        <tr>
          {headerTitles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const createTable = createHTMLComponent(Table);

export default createTable;
