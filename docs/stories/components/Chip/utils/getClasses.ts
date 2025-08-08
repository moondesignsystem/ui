import type { Props } from "../Chip";

const getClasses = (modifier: Pick<Props, "size" & "variant">) =>
  modifier === "md" || modifier === "fill" ? "" : `moon-chip-${modifier}`;

export default getClasses;
