import type { Props } from "../Drawer";

const getClasses = (modifier: Props["position"]) =>
  modifier === "end" ? "" : `moon-drawer-${modifier}`;

export default getClasses;
