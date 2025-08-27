import type { Props } from "../Accordion";

const getClasses = (modifier: Props["size" | "variant"]) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-accordion-${modifier}`;

export default getClasses;
