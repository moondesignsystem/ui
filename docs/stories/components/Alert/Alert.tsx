import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
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
}: Props) => {
  if (hasContent) {
    return (
      <div className={joinClassnames(["moon-alert", getClasses(variant)])}>
        <div className="moon-alert-title-wrapper">
          {hasStartIcon && <Icon name="star" />}
          <span className="moon-alert-title">{title}</span>
          {hasActionButton && (
            <button className="moon-alert-action">{actionLabel}</button>
          )}
          {hasDismissButton && (
            <button className="moon-alert-dismiss">
              <Icon name="close" />
            </button>
          )}
        </div>
        <p className="moon-alert-content">{contentLabel}</p>
      </div>
    );
  }

  return (
    <div className={joinClassnames(["moon-alert", getClasses(variant)])}>
      {hasStartIcon && <Icon name="star" />}
      <span className="moon-alert-title">{title}</span>
      {hasActionButton && (
        <button className="moon-alert-action">{actionLabel}</button>
      )}
      {hasDismissButton && (
        <button className="moon-alert-dismiss">
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};

export default createHTMLComponent(Alert);
