import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import CONTEXTS from "../../shared/contexts";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["fill", "soft", "outline"] as const;

export type Props = {
  title: string;
  hasStartIcon: boolean;
  hasCloseButton: boolean;
  hasActionButton: boolean;
  actionLabel: string;
  hasContent: boolean;
  contentLabel: string;
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
};

const Alert = ({
  title,
  hasStartIcon,
  hasCloseButton,
  hasActionButton,
  actionLabel,
  hasContent,
  contentLabel,
  variant,
  context,
}: Props) => (
  <div
    className={joinClassnames([
      "moon-alert",
      getClasses(variant),
      getClasses(context),
    ])}
  >
    {hasStartIcon && <Icon name="star" />}
    {title}
    {(hasActionButton || hasCloseButton) && (
      <div className="moon-alert-meta">
        {hasActionButton && (
          <button className="moon-alert-action">{actionLabel}</button>
        )}
        {hasCloseButton && (
          <button className="moon-alert-close">
            <Icon name="close" />
          </button>
        )}
      </div>
    )}
    {hasContent && <div className="moon-alert-content">{contentLabel}</div>}
  </div>
);

export default createHTMLComponent(Alert);
