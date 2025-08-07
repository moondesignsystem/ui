import type { Props } from "../SegmentedControl";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-segmented-control-${modifier}`;

export default getClasses;
