import type { Props } from "../Select";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-select-${modifier}`;

export default getClasses;
