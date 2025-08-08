import type { Props } from "../List";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-list-${modifier}`;

export default getClasses;
