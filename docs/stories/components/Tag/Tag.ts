import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";
import { CONTEXTS } from "../Button/tokens.generated";

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
  hasStartIcon && tag.appendChild(getChildren({ children: starIcon }));
  tag.appendChild(tagChildren);
  hasEndIcon && tag.appendChild(getChildren({ children: starIcon }));
  tag.className = joinClassnames([
    "moon-tag",
    getClasses(size),
    getClasses(variant),
    getClasses(context),
  ]);

  return tag;
};

export default createTag;
