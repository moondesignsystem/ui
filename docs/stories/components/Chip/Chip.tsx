import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md"] as const;
export const VARIANTS = ["fill", "soft", "outline"] as const;

export type Props = {
  label: string;
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
  selected: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};

const Chip = ({
  label,
  size,
  variant,
  selected,
  hasStartIcon,
  hasEndIcon,
}: Props) => (
  <button
    className={joinClassnames([
      "moon-chip",
      getClasses(size),
      getClasses(variant),
      selected && "moon-chip-selected",
    ])}
  >
    {hasStartIcon && <Icon name="star" />}
    {label}
    {hasEndIcon && <Icon name="star" />}
  </button>
);

export default createHTMLComponent(Chip);
