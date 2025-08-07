import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["2xs", "xs", "sm"] as const;

export type Props = {
  checked: boolean;
  disabled: boolean;
  size: (typeof SIZES)[number];
};

const createSwitch = (args: Props) => {
  const { checked, disabled, size } = args;
  const switchComponent = document.createElement("input");
  switchComponent.type = "checkbox";
  switchComponent.className = joinClassnames(["moon-switch", getClasses(size)]);
  if (checked) {
    switchComponent.setAttribute("checked", "true");
  }
  if (disabled) {
    switchComponent.setAttribute("disabled", "true");
  }
  return switchComponent;
};

export default createSwitch;
