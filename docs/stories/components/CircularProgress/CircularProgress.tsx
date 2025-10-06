import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  value: number;
};

const CircularProgress = ({ size, value }: Props) => (
  <div
    className={joinClassnames(["moon-circular-progress", getClasses(size)])}
    style={{ "--value": value } as React.CSSProperties}
  />
);

export default createHTMLComponent(CircularProgress);
