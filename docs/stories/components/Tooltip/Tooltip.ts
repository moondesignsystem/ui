import joinClassnames from "../../shared/utils/joinClassnames";
import getChildren from "../../shared/utils/getChildren";
import getClasses from "./utils/getClasses";

export const POSITIONS = ["top", "bottom", "start", "end"] as const;

export type Props = {
  children: React.ReactNode;
  hasPointer: boolean;
  position: (typeof POSITIONS)[number];
};

const createTooltip = (args: Props) => {
  const { children, hasPointer, position } = args;
  const tooltip = document.createElement("div");
  const trigger = document.createElement("button");
  const content = document.createElement("div");
  content.className = "moon-tooltip-content";
  trigger.className = "moon-button";
  trigger.innerText = "Hover me";
  const contentChildren = getChildren({ children });
  content.appendChild(contentChildren);
  tooltip.className = joinClassnames([
    "moon-tooltip",
    hasPointer ? "moon-tooltip-pointer" : "",
    getClasses(position),
  ]);
  tooltip.appendChild(trigger);
  tooltip.appendChild(content);
  return tooltip;
};

export default createTooltip;
