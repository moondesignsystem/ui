import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md"] as const;
export const VARIANTS = ["fill", "outline"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
  selected: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createChip = (args: Props) => {
  const { label, size, variant, selected, hasStartIcon, hasEndIcon } = args;
  const chip = document.createElement("button");
  const chipChildren = getChildren({ children: label });
  hasStartIcon && chip.appendChild(getChildren({ children: starIcon }));
  chip.appendChild(chipChildren);
  hasEndIcon && chip.appendChild(getChildren({ children: starIcon }));
  chip.className = joinClassnames([
    "moon-chip",
    getClasses(size),
    getClasses(variant),
    selected ? "moon-chip-selected" : "",
  ]);
  return chip;
};

export default createChip;
