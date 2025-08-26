import type { Props } from "../Select";

const getClasses = (modifier: Props["size" | "variant"]) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-select-${modifier}`;

export default getClasses;
