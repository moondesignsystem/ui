import type { Props } from "../IconButton";

const getClasses = (modifier: Pick<Props, "size" & "variant" & "context">) =>
  modifier === "md" || modifier === "fill" || modifier === "brand"
    ? ""
    : `moon-icon-button-${modifier}`;

export default getClasses;
