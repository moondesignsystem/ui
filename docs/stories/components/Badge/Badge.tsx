import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import CONTEXTS from "../../shared/contexts";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const VARIANTS = ["fill", "soft", "outline"] as const;

export type Props = {
  children: React.ReactNode;
  variant: (typeof VARIANTS)[number];
  context: (typeof CONTEXTS)[number];
};

export const Badge = ({ children, variant, context }: Props) => (
  <div
    className={joinClassnames([
      "moon-badge",
      getClasses(variant),
      getClasses(context),
    ])}
  >
    {children}
  </div>
);

const createBadge = createHTMLComponent(Badge);

export default createBadge;
