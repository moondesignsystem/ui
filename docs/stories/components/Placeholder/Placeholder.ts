export type Props = {};

const createPlaceholder = (args: Props) => {
  const wrapper = document.createElement("div");
  wrapper.className = "w-40 h-20";
  const placeholder = document.createElement("div");
  placeholder.className = "moon-placeholder";
  wrapper.appendChild(placeholder);
  return wrapper;
};

export default createPlaceholder;
