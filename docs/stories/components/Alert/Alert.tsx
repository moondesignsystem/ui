import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import closeIcon from "../../shared/icons/closeIcon";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["neutral", "negative", "positive", "info"] as const;

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
          {hasStartIcon && (
            <span dangerouslySetInnerHTML={{ __html: starIcon }} />
          )}
          <span className="moon-alert-title">{title}</span>
          {hasActionButton && (
            <button className="moon-alert-action">{actionLabel}</button>
          )}
          {hasDismissButton && (
            <button
              className="moon-alert-dismiss"
              dangerouslySetInnerHTML={{ __html: closeIcon }}
            />
          )}
        </div>
        <p className="moon-alert-content">{contentLabel}</p>
      </div>
    );
  }

  return (
    <div className={joinClassnames(["moon-alert", getClasses(variant)])}>
      {hasStartIcon && <span dangerouslySetInnerHTML={{ __html: starIcon }} />}
      <span className="moon-alert-title">{title}</span>
      {hasActionButton && (
        <button className="moon-alert-action">{actionLabel}</button>
      )}
      {hasDismissButton && (
        <button
          className="moon-alert-dismiss"
          dangerouslySetInnerHTML={{ __html: closeIcon }}
        />
      )}
    </div>
  );
};

export default createHTMLComponent(Alert);
