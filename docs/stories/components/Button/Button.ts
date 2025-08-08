import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "soft", "outline", "ghost"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  disabled: boolean;
  variant: (typeof VARIANTS)[number];
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createButton = (args: Props) => {
  const { label, size, disabled, variant, hasStartIcon, hasEndIcon } = args;
  const button = document.createElement("button");
  const buttonChildren = getChildren({ children: label });
  hasStartIcon && button.appendChild(getChildren({ children: starIcon }));
  button.appendChild(buttonChildren);
  hasEndIcon && button.appendChild(getChildren({ children: starIcon }));
  button.className = joinClassnames([
    "moon-button",
    getClasses(size),
    getClasses(variant),
  ]);
  if (disabled) {
    button.setAttribute("disabled", "true");
  }

  return button;
};

export default createButton;
