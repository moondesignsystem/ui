import joinClassnames from "../../shared/utils/joinClassnames";
import getChildren from "../../shared/utils/getChildren";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  length: number;
  label: string;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createSegmentedControl = (args: Props) => {
  const { label, size, length, hasStartIcon, hasEndIcon } = args;
  const segmentedControl = document.createElement("div");
  segmentedControl.setAttribute("role", "tablist");
  segmentedControl.className = joinClassnames([
    "moon-segmented-control",
    getClasses(size),
  ]);
  const segments = new Array(length).fill("");
  segments.forEach((_, item) => {
    const segment = document.createElement("button");
    segment.setAttribute("role", "tab");
    segment.className = `moon-segmented-control-item${
      item === 1 ? " moon-segmented-control-item-active" : ""
    }`;
    hasStartIcon && segment.appendChild(getChildren({ children: starIcon }));
    segment.appendChild(getChildren({ children: `${label} ${item + 1}` }));
    hasEndIcon && segment.appendChild(getChildren({ children: starIcon }));
    segmentedControl.appendChild(segment);
  });
  return segmentedControl;
};

export default createSegmentedControl;
