import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["2xs", "xs", "sm", "md", "lg"] as const;

export type Props = {
  size: (typeof SIZES)[number];
};

const createLoader = (args: Props) => {
  const { size } = args;
  const loader = document.createElement("div");
  loader.className = joinClassnames(["moon-loader", getClasses(size)]);
  return loader;
};

export default createLoader;
