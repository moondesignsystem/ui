import type { Props } from "../Alert";

const getClasses = (modifier: Props["variant"]) =>
  modifier === "neutral" ? "" : `moon-alert-${modifier}`;

export default getClasses;
