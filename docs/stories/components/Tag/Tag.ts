import CONTEXTS from "../../shared/contexts";
import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["2xs", "xs"] as const;
export const VARIANTS = ["fill", "ghost", "outline", "soft"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const createTag = (args: Props) => {
  const { label, size, hasStartIcon, hasEndIcon, variant, context } = args;
  const tag = document.createElement("div");
  const tagChildren = getChildren({ children: label });
  if (hasStartIcon) {
    const startIcon = document.createElement("div");
    startIcon.className = "moon-icon mask-cover bg-[currentColor]";
    startIcon.style.maskImage = `url(/icons/star.svg)`;
    tag.appendChild(startIcon);
  }
  tag.appendChild(tagChildren);
  if (hasEndIcon) {
    const startIcon = document.createElement("div");
    startIcon.className = "moon-icon mask-cover bg-[currentColor]";
    startIcon.style.maskImage = `url(/icons/star.svg)`;
    tag.appendChild(startIcon);
  }
  tag.className = joinClassnames([
    "moon-tag",
    getClasses(size),
    getClasses(variant),
    getClasses(context),
  ]);

  return tag;
};

export default createTag;
