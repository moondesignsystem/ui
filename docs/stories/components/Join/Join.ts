import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export type Props = {
  disabled?: boolean;
  direction?: "row" | "column";
  childrens?: string[];
};

const createJoin = (args: Props) => {
  const { disabled = false, direction = "row", childrens } = args;
  const joinDiv = document.createElement("div");
  joinDiv.className = joinClassnames(["moon-join", getClasses(direction)]);

  return joinDiv;
};

export default createJoin;
