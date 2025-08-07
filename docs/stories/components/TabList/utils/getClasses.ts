import type { Props } from "../TabList";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-tab-list-${modifier}`;

export default getClasses;
