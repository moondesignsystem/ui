import type { Props } from "../Button";

const getClasses = (modifier: Pick<Props, "size" & "variant" & "context">) =>
  modifier === "md" || modifier === "fill" || modifier === "brand"
    ? ""
    : `moon-button-${modifier}`;

export default getClasses;
