import type { Props } from "../Accordion";

const getClasses = (modifier: Props["size" | "context" | "variant"]) =>
  modifier === "md" || modifier === "brand" || modifier === "fill"
    ? ""
    : `moon-accordion-${modifier}`;

export default getClasses;
