import type { Props } from "../Authenticator";

const getClasses = (modifier: Props["size"]) =>
  modifier === "md" ? "" : `moon-authenticator-${modifier}`;

export default getClasses;
