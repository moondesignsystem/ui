import type { Props } from "../Textarea";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-textarea-${modifier}`;

export default getClasses;
