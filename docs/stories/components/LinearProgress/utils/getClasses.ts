import type { Props } from "../LinearProgress";

const getClasses = (modifier: Props["size"]) =>
  modifier === "2xs" ? "" : `moon-linear-progress-${modifier}`;

export default getClasses;
