import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import CONTEXTS from "../../shared/contexts";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "soft", "outline", "ghost"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  disabled: boolean;
  fullWidth: boolean;
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const Button = ({
  label,
  size,
  disabled,
  fullWidth,
  variant,
  context,
  hasStartIcon,
  hasEndIcon,
}: Props) => (
  <button
    className={joinClassnames([
      "moon-button",
      getClasses(size),
      getClasses(variant),
      getClasses(context),
      fullWidth && "moon-button-full-width",
    ])}
    disabled={disabled}
  >
    {hasStartIcon && <Icon name="star" />}
    {label}
    {hasEndIcon && <Icon name="star" />}
  </button>
);

export default createHTMLComponent(Button);
