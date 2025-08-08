import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import starIcon from "../../shared/icons/starIcon";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["neutral", "positive", "caution", "info"] as const;

export type Props = {
  title: string;
  hasStartIcon: boolean;
  hasActionButton: boolean;
  actionLabel: string;
  variant: (typeof VARIANTS)[number];
};

const createSnackbar = (args: Props) => {
  const { title, hasStartIcon, hasActionButton, actionLabel, variant } = args;
  const snackbar = document.createElement("div");
  const actionButtonElement = document.createElement("button");
  const titleElement = document.createElement("span");
  const snackbarTitle = getChildren({ children: titleElement });
  actionButtonElement.className = "moon-snackbar-action";
  titleElement.className = "moon-snackbar-title";
  snackbar.className = joinClassnames(["moon-snackbar", getClasses(variant)]);
  actionButtonElement.appendChild(getChildren({ children: actionLabel }));
  titleElement.appendChild(getChildren({ children: title }));
  hasStartIcon && snackbar.appendChild(getChildren({ children: starIcon }));
  snackbar.appendChild(snackbarTitle);
  hasActionButton && snackbar.appendChild(actionButtonElement);
  return snackbar;
};

export default createSnackbar;
