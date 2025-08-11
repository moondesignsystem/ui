import type { Props } from "../Loader";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-loader-${modifier}`;

export default getClasses;
