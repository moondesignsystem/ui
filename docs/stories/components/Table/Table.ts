import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  cols: number;
  rows: number;
  size: (typeof SIZES)[number];
};

const createTable = (args: Props) => {
  const { cols, rows, size } = args;
  const table = document.createElement("table");
  table.className = joinClassnames(["moon-table", getClasses(size)]);
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  table.appendChild(thead);
  table.appendChild(tbody);
  const theadTr = document.createElement("tr");
  thead.appendChild(theadTr);
  const ths = new Array(cols).fill("Title");
  ths.forEach((item) => {
    const th = document.createElement("th");
    th.textContent = item;
    theadTr.appendChild(th);
  });
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < ths.length; j++) {
      const td = document.createElement("td");
      td.textContent = "Cell";
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  return table;
};

export default createTable;
