import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["5xs", "4xs", "3xs", "2xs"] as const;

export type Props = {
  hasLabel: boolean;
  label: string;
  value: number;
  size: (typeof SIZES)[number];
};

export const createLinearProgress = (args: Props) => {
  const { value, hasLabel, label, size } = args;
  const linearProgress = document.createElement("progress");
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  labelElement.setAttribute("for", "linearProgress");
  linearProgress.setAttribute("value", value.toString());
  linearProgress.setAttribute("max", "100");
  hasLabel && linearProgress.setAttribute("id", "linearProgress");
  linearProgress.className = joinClassnames([
    "moon-linear-progress",
    getClasses(size),
  ]);
  const wrapper = document.createElement("div");
  wrapper.className = "moon-linear-progress-wrapper";
  if (hasLabel) {
    wrapper.appendChild(linearProgress);
    wrapper.appendChild(labelElement);
    return wrapper;
  }
  return linearProgress;
};
