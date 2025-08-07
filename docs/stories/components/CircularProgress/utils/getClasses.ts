import type { Props } from "../CircularProgress";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-circular-progress-${modifier}`;

export default getClasses;
