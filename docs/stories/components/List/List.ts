import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg"] as const;

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
    listItem.className = "moon-list-item";
    const listItemMeta = document.createElement("div");
    listItemMeta.className = "moon-list-item-meta";
    if (hasStartIcon) {
      const startIcon = document.createElement("div");
      startIcon.className = "moon-icon mask-cover bg-[currentColor]";
      startIcon.style.maskImage = `url(/icons/star.svg)`;
      listItem.appendChild(startIcon);
    }
    listItem.appendChild(getChildren({ children: `${label} ${item + 1}` }));
    if (hasEndIcon) {
      const endIcon = document.createElement("div");
      endIcon.className = "moon-icon mask-cover bg-[currentColor]";
      endIcon.style.maskImage = `url(/icons/star.svg)`;
      listItemMeta.appendChild(endIcon);
      listItem.appendChild(listItemMeta);
    }
    list.appendChild(listItem);
  });
  return list;
};

export default createList;
