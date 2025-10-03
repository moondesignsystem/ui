import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["5xs", "4xs", "3xs", "2xs"] as const;

export type Props = {
  label: string;
  value: number;
  size: (typeof SIZES)[number];
};

const LinearProgress = ({ value, label, size }: Props) => {
  if (label) {
    return (
      <label>
        <progress
          id="linearProgress"
          className={joinClassnames(["moon-linear-progress", getClasses(size)])}
          value={value}
          max={100}
        />
        {label}
      </label>
    );
  }

  return (
    <progress
      className={joinClassnames(["moon-linear-progress", getClasses(size)])}
      value={value}
      max={100}
    />
  );
};

export default createHTMLComponent(LinearProgress);
