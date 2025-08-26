import type { Props } from "../Input";

const getClasses = (modifier: Props["size" | "variant"]) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-input-${modifier}`;

export default getClasses;
