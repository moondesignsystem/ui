import joinClassnames from "../../shared/utils/joinClassnames";
import getChildren from "../../shared/utils/getChildren";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  length: number;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createTabs = (args: Props) => {
  const { label, size, length, hasStartIcon, hasEndIcon } = args;
  const tabs = document.createElement("div");
  tabs.setAttribute("role", "tablist");
  tabs.className = joinClassnames(["moon-tab-list", getClasses(size)]);
  const segments = new Array(length).fill("");
  segments.forEach((_, item) => {
    const segment = document.createElement("button");
    segment.setAttribute("role", "tab");
    segment.className = `moon-tab-list-item${
      item === 1 ? " moon-tab-list-item-active" : ""
    }`;
    if (hasStartIcon) {
      const startIcon = document.createElement("div");
      startIcon.className = "moon-icon mask-cover bg-[currentColor]";
      startIcon.style.maskImage = `url(/icons/star.svg)`;
      segment.appendChild(startIcon);
    }
    segment.appendChild(getChildren({ children: `${label} ${item + 1}` }));
    if (hasEndIcon) {
      const endIcon = document.createElement("div");
      endIcon.className = "moon-icon mask-cover bg-[currentColor]";
      endIcon.style.maskImage = `url(/icons/star.svg)`;
      segment.appendChild(endIcon);
    }
    tabs.appendChild(segment);
  });
  return tabs;
};

export default createTabs;
