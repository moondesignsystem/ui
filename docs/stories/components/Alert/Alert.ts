import getChildren from "../../shared/utils/getChildren";
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

const createAlert = (args: Props) => {
  const {
    title,
    hasStartIcon,
    hasDismissButton,
    hasActionButton,
    actionLabel,
    hasContent,
    contentLabel,
    variant,
  } = args;
  const alert = document.createElement("div");
  const dismissButtonElement = document.createElement("button");
  const actionButtonElement = document.createElement("button");
  dismissButtonElement.className = "moon-alert-dismiss";
  actionButtonElement.className = "moon-alert-action";
  const titleElement = document.createElement("span");
  titleElement.className = "moon-alert-title";
  alert.className = joinClassnames(["moon-alert", getClasses(variant)]);
  actionButtonElement.appendChild(getChildren({ children: actionLabel }));
  dismissButtonElement.appendChild(getChildren({ children: closeIcon }));
  titleElement.appendChild(getChildren({ children: title }));
  const alertTitle = getChildren({ children: titleElement });
  if (hasContent) {
    const titleWrapper = document.createElement("div");
    const contentLabelElement = document.createElement("p");
    contentLabelElement.className = "moon-alert-content";
    contentLabelElement.appendChild(getChildren({ children: contentLabel }));
    titleWrapper.className = "moon-alert-title-wrapper";
    hasStartIcon &&
      titleWrapper.appendChild(getChildren({ children: starIcon }));
    titleWrapper.appendChild(alertTitle);
    hasActionButton && titleWrapper.appendChild(actionButtonElement);
    hasDismissButton && titleWrapper.appendChild(dismissButtonElement);
    alert.appendChild(titleWrapper);
    alert.appendChild(contentLabelElement);
  } else {
    hasStartIcon && alert.appendChild(getChildren({ children: starIcon }));
    alert.appendChild(alertTitle);
    hasActionButton && alert.appendChild(actionButtonElement);
    hasDismissButton && alert.appendChild(dismissButtonElement);
  }
  return alert;
};

export default createAlert;
