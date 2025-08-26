import type { Props } from "../Snackbar";

const getClasses = (modifier: Props["variant" | "context"]) =>
  modifier === "fill" || modifier === "brand"
    ? ""
    : `moon-snackbar-${modifier}`;

export default getClasses;
