import joinClassnames from "../../shared/utils/joinClassnames";
import CONTEXTS from "../../shared/contexts";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "soft", "outline", "ghost"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  disabled: boolean;
  rounded: boolean;
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
};

const createIconButton = (args: Props) => {
  const { size, disabled, rounded, variant, context } = args;
  const iconButton = document.createElement("button");
  const icon = document.createElement("div");
  icon.className = "moon-icon mask-cover bg-[currentColor]";
  icon.style.maskImage = `url(/icons/star.svg)`;
  iconButton.appendChild(icon);
  iconButton.className = joinClassnames([
    "moon-icon-button",
    getClasses(size),
    getClasses(variant),
    getClasses(context),
    rounded && "moon-icon-button-rounded",
  ]);
  if (disabled) {
    iconButton.setAttribute("disabled", "true");
  }
  return iconButton;
};

export default createIconButton;
