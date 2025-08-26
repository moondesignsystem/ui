import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import CONTEXTS from "../../shared/contexts";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["fill", "soft"] as const;

export type Props = {
  title: string;
  hasStartIcon: boolean;
  hasActionButton: boolean;
  actionLabel: string;
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
};

export const Snackbar = ({
  title,
  hasStartIcon,
  hasActionButton,
  actionLabel,
  variant,
  context,
}: Props) => (
  <div
    className={joinClassnames([
      "moon-snackbar",
      getClasses(variant),
      getClasses(context),
    ])}
  >
    {hasStartIcon && <span dangerouslySetInnerHTML={{ __html: starIcon }} />}
    <span className="moon-snackbar-title">{title}</span>
    {hasActionButton && (
      <button className="moon-snackbar-action">{actionLabel}</button>
    )}
  </div>
);

const createSnackbar = createHTMLComponent(Snackbar);

export default createSnackbar;
