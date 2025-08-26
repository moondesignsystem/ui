import type { Props } from "../Authenticator";

const getClasses = (modifier: Props["size" | "variant"]) =>
  modifier === "md" || modifier === "fill"
    ? ""
    : `moon-authenticator-${modifier}`;

export default getClasses;
