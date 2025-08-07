import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "soft", "outline", "ghost"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  disabled: boolean;
  variant: (typeof VARIANTS)[number];
};

const createIconButton = (args: Props) => {
  const { size, disabled, variant } = args;
  const iconButton = document.createElement("button");
  iconButton.appendChild(getChildren({ children: starIcon }));
  iconButton.className = joinClassnames([
    "moon-icon-button",
    getClasses(size),
    getClasses(variant),
  ]);
  if (disabled) {
    iconButton.setAttribute("disabled", "true");
  }
  return iconButton;
};

export default createIconButton;
