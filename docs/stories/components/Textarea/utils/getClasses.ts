import type { Props } from "../Textarea";

const getClasses = (modifier: Props["size" | "variant"]) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-textarea-${modifier}`;

export default getClasses;
