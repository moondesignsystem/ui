import type { Props } from "../Badge";

const getClasses = (modifier: Pick<Props, "variant" & "context">) =>
  modifier === "fill" || modifier === "brand" ? "" : `moon-badge-${modifier}`;

export default getClasses;
