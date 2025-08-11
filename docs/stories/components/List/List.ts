import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

export type Props = {
  items: number;
  label: string;
  size: (typeof SIZES)[number];
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createList = (args: Props) => {
  const { items, label, size, hasStartIcon, hasEndIcon } = args;
  const list = document.createElement("ul");
  list.className = joinClassnames(["moon-list", getClasses(size)]);
  const listItems = new Array(items).fill("");
  listItems.forEach((_, item) => {
    const listItem = document.createElement("li");
    hasStartIcon && listItem.appendChild(getChildren({ children: starIcon }));
    listItem.appendChild(getChildren({ children: `${label} ${item + 1}` }));
    hasEndIcon && listItem.appendChild(getChildren({ children: starIcon }));
    list.appendChild(listItem);
  });
  return list;
};

export default createList;
