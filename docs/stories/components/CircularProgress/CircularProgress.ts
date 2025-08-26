import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  value: number;
};

const createCircularProgress = (args: Props) => {
  const { size, value } = args;
  const circularProgress = document.createElement("div");
  circularProgress.className = joinClassnames([
    "moon-circular-progress",
    getClasses(size),
  ]);
  circularProgress.setAttribute("data-value", value.toString());
  return circularProgress;
};

export default createCircularProgress;
