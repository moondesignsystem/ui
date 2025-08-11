import type { Props } from "../Switch";

const getClasses = (modifier: Props["size"]) =>
  modifier === "sm" ? "" : `moon-switch-${modifier}`;

export default getClasses;
