import joinClassnames from "../../shared/utils/joinClassnames";

export type Props = {
  className: string;
};

const createPlaceholder = (args: Props) => {
  const { className } = args;
  const placeholder = document.createElement("div");
  placeholder.className = joinClassnames(["moon-placeholder", className]);
  return placeholder;
};

export default createPlaceholder;
