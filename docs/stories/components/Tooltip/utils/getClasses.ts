import type { Props } from "../Tooltip";

const getClasses = (modifier: Props["position"]) =>
  modifier === "top" ? "" : `moon-tooltip-${modifier}`;

export default getClasses;
