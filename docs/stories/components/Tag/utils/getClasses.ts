import type { Props } from "../Tag";

const getClasses = (modifier: Pick<Props, "size" & "variant" & "context">) =>
  modifier === "xs" || modifier === "fill" || modifier === "brand"
    ? ""
    : `moon-tag-${modifier}`;

export default getClasses;
