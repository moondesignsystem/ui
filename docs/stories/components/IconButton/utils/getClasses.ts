import type { Props } from "../IconButton";

const getClasses = (modifier: Pick<Props, "size" & "variant">) =>
  modifier === "md" || modifier === "fill"
    ? ""
    : `moon-icon-button-${modifier}`;

export default getClasses;
