import type { Props } from "../Avatar";

const getClasses = (modifier: Pick<Props, "size" & "variant">) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-avatar-${modifier}`;

export default getClasses;
