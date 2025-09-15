import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import CONTEXTS from "../../shared/contexts";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["fill", "soft", "outline"] as const;

export type Props = {
  title: string;
  hasStartIcon: boolean;
  hasDismissButton: boolean;
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
  hasDismissButton,
  hasActionButton,
  actionLabel,
  hasContent,
  contentLabel,
  variant,
  context,
}: Props) => {
  if (hasContent) {
    return (
      <div
        className={joinClassnames([
          "moon-alert",
          getClasses(variant),
          getClasses(context),
        ])}
      >
        <div className="moon-alert-header-wrapper">
          {hasStartIcon && <Icon name="star" />}
          <span className="moon-alert-header">{title}</span>
          {hasActionButton && (
            <button className="moon-alert-action">{actionLabel}</button>
          )}
          {hasDismissButton && (
            <button className="moon-alert-close">
              <Icon name="close" />
            </button>
          )}
        </div>
        <p className="moon-alert-content">{contentLabel}</p>
      </div>
    );
  }

  return (
    <div
      className={joinClassnames([
        "moon-alert",
        getClasses(variant),
        getClasses(context),
      ])}
    >
      {hasStartIcon && <Icon name="star" />}
      <span className="moon-alert-header">{title}</span>
      {hasActionButton && (
        <button className="moon-alert-action">{actionLabel}</button>
      )}
      {hasDismissButton && (
        <button className="moon-alert-close">
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};

export default createHTMLComponent(Alert);
