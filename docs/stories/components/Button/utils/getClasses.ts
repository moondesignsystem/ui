import type { Props } from "../Button";

const getClasses = (modifier: Pick<Props, "size" & "variant">) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-button-${modifier}`;

export default getClasses;
