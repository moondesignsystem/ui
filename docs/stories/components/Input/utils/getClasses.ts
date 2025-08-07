import type { Props } from "../Input";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-input-${modifier}`;

export default getClasses;
