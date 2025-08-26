import type { Props } from "../Alert";

const getClasses = (modifier: Props["variant" | "context"]) =>
  modifier === "fill" || modifier === "brand" ? "" : `moon-alert-${modifier}`;

export default getClasses;
