import type { Props } from "../Accordion";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-accordion-${modifier}`;

export default getClasses;
