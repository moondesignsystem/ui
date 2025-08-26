import joinClassnames from "../../shared/utils/joinClassnames";

export type Props = {};

const createPlaceholder = (args: Props) => {
  const wrapper = document.createElement("div");
  wrapper.className = "w-160 h-80";
  const placeholder = document.createElement("div");
  placeholder.className = "moon-placeholder";
  wrapper.appendChild(placeholder);
  return wrapper;
};

export default createPlaceholder;
