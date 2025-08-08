import type { Props } from "../Menu";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-menu-${modifier}`;

export default getClasses;
