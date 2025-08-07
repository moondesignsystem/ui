import type { Props } from "../Tag";

const getClasses = (modifier: Pick<Props, "size" & "variant">) =>
  modifier === "xs" || modifier === "fill" ? "" : `moon-tag-${modifier}`;

export default getClasses;
