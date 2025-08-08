import type { Props } from "../Snackbar";

const getClasses = (modifier: Props["variant"]) =>
  modifier === "neutral" ? "" : `moon-snackbar-${modifier}`;

export default getClasses;
