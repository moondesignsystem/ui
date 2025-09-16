import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg"] as const;

export type Props = {
  items: number;
  label: string;
  size: (typeof SIZES)[number];
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createMenu = (args: Props) => {
  const { items, label, size, hasStartIcon, hasEndIcon } = args;
  const menu = document.createElement("ul");
  menu.className = joinClassnames(["moon-menu", getClasses(size)]);
  const menuItems = new Array(items).fill("");
  menuItems.forEach((_, item) => {
    const menuItem = document.createElement("li");
    menuItem.className = "moon-menu-item";
    const menuItemMeta = document.createElement("div");
    menuItemMeta.className = "moon-menu-item-meta";
    hasStartIcon && menuItem.appendChild(getChildren({ children: starIcon }));
    menuItem.appendChild(getChildren({ children: `${label} ${item + 1}` }));
    hasEndIcon && menuItemMeta.appendChild(getChildren({ children: starIcon }));
    hasEndIcon && menuItem.appendChild(menuItemMeta);
    menu.appendChild(menuItem);
  });
  return menu;
};

export default createMenu;
