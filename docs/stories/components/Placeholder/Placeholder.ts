export type Props = {};

const createPlaceholder = (args: Props) => {
  const wrapper = document.createElement("div");
  wrapper.className = "w-space-160 h-space-80";
  const placeholder = document.createElement("div");
  placeholder.className = "moon-placeholder";
  wrapper.appendChild(placeholder);
  return wrapper;
};

export default createPlaceholder;
