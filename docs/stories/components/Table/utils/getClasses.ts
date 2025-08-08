import type { Props } from "../Table";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-table-${modifier}`;

export default getClasses;
